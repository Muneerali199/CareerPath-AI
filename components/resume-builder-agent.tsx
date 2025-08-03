'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Award,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Code,
  Languages,
  Copy,
  Share
} from 'lucide-react';

interface JobAnalysis {
  company: string;
  position: string;
  matchScore: number;
  keySkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  summary: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

interface GeneratedResume {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: string[];
}

export default function ResumeBuilderAgent() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [jobUrl, setJobUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: ''
  });

  const handleJobAnalysis = async () => {
    if (!jobUrl.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: JobAnalysis = {
        company: 'Google',
        position: 'Senior Software Engineer',
        matchScore: 87,
        keySkills: ['Python', 'Machine Learning', 'Kubernetes', 'System Design', 'Microservices'],
        missingSkills: ['Go', 'TensorFlow', 'GCP'],
        recommendations: [
          'Emphasize your Python and ML experience in the summary',
          'Add specific examples of system design projects',
          'Highlight any cloud platform experience',
          'Include metrics and impact numbers for your achievements'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleGenerateResume = async () => {
    if (!analysis || !personalInfo.fullName.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI resume generation based on job analysis
    setTimeout(() => {
      const mockResume: GeneratedResume = {
        personalInfo: {
          ...personalInfo,
          summary: `Experienced ${analysis.position.toLowerCase()} with expertise in ${analysis.keySkills.slice(0, 3).join(', ')}. Proven track record of delivering scalable solutions and driving technical innovation. Passionate about leveraging cutting-edge technologies to solve complex business challenges.`
        },
        experience: [
          {
            id: '1',
            company: 'TechCorp Inc.',
            position: 'Software Engineer',
            startDate: '2022-01',
            endDate: '2024-12',
            current: true,
            description: 'Led development of microservices architecture serving 1M+ users',
            achievements: [
              'Improved system performance by 40% through optimization of Python algorithms',
              'Implemented machine learning models that increased user engagement by 25%',
              'Mentored 3 junior developers and established code review best practices'
            ]
          },
          {
            id: '2',
            company: 'StartupXYZ',
            position: 'Junior Developer',
            startDate: '2020-06',
            endDate: '2021-12',
            current: false,
            description: 'Developed full-stack web applications using modern JavaScript frameworks',
            achievements: [
              'Built responsive web applications serving 10K+ daily active users',
              'Collaborated with cross-functional teams to deliver features on time',
              'Reduced bug reports by 30% through comprehensive testing strategies'
            ]
          }
        ],
        education: [
          {
            id: '1',
            institution: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8',
            honors: 'Magna Cum Laude'
          }
        ],
        skills: [...analysis.keySkills, 'JavaScript', 'React', 'Docker', 'AWS', 'Git'],
        projects: [
          {
            name: 'AI-Powered Task Manager',
            description: 'Full-stack application with machine learning recommendations',
            technologies: ['Python', 'React', 'TensorFlow', 'PostgreSQL'],
            link: 'https://github.com/user/ai-task-manager'
          },
          {
            name: 'Microservices E-commerce Platform',
            description: 'Scalable e-commerce solution with containerized services',
            technologies: ['Node.js', 'Docker', 'Kubernetes', 'MongoDB'],
            link: 'https://github.com/user/ecommerce-platform'
          }
        ],
        certifications: [
          'AWS Certified Solutions Architect',
          'Google Cloud Professional Developer',
          'Certified Kubernetes Administrator'
        ]
      };
      
      setGeneratedResume(mockResume);
      setIsGenerating(false);
      setActiveTab('generated');
    }, 3000);
  };

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleDownloadResume = () => {
    // In a real implementation, this would generate and download a PDF
    alert('Resume download functionality would be implemented here');
  };

  const handleCopyResume = () => {
    // In a real implementation, this would copy the resume content to clipboard
    alert('Resume copied to clipboard!');
  };
  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech roles',
      preview: '/api/placeholder/200/250',
      atsScore: 95,
      popular: true
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Sophisticated layout for senior positions',
      preview: '/api/placeholder/200/250',
      atsScore: 92,
      popular: false
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Stylish design for creative professionals',
      preview: '/api/placeholder/200/250',
      atsScore: 88,
      popular: false
    },
    {
      id: 'minimal',
      name: 'Minimalist',
      description: 'Simple and clean focus on content',
      preview: '/api/placeholder/200/250',
      atsScore: 98,
      popular: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Resume Builder Agent</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Create ATS-optimized resumes tailored to specific job postings with AI-powered analysis and recommendations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analyze">Job Analysis</TabsTrigger>
          <TabsTrigger value="build">Build Resume</TabsTrigger>
          <TabsTrigger value="generated" disabled={!generatedResume}>Generated Resume</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="optimize">Optimize</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job URL Input */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Analyze Job Posting
                </CardTitle>
                <CardDescription>
                  Paste a job posting URL to get AI-powered insights and tailored resume recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="jobUrl">Job Posting URL</Label>
                  <Input
                    id="jobUrl"
                    placeholder="e.g., https://careers.google.com/jobs/..."
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Current Resume (Optional)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">Upload your current resume for comparison</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={handleJobAnalysis}
                  disabled={isAnalyzing || !jobUrl.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Job Requirements
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <div className="space-y-6">
              {isAnalyzing && (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis in Progress</h3>
                    <p className="text-slate-600 mb-4">
                      Analyzing job requirements and extracting key insights...
                    </p>
                    <Progress value={66} className="mb-2" />
                    <p className="text-sm text-slate-500">Processing job description and requirements...</p>
                  </CardContent>
                </Card>
              )}

              {analysis && (
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{analysis.position}</CardTitle>
                        <CardDescription>{analysis.company}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600 mb-1">{analysis.matchScore}%</div>
                        <div className="text-xs text-slate-500">Match Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Required Skills You Have
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keySkills.map((skill, index) => (
                          <Badge key={index} className="bg-green-50 text-green-700 border-green-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        Skills to Highlight or Learn
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-orange-300 text-orange-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        AI Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                      Generate Tailored Resume
                      <FileText className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="build" className="space-y-6">
          {analysis ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information Form */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Provide your details to generate a personalized resume for {analysis.position} at {analysis.company}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        value={personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="San Francisco, CA"
                        value={personalInfo.location}
                        onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/johndoe"
                        value={personalInfo.linkedin}
                        onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        placeholder="johndoe.dev"
                        value={personalInfo.portfolio}
                        onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary (Optional)</Label>
                    <Textarea
                      id="summary"
                      placeholder="AI will generate a tailored summary based on the job requirements..."
                      value={personalInfo.summary}
                      onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                      className="min-h-20"
                    />
                    <p className="text-xs text-slate-500">Leave blank to let AI generate a tailored summary</p>
                  </div>

                  <Button 
                    onClick={handleGenerateResume}
                    disabled={isGenerating || !personalInfo.fullName.trim() || !personalInfo.email.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating Resume with AI...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Complete Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generation Progress */}
              <div className="space-y-6">
                {isGenerating && (
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">Generating Your Resume</h3>
                      <p className="text-slate-600 mb-4">
                        AI is creating a tailored resume optimized for {analysis.position} at {analysis.company}...
                      </p>
                      <Progress value={75} className="mb-2" />
                      <p className="text-sm text-slate-500">Optimizing content for ATS compatibility...</p>
                    </CardContent>
                  </Card>
                )}

                {/* Job Analysis Summary */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Resume will be optimized for:</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{analysis.position}</div>
                        <div className="text-sm text-slate-600">{analysis.company}</div>
                      </div>
                      <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                        {analysis.matchScore}% Match
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Key Skills to Highlight:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keySkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">AI Optimizations:</h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          ATS-optimized formatting
                        </li>
                        <li className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Keyword optimization
                        </li>
                        <li className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Tailored professional summary
                        </li>
                        <li className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          Achievement-focused content
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Resume Builder
              </CardTitle>
              <CardDescription>
                Analyze a job posting first to generate a tailored resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Job Analysis Required</h3>
                <p className="text-slate-600 mb-6">
                  Please analyze a job posting first to generate a tailored resume optimized for that specific position.
                </p>
                <Button onClick={() => setActiveTab('analyze')} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Start Job Analysis
                  <Target className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
          )}
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          {generatedResume && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Resume Preview */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                          Generated Resume
                        </CardTitle>
                        <CardDescription>
                          Optimized for {analysis?.position} at {analysis?.company}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleCopyResume}>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" onClick={handleDownloadResume} className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-1" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center border-b pb-6">
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">{generatedResume.personalInfo.fullName}</h1>
                      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                        {generatedResume.personalInfo.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {generatedResume.personalInfo.email}
                          </span>
                        )}
                        {generatedResume.personalInfo.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {generatedResume.personalInfo.phone}
                          </span>
                        )}
                        {generatedResume.personalInfo.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {generatedResume.personalInfo.location}
                          </span>
                        )}
                      </div>
                      {(generatedResume.personalInfo.linkedin || generatedResume.personalInfo.portfolio) && (
                        <div className="flex justify-center gap-4 mt-2 text-sm text-blue-600">
                          {generatedResume.personalInfo.linkedin && (
                            <span>{generatedResume.personalInfo.linkedin}</span>
                          )}
                          {generatedResume.personalInfo.portfolio && (
                            <span>{generatedResume.personalInfo.portfolio}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Professional Summary */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Professional Summary
                      </h2>
                      <p className="text-slate-700 leading-relaxed">{generatedResume.personalInfo.summary}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Professional Experience
                      </h2>
                      <div className="space-y-4">
                        {generatedResume.experience.map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-slate-900">{exp.position}</h3>
                                <p className="text-slate-700 flex items-center gap-1">
                                  <Building className="w-4 h-4" />
                                  {exp.company}
                                </p>
                              </div>
                              <span className="text-sm text-slate-600 flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-2">{exp.description}</p>
                            <ul className="list-disc list-inside space-y-1 text-slate-700">
                              {exp.achievements.map((achievement, index) => (
                                <li key={index} className="text-sm">{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Education
                      </h2>
                      <div className="space-y-3">
                        {generatedResume.education.map((edu) => (
                          <div key={edu.id} className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-slate-900">{edu.degree} in {edu.field}</h3>
                              <p className="text-slate-700 flex items-center gap-1">
                                <GraduationCap className="w-4 h-4" />
                                {edu.institution}
                              </p>
                              {edu.gpa && (
                                <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>
                              )}
                              {edu.honors && (
                                <p className="text-sm text-slate-600">{edu.honors}</p>
                              )}
                            </div>
                            <span className="text-sm text-slate-600">{edu.startDate} - {edu.endDate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Technical Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Key Projects
                      </h2>
                      <div className="space-y-3">
                        {generatedResume.projects.map((project, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-slate-900">{project.name}</h3>
                              {project.link && (
                                <span className="text-sm text-blue-600">{project.link}</span>
                              )}
                            </div>
                            <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-3 border-b border-slate-200 pb-1">
                        Certifications
                      </h2>
                      <ul className="space-y-1">
                        {generatedResume.certifications.map((cert, index) => (
                          <li key={index} className="text-slate-700 flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-600" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Resume Stats & Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Resume Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">{analysis?.matchScore}%</div>
                      <div className="text-sm text-slate-600">Job Match Score</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">ATS Compatibility</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">98%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Keyword Optimization</span>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">95%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Content Quality</span>
                        <Badge className="bg-purple-50 text-purple-700 border-purple-200">92%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Export Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handleDownloadResume} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={handleCopyResume} className="w-full">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Different Templates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimize for Another Job
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Find Similar Positions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Professional Templates
              </CardTitle>
              <CardDescription>
                Choose from ATS-optimized templates designed for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="border-2 hover:border-purple-300 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        {template.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-purple-600">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="text-xs">
                          ATS: {template.atsScore}%
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">Preview</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Resume Optimization
              </CardTitle>
              <CardDescription>
                AI-powered analysis to maximize your resume's effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Optimization Tools Coming Soon</h3>
                <p className="text-slate-600 mb-6">
                  Get detailed feedback on ATS compatibility, keyword optimization, and formatting suggestions.
                </p>
                <Button variant="outline">
                  Request Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}