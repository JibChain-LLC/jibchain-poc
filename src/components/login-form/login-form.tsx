'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
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
import signInUser from '#/lib/actions/user-login';
import loginFormSchema, { type UserLoginSchema } from '#/lib/schema/user-login';

export default function LoginForm() {
  const form = useForm<UserLoginSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: UserLoginSchema) => {
    const { email, password } = data;
    const e = await signInUser({ email, password });
    if (e) form.setError('root', { type: 'custom', message: e.message });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-80 flex-col gap-3 rounded-md border-2 p-4'>
        <h1 className='text-2xl font-bold'>Login</h1>
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
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button type='submit' className='mt-5 w-full'>
          Log In
        </Button>
        <Link href={'/signup'} className='text-center text-sm hover:underline'>
          Don&apos;t have an account yet?
        </Link>
      </form>
    </Form>
  );
}
