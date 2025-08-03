'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Briefcase
} from 'lucide-react';

interface CareerRecommendation {
  title: string;
  match: number;
  salary: string;
  growth: string;
  description: string;
  skills: string[];
  demand: 'High' | 'Medium' | 'Low';
}

export default function CareerChoiceAgent() {
  const [formData, setFormData] = useState({
    interests: '',
    skills: '',
    education: '',
    experience: '',
    location: '',
    salaryExpectation: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with IBM Watson X
    setTimeout(() => {
      const mockRecommendations: CareerRecommendation[] = [
        {
          title: 'Senior Software Engineer',
          match: 94,
          salary: '$85K - $150K',
          growth: '+22%',
          description: 'Design and develop scalable software applications using modern technologies.',
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
          demand: 'High'
        },
        {
          title: 'Data Scientist',
          match: 87,
          salary: '$90K - $160K',
          growth: '+31%',
          description: 'Analyze complex data to extract insights and build predictive models.',
          skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow'],
          demand: 'High'
        },
        {
          title: 'Product Manager',
          match: 82,
          salary: '$95K - $170K',
          growth: '+19%',
          description: 'Lead product development from conception to launch, working with cross-functional teams.',
          skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Leadership'],
          demand: 'Medium'
        },
        {
          title: 'UX/UI Designer',
          match: 79,
          salary: '$70K - $130K',
          growth: '+13%',
          description: 'Create intuitive and engaging user experiences for digital products.',
          skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS'],
          demand: 'Medium'
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Compass className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Career Choice Agent</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover your ideal career path with AI-powered analysis of your interests, skills, and market trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-600" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription>
              The more information you provide, the better our AI can match you with ideal careers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Passions</Label>
              <Textarea
                id="interests"
                placeholder="e.g., Technology, problem-solving, creative design, helping others..."
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Current Skills & Expertise</Label>
              <Textarea
                id="skills"
                placeholder="e.g., Programming, data analysis, communication, project management..."
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Input
                  id="education"
                  placeholder="e.g., Bachelor's in Computer Science"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 2 years, Entry level, Experienced"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, Remote, Flexible"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary Expectation</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $80K+, Competitive, Flexible"
                  value={formData.salaryExpectation}
                  onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !formData.interests.trim() || !formData.skills.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing with IBM Watson X...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze My Career Options
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {isAnalyzing && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis in Progress</h3>
                <p className="text-slate-600 mb-4">
                  Our Watson X AI is analyzing your profile against 500+ career paths...
                </p>
                <div className="space-y-2">
                  <Progress value={33} className="mb-2" />
                  <p className="text-sm text-slate-500">Processing market data and skill requirements...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {hasAnalyzed && recommendations.length > 0 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Your Career Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered matches based on your profile and market analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((career, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{career.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{career.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{career.match}%</div>
                        <div className="text-xs text-slate-500">Match</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
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
                          <div className="text-xs text-slate-500">Growth Rate</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        <div>
                          <Badge variant={career.demand === 'High' ? 'default' : 'secondary'}>
                            {career.demand} Demand
                          </Badge>
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
                      <Button size="sm" variant="outline">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}