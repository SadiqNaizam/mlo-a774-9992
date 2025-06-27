import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';
import AuthForm from '@/components/AuthForm';

const LoginPage: React.FC = () => {
  console.log('LoginPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // This handler will be passed to the AuthForm component.
  // The 'values' parameter will contain the form data (email, password).
  const handleLoginSubmit = (values: any) => {
    console.log('Login form submitted:', values);
    setIsLoading(true);

    // Simulate an API call for authentication
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate a successful login
      toast.success('Login Successful!', {
        description: "You're being redirected to your dashboard.",
      });

      // Redirect to a protected route after successful login.
      // Note: '/dashboard' is a placeholder and will lead to the NotFound page
      // as it's not defined in the provided App.tsx.
      navigate('/dashboard');

    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AuthHeader />

      <main className="flex-grow w-full flex items-center justify-center p-4">
        <AuthForm
          mode="login"
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
        />
      </main>

      <AuthFooter />
    </div>
  );
};

export default LoginPage;