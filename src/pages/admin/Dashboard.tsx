
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  PieChart, 
  List, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Search,
  GraduationCap,
  BookOpen,
  Users
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock data - would come from API in real application
  const statistics = {
    totalUsers: 250,
    totalQuizzes: 45,
    totalSubjects: 8,
    totalQuizAttempts: 1250
  };

  const subjects = [
    { id: 1, name: 'Mathematics', quizzes: 12, chapters: 5 },
    { id: 2, name: 'Science', quizzes: 15, chapters: 8 },
    { id: 3, name: 'English', quizzes: 10, chapters: 4 },
    { id: 4, name: 'History', quizzes: 8, chapters: 6 },
  ];

  const quizzes = [
    { id: 1, title: 'Algebra Basics', subject: 'Mathematics', questions: 20, attempts: 125 },
    { id: 2, title: 'Chemical Reactions', subject: 'Science', questions: 15, attempts: 92 },
    { id: 3, title: 'Grammar Rules', subject: 'English', questions: 25, attempts: 78 },
    { id: 4, title: 'World War II', subject: 'History', questions: 18, attempts: 65 },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', quizzesTaken: 8, avgScore: 85 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', quizzesTaken: 12, avgScore: 92 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', quizzesTaken: 5, avgScore: 78 },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', quizzesTaken: 15, avgScore: 88 },
  ];

  const renderStatisticCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{statistics.totalUsers}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Total Quizzes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{statistics.totalQuizzes}</p>
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
          <p className="text-3xl font-bold">{statistics.totalSubjects}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Quiz Attempts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{statistics.totalQuizAttempts}</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <>
      {renderStatisticCards()}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Quizzes</CardTitle>
            <CardDescription>Latest quizzes added to the platform</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Questions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizzes.slice(0, 3).map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.subject}</TableCell>
                    <TableCell>{quiz.questions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" onClick={() => setActiveSection('quizzes')}>
              View all quizzes
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest users registered on the platform</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Quizzes Taken</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 3).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.quizzesTaken}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" onClick={() => setActiveSection('users')}>
              View all users
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );

  const renderSubjects = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subjects</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Subject</SheetTitle>
              <SheetDescription>
                Create a new subject for organizing quizzes.
              </SheetDescription>
            </SheetHeader>
            {/* Form would go here */}
            <SheetFooter className="mt-4">
              <Button>Save Subject</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Chapters</TableHead>
                <TableHead>Quizzes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.chapters}</TableCell>
                  <TableCell>{subject.quizzes}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Subject</SheetTitle>
                          </SheetHeader>
                          {/* Edit form would go here */}
                        </SheetContent>
                      </Sheet>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the subject and all associated quizzes.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderQuizzes = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Quiz
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Quiz</SheetTitle>
              <SheetDescription>
                Create a new quiz with questions and answers.
              </SheetDescription>
            </SheetHeader>
            {/* Form would go here */}
          </SheetContent>
        </Sheet>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.subject}</TableCell>
                  <TableCell>{quiz.questions}</TableCell>
                  <TableCell>{quiz.attempts}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Quiz</SheetTitle>
                          </SheetHeader>
                          {/* Edit form would go here */}
                        </SheetContent>
                      </Sheet>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the quiz and all associated attempts.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const renderUsers = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <div className="flex items-center bg-background border rounded-md px-3 py-2">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="bg-transparent border-none focus:outline-none text-sm"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Quizzes Taken</TableHead>
                <TableHead>Avg. Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.quizzesTaken}</TableCell>
                  <TableCell>{user.avgScore}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the user account and all their data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );

  const getActiveContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'subjects':
        return renderSubjects();
      case 'quizzes':
        return renderQuizzes();
      case 'users':
        return renderUsers();
      default:
        return renderDashboard();
    }
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
          <section className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage quizzes, subjects, and users</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            {/* Sidebar Navigation */}
            <Card className="h-fit md:sticky md:top-24">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button 
                    variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveSection('dashboard')}
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant={activeSection === 'subjects' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveSection('subjects')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Subjects
                  </Button>
                  <Button 
                    variant={activeSection === 'quizzes' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveSection('quizzes')}
                  >
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Quizzes
                  </Button>
                  <Button 
                    variant={activeSection === 'users' ? 'default' : 'ghost'} 
                    className="w-full justify-start" 
                    onClick={() => setActiveSection('users')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div>
              {getActiveContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
