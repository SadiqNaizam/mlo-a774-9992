import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

// Custom Layout Components
import AuthHeader from '@/components/layout/AuthHeader';
import AuthFooter from '@/components/layout/AuthFooter';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ResetPasswordPage = () => {
  console.log('ResetPasswordPage loaded');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulate an API call to reset the password
    setTimeout(() => {
      setIsLoading(false);
      console.log('Password successfully reset.');
      
      // Show success toast notification
      toast.success('Your password has been updated successfully!');

      // Redirect to the login page as defined in App.tsx
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight text-center">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-center">
                Create a new, strong password for your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Set New Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
};

export default ResetPasswordPage;