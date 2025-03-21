
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Award, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const QuizResults = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  // Mock data - would come from API in real application
  const quizResult = {
    id: Number(quizId) || 1,
    title: 'Mathematics Basics',
    subject: 'Mathematics',
    score: 80,
    correctAnswers: 4,
    totalQuestions: 5,
    timeTaken: '12:45',
    date: new Date().toISOString(),
    questions: [
      {
        id: 1,
        text: 'What is 2 + 2?',
        userAnswer: 'b',
        correctAnswer: 'b',
        isCorrect: true,
        options: [
          { id: 'a', text: '3' },
          { id: 'b', text: '4' },
          { id: 'c', text: '5' },
          { id: 'd', text: '22' }
        ]
      },
      {
        id: 2,
        text: 'What is the square root of 16?',
        userAnswer: 'b',
        correctAnswer: 'b',
        isCorrect: true,
        options: [
          { id: 'a', text: '2' },
          { id: 'b', text: '4' },
          { id: 'c', text: '8' },
          { id: 'd', text: '16' }
        ]
      },
      {
        id: 3,
        text: 'If x + 5 = 12, what is x?',
        userAnswer: 'b',
        correctAnswer: 'b',
        isCorrect: true,
        options: [
          { id: 'a', text: '5' },
          { id: 'b', text: '7' },
          { id: 'c', text: '12' },
          { id: 'd', text: '17' }
        ]
      },
      {
        id: 4,
        text: 'What is 3 × 9?',
        userAnswer: 'b',
        correctAnswer: 'c',
        isCorrect: false,
        options: [
          { id: 'a', text: '12' },
          { id: 'b', text: '21' },
          { id: 'c', text: '27' },
          { id: 'd', text: '39' }
        ]
      },
      {
        id: 5,
        text: 'If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?',
        userAnswer: 'c',
        correctAnswer: 'c',
        isCorrect: true,
        options: [
          { id: 'a', text: 'Scalene' },
          { id: 'b', text: 'Isosceles' },
          { id: 'c', text: 'Equilateral' },
          { id: 'd', text: 'Right-angled' }
        ]
      }
    ]
  };
  
  // Calculate feedback based on score
  const getFeedback = (score: number) => {
    if (score >= 90) return "Excellent! You've mastered this material.";
    if (score >= 80) return "Great job! You have a solid understanding.";
    if (score >= 70) return "Good work. Keep practicing to improve.";
    if (score >= 60) return "You passed, but should review the material.";
    return "You need more practice with this material.";
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Quiz Results</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Results Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{quizResult.title} Results</h1>
            <p className="text-muted-foreground">{quizResult.subject} - Completed on {formatDate(quizResult.date)}</p>
          </div>
          
          {/* Score Card */}
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                Your Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-6">
                <div className="text-5xl font-bold mb-4">{quizResult.score}%</div>
                <Progress 
                  value={quizResult.score} 
                  className="h-4 w-full max-w-md mb-4" 
                />
                <p className="text-center max-w-md">{getFeedback(quizResult.score)}</p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2 mt-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Correct Answers:</span>
                    <span className="font-medium">{quizResult.correctAnswers}/{quizResult.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Taken:</span>
                    <span className="font-medium">{quizResult.timeTaken}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </CardFooter>
          </Card>
          
          {/* Question Review */}
          <h2 className="text-2xl font-bold mb-4">Question Review</h2>
          
          <div className="space-y-6">
            {quizResult.questions.map((question, index) => (
              <Card 
                key={question.id} 
                className={`border-l-4 ${question.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium flex items-start gap-2">
                      <span>Question {index + 1}:</span> 
                      <span>{question.text}</span>
                    </CardTitle>
                    {question.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`p-3 rounded-md border ${
                          option.id === question.correctAnswer ? 'bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                          option.id === question.userAnswer && !question.isCorrect ? 'bg-red-100 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                          'bg-background'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{option.id.toUpperCase()}:</span>
                          <span>{option.text}</span>
                          {option.id === question.userAnswer && (
                            <span className="ml-auto text-sm font-medium">Your answer</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {!question.isCorrect && (
                    <div className="mt-4 text-sm">
                      <span className="font-medium">Correct answer: </span>
                      {question.options.find(o => o.id === question.correctAnswer)?.text}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/quiz/${quizResult.id}`)}
              className="flex items-center gap-2"
            >
              Take Quiz Again <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default QuizResults;
