import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthHeader: React.FC = () => {
  console.log('AuthHeader loaded');

  return (
    <header className="absolute top-0 left-0 right-0 py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            SeamlessLogin
          </span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;