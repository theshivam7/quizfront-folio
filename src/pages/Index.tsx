
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/30" />
        </div>
        
        <div className="container mx-auto z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-block"
          >
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full">
              Introducing Quiz Master
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="heading-xl mb-6 mx-auto max-w-4xl"
          >
            Create and Share Quizzes with Elegance and Simplicity
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="subheading mb-10 mx-auto max-w-2xl"
          >
            A beautifully designed platform for creating, sharing, and taking quizzes. 
            Engage your audience with a stunning quiz experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="button-hover">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToFeatures}
              className="button-hover"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <button
            onClick={scrollToFeatures}
            className="animate-bounce p-2 rounded-full"
            aria-label="Scroll down"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-secondary/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-4">Designed for Simplicity</h2>
            <p className="subheading max-w-2xl mx-auto">
              Experience a quiz platform that focuses on what matters most — creating engaging content
              with a beautiful, distraction-free interface.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Beautiful Interface",
                description: "An elegant, intuitive interface that puts your content first and makes quiz creation a joy."
              },
              {
                title: "Responsive Design",
                description: "Quizzes that look and work beautifully on any device, from desktop to mobile."
              },
              {
                title: "Simple Sharing",
                description: "Share your quizzes with anyone, anywhere, with just a simple link."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-panel rounded-xl p-6 flex flex-col items-center text-center"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <span className="text-primary font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-lg mb-6">Ready to Create Your First Quiz?</h2>
            <p className="subheading mb-10">
              Join Quiz Master today and start creating beautiful quizzes that engage and inspire.
            </p>
            <Button asChild size="lg" className="button-hover">
              <Link to="/register">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
