
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="glass-panel p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Welcome Back
                </motion.h1>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Sign in to your Quiz Master account
                </motion.p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    className="h-12"
                  />
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    required 
                    className="h-12"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-12 button-hover"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </form>
              
              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
