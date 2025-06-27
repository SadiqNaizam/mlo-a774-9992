import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import { ShieldAlert } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <ShieldAlert className="h-24 w-24 text-destructive mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops! The page you're looking for could not be found.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8">
          <Link to="/">Go Back to Homepage</Link>
        </Button>
      </main>
      <AuthFooter />
    </div>
  );
};

export default NotFound;