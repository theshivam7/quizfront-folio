
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, ChevronLeft, CheckCircle, HelpCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer?: string; // Only used for validation in this demo
}

const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data - would come from API in real application
  const quiz = {
    id: Number(quizId) || 1,
    title: 'Mathematics Basics',
    subject: 'Mathematics',
    timeLimit: 30,
    totalQuestions: 5,
    description: 'Test your knowledge of basic mathematical concepts.',
  };
  
  // Mock questions - would come from API
  const questions: Question[] = [
    {
      id: 1,
      text: 'What is 2 + 2?',
      options: [
        { id: 'a', text: '3' },
        { id: 'b', text: '4' },
        { id: 'c', text: '5' },
        { id: 'd', text: '22' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 2,
      text: 'What is the square root of 16?',
      options: [
        { id: 'a', text: '2' },
        { id: 'b', text: '4' },
        { id: 'c', text: '8' },
        { id: 'd', text: '16' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 3,
      text: 'If x + 5 = 12, what is x?',
      options: [
        { id: 'a', text: '5' },
        { id: 'b', text: '7' },
        { id: 'c', text: '12' },
        { id: 'd', text: '17' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 4,
      text: 'What is 3 × 9?',
      options: [
        { id: 'a', text: '12' },
        { id: 'b', text: '21' },
        { id: 'c', text: '27' },
        { id: 'd', text: '39' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 5,
      text: 'If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?',
      options: [
        { id: 'a', text: 'Scalene' },
        { id: 'b', text: 'Isosceles' },
        { id: 'c', text: 'Equilateral' },
        { id: 'd', text: 'Right-angled' }
      ],
      correctAnswer: 'c'
    }
  ];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60); // in seconds
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  // Handle selecting an answer
  const handleAnswerSelect = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  // Navigate to the next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Go to a specific question
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };
  
  // Submit quiz
  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < questions.length) {
      toast({
        title: "Incomplete Quiz",
        description: "Please answer all questions before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API request to submit answers
    // For demo purposes, we'll calculate the score here
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / questions.length) * 100);
    
    setQuizSubmitted(true);
    
    // Show result
    toast({
      title: "Quiz Submitted!",
      description: `Your score: ${score}%`,
    });
    
    // In a real app, we'd navigate to a results page
    // For demo, we'll redirect to dashboard after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };
  
  // Check if current question is answered
  const isCurrentQuestionAnswered = () => {
    return answers[currentQuestion.id] !== undefined;
  };
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
                <BreadcrumbPage>{quiz.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Quiz Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.subject} - {quiz.totalQuestions} questions</p>
            </div>
            <div className="flex items-center gap-2 text-lg font-medium">
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                Question {currentQuestionIndex + 1}: {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={answers[currentQuestion.id]} 
                onValueChange={handleAnswerSelect}
                className="space-y-4"
              >
                {currentQuestion.options.map((option) => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-2 p-4 rounded-md border cursor-pointer hover:bg-muted"
                  >
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button 
                  onClick={goToNextQuestion}
                  disabled={!isCurrentQuestionAnswered()}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(answers).length < questions.length}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Submit Quiz
                </Button>
              )}
            </CardFooter>
          </Card>
          
          {/* Question Navigation */}
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                {questions.map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => goToQuestion(index)}
                      isActive={currentQuestionIndex === index}
                      className={answers[questions[index].id] ? "bg-green-100 dark:bg-green-900/20" : ""}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          </div>
          
          {/* Question Status Legend */}
          <div className="flex justify-center gap-6 text-sm text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-100 dark:bg-green-900/20 border"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-background border"></div>
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Current</span>
            </div>
          </div>
          
          {/* Help Section */}
          <Card className="mt-6 bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Quiz Instructions</h3>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Select one answer for each question.</li>
                    <li>Use the navigation buttons or question numbers to move between questions.</li>
                    <li>You must answer all questions before submitting.</li>
                    <li>Your score will be displayed after submission.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default QuizPage;
