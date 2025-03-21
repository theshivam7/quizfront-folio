
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Play, 
  Award, 
  Clock,  
  Users,
  BookOpen
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - would come from API in real application
  const availableQuizzes = [
    { id: 1, title: 'Mathematics Basics', subject: 'Mathematics', questions: 20, timeLimit: 30, difficulty: 'Easy' },
    { id: 2, title: 'Advanced Algebra', subject: 'Mathematics', questions: 15, timeLimit: 25, difficulty: 'Hard' },
    { id: 3, title: 'Chemistry Fundamentals', subject: 'Science', questions: 25, timeLimit: 40, difficulty: 'Medium' },
    { id: 4, title: 'Physics Mechanics', subject: 'Science', questions: 15, timeLimit: 30, difficulty: 'Hard' },
  ];
  
  const completedQuizzes = [
    { id: 1, title: 'English Grammar', score: 85, totalQuestions: 20, date: '2023-05-15' },
    { id: 2, title: 'Geography Basics', score: 70, totalQuestions: 15, date: '2023-05-10' },
    { id: 3, title: 'History 101', score: 92, totalQuestions: 25, date: '2023-05-05' },
  ];

  const subjects = [
    { name: 'Mathematics', quizzes: 10, enrolled: 120 },
    { name: 'Science', quizzes: 15, enrolled: 95 },
    { name: 'Language Arts', quizzes: 8, enrolled: 75 },
    { name: 'Social Studies', quizzes: 12, enrolled: 60 },
  ];

  // Function to get progress bar color based on score
  const getProgressColor = (score: number) => {
    return score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6"
        >
          {/* Welcome section */}
          <section className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
            <p className="text-muted-foreground">Track your progress and take new quizzes</p>
          </section>
          
          {/* Summary Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Available Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{availableQuizzes.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Completed Quizzes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{completedQuizzes.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{subjects.length}</p>
              </CardContent>
            </Card>
          </section>
          
          {/* Available Quizzes */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableQuizzes.map((quiz) => (
                <Card key={quiz.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{quiz.title}</CardTitle>
                      <Badge variant={
                        quiz.difficulty === 'Easy' ? 'default' :
                        quiz.difficulty === 'Medium' ? 'secondary' : 'destructive'
                      }>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{quiz.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{quiz.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">{quiz.questions} questions</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate(`/quiz/${quiz.id}`)}>
                      <Play className="h-4 w-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
          {/* Past Quiz Results */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Results</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedQuizzes.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.title}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell>{result.score}%</TableCell>
                        <TableCell className="w-[30%]">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={result.score}
                              className={`h-2 ${getProgressColor(result.score)}`}
                            />
                            <span className="text-xs w-12">{result.score}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
