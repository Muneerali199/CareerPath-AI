'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Award, 
  PlayCircle,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Zap,
  Brain
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  rating: number;
  students: string;
  price: string;
  skills: string[];
  progress?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  courses: Course[];
  skills: string[];
  difficulty: string;
}

export default function SkillDevelopmentAgent() {
  const [selectedCareer, setSelectedCareer] = useState('software-engineer');
  const [activeTab, setActiveTab] = useState('roadmap');

  const learningPaths: Record<string, LearningPath> = {
    'software-engineer': {
      id: 'software-engineer',
      title: 'Software Engineer',
      description: 'Complete roadmap to become a full-stack software engineer',
      duration: '6-8 months',
      difficulty: 'Intermediate',
      skills: ['JavaScript', 'React', 'Node.js', 'Database Design', 'System Design'],
      courses: [
        {
          id: '1',
          title: 'JavaScript Fundamentals',
          provider: 'TechEd Pro',
          duration: '4 weeks',
          level: 'Beginner',
          rating: 4.8,
          students: '45K',
          price: 'Free',
          skills: ['JavaScript', 'ES6+', 'DOM Manipulation'],
          progress: 100
        },
        {
          id: '2',
          title: 'React Development Masterclass',
          provider: 'CodeAcademy',
          duration: '6 weeks',
          level: 'Intermediate',
          rating: 4.7,
          students: '32K',
          price: '$49',
          skills: ['React', 'JSX', 'State Management', 'Hooks'],
          progress: 75
        },
        {
          id: '3',
          title: 'Node.js Backend Development',
          provider: 'DevPath',
          duration: '5 weeks',
          level: 'Intermediate',
          rating: 4.6,
          students: '28K',
          price: '$39',
          skills: ['Node.js', 'Express', 'APIs', 'Authentication'],
          progress: 30
        },
        {
          id: '4',
          title: 'Database Design & SQL',
          provider: 'DataCamp',
          duration: '3 weeks',
          level: 'Beginner',
          rating: 4.5,
          students: '38K',
          price: '$29',
          skills: ['SQL', 'Database Design', 'PostgreSQL'],
          progress: 0
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedCareer];
  const completedCourses = currentPath.courses.filter(course => course.progress === 100).length;
  const overallProgress = Math.round((currentPath.courses.reduce((acc, course) => acc + (course.progress || 0), 0) / (currentPath.courses.length * 100)) * 100);

  const projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'Build a responsive portfolio using React and modern CSS',
      difficulty: 'Beginner',
      estimatedTime: '2-3 days',
      skills: ['React', 'CSS', 'Responsive Design'],
      status: 'completed'
    },
    {
      title: 'Task Management App',
      description: 'Full-stack application with authentication and real-time updates',
      difficulty: 'Intermediate',
      estimatedTime: '1-2 weeks',
      skills: ['React', 'Node.js', 'Database', 'Authentication'],
      status: 'in-progress'
    },
    {
      title: 'E-commerce Platform',
      description: 'Complete shopping platform with payment integration',
      difficulty: 'Advanced',
      estimatedTime: '3-4 weeks',
      skills: ['Full-Stack', 'Payment APIs', 'System Design'],
      status: 'locked'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Skill Development Agent</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Personalized learning roadmaps and skill-building programs tailored to your career goals.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Your Learning Progress
              </CardTitle>
              <CardDescription>Track your journey to becoming a {currentPath.title}</CardDescription>
            </div>
            <Badge className="bg-green-50 text-green-700 border-green-200">
              {overallProgress}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">{completedCourses}/{currentPath.courses.length}</div>
              <div className="text-sm text-slate-600">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">{currentPath.skills.length}</div>
              <div className="text-sm text-slate-600">Skills to Master</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">{currentPath.duration}</div>
              <div className="text-sm text-slate-600">Est. Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">15</div>
              <div className="text-sm text-slate-600">Certificates</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
          <TabsTrigger value="projects">Practice Projects</TabsTrigger>
          <TabsTrigger value="assessments">Skill Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                {currentPath.title} Learning Path
              </CardTitle>
              <CardDescription>
                AI-curated curriculum based on industry requirements and your learning pace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentPath.courses.map((course, index) => (
                <div key={course.id} className="border border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        course.progress === 100 ? 'bg-green-500' : course.progress && course.progress > 0 ? 'bg-blue-500' : 'bg-slate-300'
                      }`}>
                        {course.progress === 100 ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : course.progress && course.progress > 0 ? (
                          <PlayCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-semibold text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900 mb-1">{course.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">by {course.provider}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={course.price === 'Free' ? 'secondary' : 'outline'}>
                        {course.price}
                      </Badge>
                      <div className="text-sm font-medium text-green-600 mt-1">
                        {course.progress}% Complete
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Progress value={course.progress || 0} className="flex-1 mr-4" />
                    <Button 
                      size="sm" 
                      variant={course.progress === 100 ? "outline" : "default"}
                      className={course.progress === 100 ? "" : "bg-green-600 hover:bg-green-700"}
                    >
                      {course.progress === 100 ? 'Review' : course.progress && course.progress > 0 ? 'Continue' : 'Start Course'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Practice Projects
              </CardTitle>
              <CardDescription>
                Hands-on projects to reinforce your learning and build your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  project.status === 'locked' ? 'border-slate-200 bg-slate-50' : 'border-slate-200 hover:border-orange-300'
                } transition-colors`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`font-semibold ${project.status === 'locked' ? 'text-slate-500' : 'text-slate-900'}`}>
                          {project.title}
                        </h4>
                        <Badge variant={
                          project.difficulty === 'Beginner' ? 'secondary' :
                          project.difficulty === 'Intermediate' ? 'default' : 'destructive'
                        }>
                          {project.difficulty}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-3 ${project.status === 'locked' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {project.status === 'completed' && (
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {project.status === 'in-progress' && (
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {project.status === 'locked' && (
                        <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">🔒</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    variant={project.status === 'completed' ? "outline" : "default"}
                    disabled={project.status === 'locked'}
                    className={project.status === 'locked' ? "" : project.status === 'completed' ? "" : "bg-orange-600 hover:bg-orange-700"}
                  >
                    {project.status === 'locked' ? 'Complete Prerequisites' :
                     project.status === 'completed' ? 'View Project' :
                     project.status === 'in-progress' ? 'Continue Project' : 'Start Project'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Skill Assessments
              </CardTitle>
              <CardDescription>
                Test your knowledge and earn certificates to validate your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Skill Assessments Coming Soon</h3>
                <p className="text-slate-600 mb-6">
                  Complete more courses to unlock personalized skill assessments and earn industry-recognized certificates.
                </p>
                <Button variant="outline">
                  View Available Assessments
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}