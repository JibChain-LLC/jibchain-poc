'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';
import userSignUp from '#/lib/actions/user/user-sign-up';
import signUpFormSchema, { UserSignUpSchema } from '#/lib/schema/user-sign-up';

export default function SignUpForm() {
  const form = useForm<UserSignUpSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: ''
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof signUpFormSchema>) => {
      const res = await userSignUp(data);
      if (!res.ok) throw new Error(res.message);
      return res;
    },
    onError: (e) => {
      form.setError('root', { message: e.message });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => mutate(d))}
        className='flex w-96 flex-col gap-3 rounded-md border-2 p-4'>
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
          name='passwordAgain'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Re-Enter Password</FormLabel>
              <FormControl>
                <Input {...field} type='password' placeholder='******' />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button type='submit' className='mt-5 w-full' disabled={isPending}>
          {!isPending ? (
            'Sign Up'
          ) : (
            <>
              Signing Up <LoaderCircle className='animate-spin' />
            </>
          )}
        </Button>
        <Link href={'/login'} className='text-center text-sm hover:underline'>
          Already have an account?
        </Link>
      </form>
    </Form>
  );
}
