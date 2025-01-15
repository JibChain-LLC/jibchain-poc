'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { useGoTo } from '#/hooks';
import revalidateAllPath from '#/revalidate-path';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { loginInput } from '#/trpc/schemas';

type LoginFormSchema = RouterInputs['auth']['login'];

export default function LoginForm() {
  const searchParams = useSearchParams();
  const goTo = useGoTo();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginInput),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {
    mutate: signInSubmit,
    isPending,
    isSuccess
  } = trpc.auth.login.useMutation({
    onError(e) {
      form.setError('root', { type: 'custom', message: e.message });
    },
    onSuccess: async () => {
      await revalidateAllPath();
      goTo(searchParams.get('redirectTo') ?? '/organization');
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => signInSubmit(d))}
        className='flex w-[32rem] flex-col gap-6'>
        <div className='flex flex-col gap-1 text-center'>
          <p className='text-2xl font-bold'>Welcome back</p>
          <p className='text-sm font-medium text-gray-500'>
            Don&apos;t have an account?{' '}
            <Link href={'/signup'} className='text-green-700 hover:underline'>
              Sign up
            </Link>
          </p>
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
                <Input {...field} type='password' placeholder='••••••••••' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        )}
        <Button
          type='submit'
          className='mt-5 w-full'
          disabled={isPending || isSuccess}>
          {!isPending && !isSuccess ? (
            'Sign in'
          ) : (
            <>
              Logging in <LoaderCircle className='animate-spin' />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
