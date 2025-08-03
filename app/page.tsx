'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Compass, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Users, 
  Star,
  ArrowRight,
  Briefcase,
  Target,
  Award,
  Brain,
  Zap,
  ChevronRight
} from 'lucide-react';
import CareerChoiceAgent from '@/components/career-choice-agent';
import SkillDevelopmentAgent from '@/components/skill-development-agent';
import ResumeBuilderAgent from '@/components/resume-builder-agent';

export default function Home() {
  const [activeAgent, setActiveAgent] = useState('overview');

  const agents = [
    {
      id: 'career',
      name: 'Career Choice Agent',
      icon: Compass,
      description: 'Discover your ideal career path',
      color: 'bg-blue-500',
      stats: { users: '15K+', accuracy: '94%', jobs: '2.5M+' }
    },
    {
      id: 'skills',
      name: 'Skill Development Agent',
      icon: BookOpen,
      description: 'Build skills for your future',
      color: 'bg-green-500',
      stats: { courses: '10K+', completion: '87%', certificates: '45K+' }
    },
    {
      id: 'resume',
      name: 'Resume Builder Agent',
      icon: FileText,
      description: 'Create ATS-optimized resumes',
      color: 'bg-purple-500',
      stats: { templates: '50+', matches: '92%', interviews: '3x' }
    }
  ];

  const metrics = [
    { label: 'Students Guided', value: '50,000+', icon: Users, change: '+12%' },
    { label: 'Success Rate', value: '94.2%', icon: TrendingUp, change: '+5.8%' },
    { label: 'Career Paths', value: '500+', icon: Briefcase, change: '+23%' },
    { label: 'AI Accuracy', value: '96.1%', icon: Brain, change: '+2.1%' }
  ];

  if (activeAgent !== 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveAgent('overview')}
              className="mb-4 hover:bg-blue-50"
            >
              ← Back to Dashboard
            </Button>
          </div>
          
          {activeAgent === 'career' && <CareerChoiceAgent />}
          {activeAgent === 'skills' && <SkillDevelopmentAgent />}
          {activeAgent === 'resume' && <ResumeBuilderAgent />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  CareerPath AI
                </h1>
                <p className="text-sm text-slate-600">Powered by IBM Watson X</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              AI Active
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your AI-Powered Career Journey
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-normal mt-2">
              From Student to Professional
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Three specialized AI agents working together to guide you through career discovery, 
            skill development, and landing your dream job.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="w-8 h-8 text-blue-600" />
                  <Badge variant="secondary" className="text-green-600 bg-green-50">
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Agents */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Meet Your AI Career Assistants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <Card 
                key={agent.id} 
                className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveAgent(agent.id)}
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${agent.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <agent.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {agent.name}
                  </CardTitle>
                  <CardDescription className="text-base text-slate-600">
                    {agent.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(agent.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-slate-900">{value}</div>
                        <div className="text-xs text-slate-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 group-hover:shadow-lg transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">How CareerPath AI Works</CardTitle>
            <CardDescription className="text-base">
              A seamless journey from discovery to success
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">1. Discover Your Path</h4>
                <p className="text-slate-600 text-sm">
                  AI analyzes your interests, skills, and market trends to recommend ideal career paths
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">2. Build Required Skills</h4>
                <p className="text-slate-600 text-sm">
                  Get personalized learning roadmaps with courses, projects, and assessments
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">3. Land Your Dream Job</h4>
                <p className="text-slate-600 text-sm">
                  Create ATS-optimized resumes and get matched with perfect opportunities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Trending Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'AI/ML Engineer', growth: '+45%', demand: 'Very High' },
                  { name: 'Data Scientist', growth: '+32%', demand: 'High' },
                  { name: 'Cybersecurity Analyst', growth: '+28%', demand: 'High' },
                  { name: 'Product Manager', growth: '+24%', demand: 'Medium' }
                ].map((career, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div>
                      <div className="font-medium text-slate-900">{career.name}</div>
                      <div className="text-sm text-slate-600">Growth: {career.growth}</div>
                    </div>
                    <Badge variant={career.demand === 'Very High' ? 'default' : career.demand === 'High' ? 'secondary' : 'outline'}>
                      {career.demand}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Recent Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', role: 'Software Engineer at Google', time: '2 days ago' },
                  { name: 'Michael Rodriguez', role: 'Data Analyst at Microsoft', time: '5 days ago' },
                  { name: 'Emily Johnson', role: 'UX Designer at Apple', time: '1 week ago' },
                  { name: 'David Kim', role: 'Product Manager at Meta', time: '2 weeks ago' }
                ].map((story, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{story.name}</div>
                      <div className="text-sm text-slate-600">{story.role}</div>
                    </div>
                    <div className="text-xs text-slate-500">{story.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}