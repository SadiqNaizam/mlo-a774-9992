import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import SocialLoginButtons from '@/components/SocialLoginButtons';

// Schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (values: LoginFormValues | RegisterFormValues) => void;
  isLoading?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
}) => {
  console.log('AuthForm loaded in mode:', mode);
  const [showPassword, setShowPassword] = useState(false);
  const isLoginMode = mode === 'login';
  const schema = isLoginMode ? loginSchema : registerSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: isLoginMode
      ? { email: '', password: '' }
      : { fullName: '', email: '', password: '' },
  });

  const title = isLoginMode ? 'Welcome back' : 'Create an account';
  const description = isLoginMode
    ? 'Sign in to access your account.'
    : 'Enter your details below to get started.';
  const buttonText = isLoginMode ? 'Sign In' : 'Create Account';
  const footerLinkText = isLoginMode
    ? "Don't have an account?"
    : 'Already have an account?';
  const footerLinkTo = isLoginMode ? '/sign-up' : '/';

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLoginMode && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {isLoginMode && (
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {buttonText}
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-card px-2 text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
        <SocialLoginButtons />
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          {footerLinkText}{' '}
          <Link to={footerLinkTo} className="font-medium text-primary hover:underline">
            {isLoginMode ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;