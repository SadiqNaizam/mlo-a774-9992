import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Custom Components
import AuthForm from '@/components/AuthForm';
import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';

const SignUpPage: React.FC = () => {
  console.log('SignUpPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (values: any) => {
    setIsLoading(true);
    console.log('Sign-up form submitted with:', values);

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    
    // Show a success toast
    toast({
      title: "Account Created!",
      description: "You have successfully signed up. Please log in.",
    });

    // Redirect to the login page after successful sign-up
    navigate('/'); // Path from App.tsx
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm
          mode="register"
          onSubmit={handleSignUp}
          isLoading={isLoading}
        />
      </main>
      <AuthFooter />
    </div>
  );
};

export default SignUpPage;