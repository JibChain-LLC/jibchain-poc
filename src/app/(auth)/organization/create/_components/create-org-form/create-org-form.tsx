'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useForm, useFormState } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { IndustryEnum } from '#/enums';
import { useGoTo } from '#/hooks';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { createOrgInput } from '#/trpc/schemas';

type CreateOrgSchema = RouterInputs['org']['create'];

export default function CreateOrgForm() {
  const goTo = useGoTo();
  const form = useForm<CreateOrgSchema>({
    resolver: zodResolver(createOrgInput),
    defaultValues: {
      name: '',
      addressLines: [''],
      locality: '',
      administrativeArea: '',
      postalCode: '',
      countryCode: ''
    }
  });

  const { isValid } = useFormState({
    control: form.control
  });

  const { mutate, isPending, isSuccess } = trpc.org.create.useMutation({
    onError: (err) => {
      form.setError('root', { message: err.message });
    },
    onSuccess: goTo('/organization')
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => mutate(d))}
        className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Acme Co. LLC' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an industry' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(IndustryEnum).map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='addressLines.0'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder='123 Main Street' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='locality'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='New York' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder='1235' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='administrativeArea'
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Province</FormLabel>
                <FormControl>
                  <Input placeholder='NY' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='countryCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a country' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='US'>United States</SelectItem>
                  <SelectItem value='CA'>Canada</SelectItem>
                  <SelectItem value='GB'>United Kingdom</SelectItem>
                  <SelectItem value='AU'>Australia</SelectItem>
                  <SelectItem value='DE'>Germany</SelectItem>
                  <SelectItem value='FR'>France</SelectItem>
                  <SelectItem value='JP'>Japan</SelectItem>
                  <SelectItem value='CN'>China</SelectItem>
                  <SelectItem value='IN'>India</SelectItem>
                  <SelectItem value='BR'>Brazil</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormRootError />
        <Button type='submit' disabled={isPending || isSuccess || !isValid}>
          {(isPending || isSuccess) && (
            <LoaderCircle className='animate-spin' />
          )}
          {isSuccess ? 'Redirecting' : 'Create Organization'}
        </Button>
      </form>
    </Form>
  );
}
