'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import userSignUp from '#/lib/actions/user-sign-up';
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

  const onSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    await userSignUp(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <Button type='submit' className='mt-5 w-full'>
          Sign Up
        </Button>
        <Link href={'/login'} className='text-center text-sm hover:underline'>
          Already have an account?
        </Link>
      </form>
    </Form>
  );
}
