'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { cloneElement } from 'react';
import { FieldPath, FieldValues, useForm, useFormState } from 'react-hook-form';
import { Button } from '#/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { useGoTo } from '#/hooks';
import { cn } from '#/lib/utils';
import { RouterInputs } from '#/trpc';
import { trpc } from '#/trpc/query-clients/client';
import { createOrgInput } from '#/trpc/schemas';

type CreateOrgSchema = RouterInputs['org']['create'];

type FormFieldWrapperProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Pick<
  React.ComponentProps<typeof FormField<TFieldValues, TName>>,
  'control' | 'name'
> & {
  label: string;
  required?: boolean;
  desc?: string;
} & (
    | {
        type?: 'input';
        props?: React.ComponentProps<typeof Input>;
      }
    | {
        type: 'select';
        props?: React.ComponentProps<typeof Select>;
        items: { label: string; value: string }[];
      }
  );

function FormFieldWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormFieldWrapperProps<TFieldValues, TName>) {
  const {
    control,
    name,
    label,
    required = false,
    desc,
    type = 'input',
    props: p,
    items
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            className={cn(
              required && 'after:ml-1 after:text-red-700 after:content-["*"]'
            )}>
            {label}
          </FormLabel>
          {(() => {
            switch (type) {
              case 'select':
                return (
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='sdfsdsdf' defaultValue={''} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {items.map(({ label, value }) => (
                        <SelectItem value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              default:
                return (
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                );
            }
          })()}

          {desc && <FormDescription>{desc}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

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
        onSubmit={form.handleSubmit((d) => {
          console.log(d);
        })}
        className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='addressLines.0'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormFieldWrapper control={form.control} name='locality' label='City' />
        <FormFieldWrapper
          control={form.control}
          name='administrativeArea'
          label='State'
        />
        <div className='flex gap-4'>
          <FormFieldWrapper
            control={form.control}
            name='postalCode'
            label='Zip Code'
          />
          <FormFieldWrapper
            type='select'
            items={[{ label: 'United States', value: 'US' }]}
            control={form.control}
            name='countryCode'
            label='Country'
          />
        </div>

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
