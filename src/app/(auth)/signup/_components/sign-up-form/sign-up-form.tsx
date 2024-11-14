'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle, SquareCheckBig } from 'lucide-react';
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
import userSignUp from '#/lib/actions/user/user-sign-up';
import signUpFormSchema, { UserSignUpSchema } from '#/lib/schema/user-sign-up';

export default function SignUpForm() {
  const form = useForm<UserSignUpSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      jobRole: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (data: UserSignUpSchema) => {
      const res = await userSignUp(data);
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onError: (e) => {
      form.setError('root', { message: e.message });
    }
  });

  return (
    <div className='flex w-96 flex-col gap-3 rounded-md border-2 p-4'>
      {!isSuccess && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => mutate(d))}
            className='flex flex-col gap-3'>
            <h1 className='text-2xl font-bold'>Sign Up</h1>
            <div className='flex flex-row gap-3'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} type='text' placeholder='John' />
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
                      placeholder='username@email.com'
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
                    <Input {...field} type='password' placeholder='******' />
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
                    <Input {...field} type='password' placeholder='******' />
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
        <div className='flex flex-row gap-3'>
          <SquareCheckBig className='shrink-0' />
          <div className='flex flex-col gap-3'>
            <p className='font-bold'>Check you email to confirm</p>
            <p className='text-sm'>
              You&apos;ve successfully signed up. Please check your email to
              confirm your account in order to access the dashboard.
            </p>
          </div>
        </div>
      )}
      <Link href={'/login'} className='text-center text-sm hover:underline'>
        Already have an account?
      </Link>
    </div>
  );
}
