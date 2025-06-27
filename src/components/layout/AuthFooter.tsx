import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter: React.FC = () => {
  console.log('AuthFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} SeamlessLogin. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/terms"
            className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default AuthFooter;