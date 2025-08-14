'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  Compass, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MapPin,
  Clock,
  Brain,
  Sparkles,
  ChevronRight,
  Star,
  Briefcase,
  Lightbulb,
  BookOpen,
  Award,
  Rocket,
  GraduationCap,
  BarChart2,
  ArrowRightCircle,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface CareerRecommendation {
  id: string;
  title: string;
  match: number;
  salary: string;
  growth: string;
  description: string;
  skills: string[];
  demand: 'High' | 'Medium' | 'Low';
  education?: string;
  experience?: string;
  median_salary?: number;
  job_outlook?: string;
  onet_code?: string;
  bls_series?: string;
  api_endpoints?: {
    bls: string;
    onet: string;
    jobs: string;
  };
}

interface JobListing {
  title: string;
  company: string;
  location: string;
  salary: string;
  url: string;
  posted: string;
  description: string;
}

interface CareerPath {
  title: string;
  steps: {
    position: string;
    experience: string;
    skills: string[];
    salary_range: string;
    description: string;
  }[];
  certifications?: string[];
  education_path?: string[];
  current_jobs?: JobListing[];
}

interface FieldRecommendation {
  field: string;
  suggestions: string[];
}

export default function CareerChoiceAgent() {
  const [formData, setFormData] = useState({
    interests: '',
    skills: '',
    education: '',
    experience: '',
    location: '',
    salaryExpectation: '',
    workPreference: 'Flexible',
    workLifeBalance: 5,
    values: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [showFieldRecommendations, setShowFieldRecommendations] = useState<Record<string, boolean>>({
    interests: false,
    skills: false,
    education: false,
    experience: false,
  });
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [isLoadingPath, setIsLoadingPath] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const workPreferences = ['On-site', 'Hybrid', 'Remote', 'Flexible'];
  const careerValues = [
    'Job security', 'High salary', 'Work-life balance', 'Career growth', 
    'Making an impact', 'Creativity', 'Teamwork', 'Independence'
  ];

  const fieldRecommendations: Record<string, FieldRecommendation> = {
    interests: {
      field: 'interests',
      suggestions: [
        'Technology and innovation',
        'Creative arts and design',
        'Helping and counseling others',
        'Scientific research',
        'Business and entrepreneurship',
        'Healthcare and medicine',
        'Education and teaching',
        'Environmental sustainability'
      ]
    },
    skills: {
      field: 'skills',
      suggestions: [
        'Programming (Python, JavaScript, etc.)',
        'Data analysis and statistics',
        'Graphic design and visual communication',
        'Project management',
        'Public speaking and communication',
        'Foreign languages',
        'Leadership and team management',
        'Problem-solving and critical thinking'
      ]
    },
    education: {
      field: 'education',
      suggestions: [
        'High school diploma',
        'Associate degree',
        'Bachelor\'s degree',
        'Master\'s degree',
        'Doctorate/PhD',
        'Professional certification',
        'Vocational training',
        'Self-taught'
      ]
    },
    experience: {
      field: 'experience',
      suggestions: [
        'No formal experience',
        '1-3 years (Entry level)',
        '4-6 years (Mid-level)',
        '7-10 years (Experienced)',
        '10+ years (Senior level)',
        'Management experience',
        'Freelance/Consulting experience',
        'Entrepreneurial experience'
      ]
    }
  };

  const fetchCareerRecommendations = async () => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/careers?skills=${encodeURIComponent(formData.skills)}&interests=${encodeURIComponent(formData.interests)}`
      );
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch recommendations');
      
      setRecommendations(data);
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load career recommendations. Using sample data instead.');
      setRecommendations(getFallbackRecommendations());
      setHasAnalyzed(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFallbackRecommendations = (): CareerRecommendation[] => {
    return [
      {
        id: '15-1252.00',
        title: 'Software Developer',
        match: 94,
        salary: '$85,000 - $150,000',
        growth: '+22% (Much faster than average)',
        description: 'Develop, create, and modify general computer applications software or specialized utility programs.',
        skills: ['JavaScript', 'Python', 'SQL', 'Algorithms', 'Debugging'],
        demand: 'High',
        education: "Bachelor's degree in Computer Science",
        experience: '2-5 years',
        median_salary: 110000,
        job_outlook: 'Excellent',
        onet_code: '15-1252.00',
        bls_series: 'OEUM003018000000000000005',
        api_endpoints: {
          bls: '/api/bls?seriesId=OEUM003018000000000000005',
          onet: '/api/onet?onetCode=15-1252.00',
          jobs: '/api/adzuna?query=Software+Developer'
        }
      },
      {
        id: '15-2051.00',
        title: 'Data Scientist',
        match: 88,
        salary: '$95,000 - $165,000',
        growth: '+31% (Much faster than average)',
        description: 'Analyze and interpret complex digital data to assist decision-making.',
        skills: ['Python', 'Machine Learning', 'Statistics', 'Data Visualization', 'SQL'],
        demand: 'High',
        education: "Master's degree in Data Science or related field",
        experience: '3-6 years',
        median_salary: 125000,
        job_outlook: 'Excellent',
        onet_code: '15-2051.00',
        bls_series: 'OEUM004018000000000000005',
        api_endpoints: {
          bls: '/api/bls?seriesId=OEUM004018000000000000005',
          onet: '/api/onet?onetCode=15-2051.00',
          jobs: '/api/adzuna?query=Data+Scientist'
        }
      }
    ];
  };

  const fetchCareerPath = async (career: CareerRecommendation) => {
    setIsLoadingPath(true);
    setSelectedCareer(career);
    setError(null);
    
    try {
      // Fetch job listings from Adzuna
      const jobsResponse = await fetch(career.api_endpoints?.jobs || '');
      const jobsData = await jobsResponse.json();
      
      // Format job listings
      const jobListings: JobListing[] = jobsData.results?.map((job: any) => ({
        title: job.title,
        company: job.company?.display_name || 'Unknown',
        location: job.location?.display_name || 'Remote',
        salary: job.salary_is_predicted === '1' 
          ? 'Competitive' 
          : `$${Math.round(job.salary_min/1000)}k - $${Math.round(job.salary_max/1000)}k`,
        url: job.redirect_url,
        posted: new Date(job.created).toLocaleDateString(),
        description: job.description?.slice(0, 150) + '...' || 'No description available'
      })) || [];

      const mockCareerPath: CareerPath = {
        title: `${career.title} Career Path`,
        steps: [
          {
            position: 'Junior ' + career.title.split(' ')[0],
            experience: '0-2 years',
            skills: career.skills.slice(0, 3),
            salary_range: career.salary.replace(/\d+/g, m => Math.floor(parseInt(m) * 0.6).toString()),
            description: `Entry-level position focusing on learning ${career.title.toLowerCase()} fundamentals.`
          },
          {
            position: 'Mid-Level ' + career.title.split(' ')[0],
            experience: '2-5 years',
            skills: career.skills,
            salary_range: career.salary,
            description: `Takes ownership of ${career.title.toLowerCase()} tasks and contributes to team projects.`
          },
          {
            position: 'Senior ' + career.title.split(' ')[0],
            experience: '5-8 years',
            skills: [...career.skills, 'Leadership', 'Mentoring'],
            salary_range: career.salary.replace(/\d+/g, m => Math.floor(parseInt(m) * 1.3).toString()),
            description: `Leads ${career.title.toLowerCase()} projects and mentors junior team members.`
          },
          {
            position: career.title.split(' ')[0] + ' Lead/Manager',
            experience: '8+ years',
            skills: [...career.skills, 'Strategic Planning', 'Team Leadership'],
            salary_range: career.salary.replace(/\d+/g, m => Math.floor(parseInt(m) * 1.6).toString()),
            description: `Sets direction for ${career.title.toLowerCase()} initiatives and manages teams.`
          }
        ],
        certifications: [
          `${career.title} Professional Certification`,
          'Leadership Training',
          'Advanced Technical Certifications'
        ],
        education_path: [
          career.education || "Bachelor's degree in related field",
          "Continuing education courses",
          "Industry conferences and workshops"
        ],
        current_jobs: jobListings.slice(0, 3) // Show top 3 job listings
      };
      
      setCareerPath(mockCareerPath);
    } catch (error) {
      console.error('Error fetching career path:', error);
      setError('Failed to load detailed career path. Showing sample progression instead.');
      setCareerPath(null);
    } finally {
      setIsLoadingPath(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFieldRecommendations = (field: string) => {
    setShowFieldRecommendations(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const selectRecommendation = (field: string, value: string) => {
    handleInputChange(field, value);
    toggleFieldRecommendations(field);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 py-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          AI Career Pathfinder
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover your ideal career path powered by real-time labor market data and AI analysis.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Personal Profile
              </CardTitle>
              <CardDescription>
                Help us understand your background and preferences for accurate recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="interests">Interests & Passions</Label>
                  <button 
                    onClick={() => toggleFieldRecommendations('interests')}
                    className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    {showFieldRecommendations.interests ? 'Hide suggestions' : 'Get suggestions'}
                  </button>
                </div>
                <Textarea
                  id="interests"
                  placeholder="What excites you? e.g., Technology, creative design, helping others..."
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  className="min-h-20"
                />
                {showFieldRecommendations.interests && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Common Interest Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fieldRecommendations.interests.suggestions.map((suggestion, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-blue-100"
                          onClick={() => selectRecommendation('interests', suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="skills">Current Skills & Expertise</Label>
                  <button 
                    onClick={() => toggleFieldRecommendations('skills')}
                    className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    {showFieldRecommendations.skills ? 'Hide suggestions' : 'Get suggestions'}
                  </button>
                </div>
                <Textarea
                  id="skills"
                  placeholder="What are you good at? e.g., Programming, data analysis, communication..."
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  className="min-h-20"
                />
                {showFieldRecommendations.skills && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">In-Demand Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fieldRecommendations.skills.suggestions.map((suggestion, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-blue-100"
                          onClick={() => selectRecommendation('skills', suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="education">Education Level</Label>
                    <button 
                      onClick={() => toggleFieldRecommendations('education')}
                      className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Lightbulb className="w-3 h-3 mr-1" />
                      {showFieldRecommendations.education ? 'Hide suggestions' : 'Get suggestions'}
                    </button>
                  </div>
                  <Input
                    id="education"
                    placeholder="e.g., Bachelor's in Computer Science"
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                  />
                  {showFieldRecommendations.education && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Education Levels:</h4>
                      <div className="flex flex-wrap gap-2">
                        {fieldRecommendations.education.suggestions.map((suggestion, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-blue-100"
                            onClick={() => selectRecommendation('education', suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="experience">Experience Level</Label>
                    <button 
                      onClick={() => toggleFieldRecommendations('experience')}
                      className="text-xs flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Lightbulb className="w-3 h-3 mr-1" />
                      {showFieldRecommendations.experience ? 'Hide suggestions' : 'Get suggestions'}
                    </button>
                  </div>
                  <Input
                    id="experience"
                    placeholder="e.g., 2 years, Entry level, Experienced"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                  />
                  {showFieldRecommendations.experience && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Experience Levels:</h4>
                      <div className="flex flex-wrap gap-2">
                        {fieldRecommendations.experience.suggestions.map((suggestion, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-blue-100"
                            onClick={() => selectRecommendation('experience', suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Work Location Preference</Label>
                <div className="flex flex-wrap gap-2">
                  {workPreferences.map((pref) => (
                    <Button
                      key={pref}
                      variant={formData.workPreference === pref ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleInputChange('workPreference', pref)}
                    >
                      {pref}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Work-Life Balance Importance</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">Flexible</span>
                  <Slider 
                    defaultValue={[5]} 
                    max={10} 
                    step={1} 
                    className="flex-1"
                    onValueChange={(value) => handleInputChange('workLifeBalance', value[0].toString())}
                  />
                  <span className="text-sm text-slate-500">Essential</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="values">Career Values (Select up to 3)</Label>
                <div className="flex flex-wrap gap-2">
                  {careerValues.map((value) => (
                    <Badge 
                      key={value}
                      variant={formData.values.includes(value) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => {
                        const currentValues = formData.values.split(',').filter(v => v.trim());
                        if (currentValues.includes(value)) {
                          handleInputChange('values', currentValues.filter(v => v !== value).join(','));
                        } else if (currentValues.length < 3) {
                          handleInputChange('values', [...currentValues, value].join(','));
                        }
                      }}
                    >
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary Expectations</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $80K+, Competitive, Flexible"
                  value={formData.salaryExpectation}
                  onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={fetchCareerRecommendations}
            disabled={isAnalyzing || !formData.interests.trim() || !formData.skills.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing with real market data...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                Discover My Career Matches
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isAnalyzing && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Analyzing Real Market Data</h3>
                <p className="text-slate-600 mb-6">
                  Connecting to labor market APIs to find your best matches...
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-500 mb-1">
                    <span>Querying occupational databases...</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {hasAnalyzed && recommendations.length > 0 && !selectedCareer && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Top Career Matches
                </CardTitle>
                <CardDescription>
                  Powered by real labor market data and AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((career, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {career.title}
                          </h4>
                          <Badge variant={career.demand === 'High' ? 'default' : career.demand === 'Medium' ? 'secondary' : 'outline'}>
                            {career.demand} Demand
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{career.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{career.match}%</div>
                        <div className="text-xs text-slate-500">Match Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{career.salary}</div>
                          <div className="text-xs text-slate-500">Salary Range</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{career.growth}</div>
                          <div className="text-xs text-slate-500">Job Outlook</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{career.education}</div>
                          <div className="text-xs text-slate-500">Education</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-slate-900 mb-2">Key Skills Required:</div>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Progress value={career.match} className="flex-1 mr-4" />
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="group-hover:bg-blue-50"
                        onClick={() => fetchCareerPath(career)}
                      >
                        View Career Path
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">Data sources:</span> O*NET, BLS, and Adzuna labor market data. Updated monthly.
                </div>
              </CardFooter>
            </Card>
          )}

          {selectedCareer && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowRightCircle className="w-5 h-5 text-blue-600" />
                      {selectedCareer.title} Career Path
                    </CardTitle>
                    <CardDescription>
                      Detailed progression path with salary benchmarks and required milestones
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedCareer(null)}
                  >
                    Back to results
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingPath ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : careerPath ? (
                  <div className="space-y-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Career Overview</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-slate-500">Median Salary</div>
                          <div className="font-medium">{selectedCareer.salary}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Job Outlook</div>
                          <div className="font-medium">{selectedCareer.growth}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Education</div>
                          <div className="font-medium">{selectedCareer.education}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Experience</div>
                          <div className="font-medium">{selectedCareer.experience}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-slate-900 mb-4 border-b pb-2">Typical Career Progression</h3>
                      <div className="space-y-6">
                        {careerPath.steps.map((step, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {index + 1}
                              </div>
                              {index < careerPath.steps.length - 1 && (
                                <div className="w-0.5 h-10 bg-blue-200 my-1"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900">{step.position}</h4>
                              <div className="text-sm text-slate-600 mb-2">{step.experience} experience • {step.salary_range}</div>
                              <p className="text-sm text-slate-700 mb-2">{step.description}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {step.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {careerPath.certifications && careerPath.certifications.length > 0 && (
                      <div>
                        <h3 className="font-medium text-slate-900 mb-3">Recommended Certifications</h3>
                        <ul className="space-y-2">
                          {careerPath.certifications.map((cert, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {careerPath.education_path && careerPath.education_path.length > 0 && (
                      <div>
                        <h3 className="font-medium text-slate-900 mb-3">Education Pathway</h3>
                        <ul className="space-y-2">
                          {careerPath.education_path.map((edu, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {careerPath.current_jobs && careerPath.current_jobs.length > 0 && (
                      <div>
                        <h3 className="font-medium text-slate-900 mb-3">Current Job Openings</h3>
                        <div className="space-y-4">
                          {careerPath.current_jobs.map((job, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{job.title}</h4>
                                  <div className="text-sm text-slate-600 mb-1">{job.company} • {job.location}</div>
                                  <div className="text-sm font-medium text-green-600">{job.salary}</div>
                                  <p className="text-sm text-slate-500 mt-1">Posted: {job.posted}</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  asChild
                                  className="ml-4"
                                >
                                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                                    Apply <ExternalLink className="w-4 h-4 ml-1" />
                                  </a>
                                </Button>
                              </div>
                              <p className="text-sm text-slate-700 mt-2">{job.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-600">
                    Could not load career path details. Please try again later.
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">Data sources:</span> MyNextMove, O*NET, and Adzuna job listings.
                </div>
              </CardFooter>
            </Card>
          )}

          {!isAnalyzing && !hasAnalyzed && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Lightbulb className="w-5 h-5" />
                  Career Exploration Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BarChart2 className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Real Market Data</h4>
                    <p className="text-sm text-slate-600">
                      Our recommendations use live labor market data from government and industry sources.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Future Growth</h4>
                    <p className="text-sm text-slate-600">
                      We prioritize careers with strong growth projections to future-proof your choices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Briefcase className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Real Job Listings</h4>
                    <p className="text-sm text-slate-600">
                      Get direct links to current job openings for each recommended career path.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}