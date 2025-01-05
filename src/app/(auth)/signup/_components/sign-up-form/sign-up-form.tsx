'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, MailCheck } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { signUpInput } from '#/trpc/schemas';

type SignUpFormSchema = RouterInputs['auth']['signUp'];

export default function SignUpForm() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpInput),
    defaultValues: {
      jobRole: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const {
    mutate: signUp,
    isPending,
    isSuccess
  } = trpc.auth.signUp.useMutation({
    onError(e) {
      form.setError('root', { message: e.message });
    }
  });

  return (
    <div className='flex max-w-lg flex-col gap-3'>
      {!isSuccess && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => signUp(d))}
            className='flex flex-col gap-3'>
            <div className='mb-3 flex flex-col gap-1 text-center'>
              <h3 className='text-2xl font-bold leading-tight text-gray-900'>
                Create your account
              </h3>
              <p className='text-sm font-medium text-gray-500'>
                Already have an account?{' '}
                <Link
                  href={'/login'}
                  className='text-green-700 hover:underline'>
                  Click here
                </Link>
              </p>
            </div>
            <div className='flex flex-row gap-3'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder='Jane' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder='Doe' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='jobRole'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Operations Manager'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder='name@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='••••••••••'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      placeholder='••••••••••'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormRootError />
            <Button type='submit' className='mt-5 w-full' disabled={isPending}>
              {!isPending ? (
                'Sign Up'
              ) : (
                <>
                  Signing Up <LoaderCircle className='animate-spin' />
                </>
              )}
            </Button>
          </form>
        </Form>
      )}
      {isSuccess && (
        <div className='flex flex-col items-center text-center'>
          <MailCheck className='mb-4 text-green-400' />
          <p className='mb-1 text-2xl font-bold leading-tight'>
            Confirm your email
          </p>
          <p className='text-sm font-medium text-gray-600'>
            You have successfully signed up. Please check your email to gain
            access to your account.
          </p>
        </div>
      )}
    </div>
  );
}
