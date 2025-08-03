// IBM Watson X API Client
const WATSON_API_BASE = 'https://us-south.ml.cloud.ibm.com';
const API_KEY = 'Fnv78iD4F0XHJ4p8jiNmQZEaznFsJlpqTVueoIeq-dza';

interface WatsonRequest {
  model_id: string;
  input: string;
  parameters?: {
    max_new_tokens?: number;
    temperature?: number;
    top_p?: number;
  };
}

interface WatsonResponse {
  results: Array<{
    generated_text: string;
    token_count: number;
  }>;
}

class WatsonClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = WATSON_API_BASE) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
        apikey: this.apiKey
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  }

  async generateText(prompt: string, modelId: string = 'meta-llama/llama-3-70b-instruct'): Promise<string> {
    const token = await this.getAccessToken();
    
    const request: WatsonRequest = {
      model_id: modelId,
      input: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 1
      }
    };

    const response = await fetch(`${this.baseUrl}/ml/v1/text/generation?version=2023-05-29`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error('Failed to generate text');
    }

    const data: WatsonResponse = await response.json();
    return data.results[0]?.generated_text || '';
  }

  async analyzeCareerFit(interests: string, skills: string, experience: string): Promise<any> {
    const prompt = `
      As a career guidance AI, analyze the following profile and recommend suitable career paths:
      
      Interests: ${interests}
      Skills: ${skills}
      Experience: ${experience}
      
      Provide recommendations in JSON format with career titles, match percentages, salary ranges, and growth prospects.
    `;

    try {
      const response = await this.generateText(prompt);
      // Parse the response and return structured data
      return this.parseCareerRecommendations(response);
    } catch (error) {
      console.error('Career analysis failed:', error);
      return this.getMockCareerData();
    }
  }

  async analyzeLearningPath(careerGoal: string, currentSkills: string): Promise<any> {
    const prompt = `
      Create a learning roadmap for someone wanting to become a ${careerGoal}.
      Current skills: ${currentSkills}
      
      Provide a structured learning path with courses, duration, and skill progression.
    `;

    try {
      const response = await this.generateText(prompt);
      return this.parseLearningPath(response);
    } catch (error) {
      console.error('Learning path analysis failed:', error);
      return this.getMockLearningData();
    }
  }

  async analyzeJobPosting(jobUrl: string, resumeContent?: string): Promise<any> {
    const prompt = `
      Analyze this job posting and provide insights for resume optimization:
      Job URL: ${jobUrl}
      ${resumeContent ? `Current Resume: ${resumeContent}` : ''}
      
      Provide key skills, requirements, and recommendations for improvement.
    `;

    try {
      const response = await this.generateText(prompt);
      return this.parseJobAnalysis(response);
    } catch (error) {
      console.error('Job analysis failed:', error);
      return this.getMockJobData();
    }
  }

  private parseCareerRecommendations(response: string): any {
    // Parse Watson X response and return structured career recommendations
    // For now, return mock data
    return this.getMockCareerData();
  }

  private parseLearningPath(response: string): any {
    // Parse Watson X response and return structured learning path
    return this.getMockLearningData();
  }

  private parseJobAnalysis(response: string): any {
    // Parse Watson X response and return job analysis
    return this.getMockJobData();
  }

  private getMockCareerData() {
    return [
      {
        title: 'Senior Software Engineer',
        match: 94,
        salary: '$85K - $150K',
        growth: '+22%',
        description: 'Design and develop scalable software applications using modern technologies.',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
        demand: 'High'
      }
    ];
  }

  private getMockLearningData() {
    return {
      title: 'Software Engineer Learning Path',
      duration: '6-8 months',
      courses: [
        {
          title: 'JavaScript Fundamentals',
          duration: '4 weeks',
          provider: 'TechEd Pro',
          progress: 100
        }
      ]
    };
  }

  private getMockJobData() {
    return {
      company: 'Google',
      position: 'Senior Software Engineer',
      matchScore: 87,
      keySkills: ['Python', 'Machine Learning', 'Kubernetes'],
      missingSkills: ['Go', 'TensorFlow'],
      recommendations: ['Emphasize Python experience', 'Add ML projects']
    };
  }
}

export const watsonClient = new WatsonClient(API_KEY);
export default WatsonClient;