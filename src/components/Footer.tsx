
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Quiz Master. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
