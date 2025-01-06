import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual } from 'lodash';
import { ArrowRight, Loader2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Button } from '#/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '#/components/ui/dialog';
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
import { Label } from '#/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '#/components/ui/select';
import { useToast } from '#/components/ui/use-toast';
import { IndustryEnum } from '#/enums';
import revalidateAllPath from '#/revalidate-path';
import {
  type RouterInputs,
  type RouteOutputs,
  trpc
} from '#/trpc/query-clients/client';
import { updateOrgInput } from '#/trpc/schemas';

type UpdateOrgSchema = RouterInputs['org']['update'];
type ReadOrgSchema = Exclude<RouteOutputs['org']['read'], undefined>;

interface UpdateOrgFormProps {
  org: ReadOrgSchema;
}

const FIELD_MAP: Partial<Record<keyof UpdateOrgSchema, string>> = {
  name: 'Company Name',
  addressLines: 'Street Address',
  locality: 'Town/City',
  administrativeArea: 'State/Province',
  postalCode: 'Zip/Postal Code',
  countryCode: 'Country',
  category: 'Industry'
};

function findChanges<
  O extends Record<string, unknown>,
  C extends Record<string, unknown>
>(original: O, current: C) {
  const changes: Record<string, { from: O[keyof O]; to: C[keyof C] }> = {};

  for (const key in current) {
    if (!isEqual(original[key], current[key])) {
      changes[key] = { from: original[key], to: current[key] };
    }
  }
  return changes;
}

export default function UpdateOrgForm(props: UpdateOrgFormProps) {
  const { org } = props;

  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [changes, setChanges] = useState<
    ReturnType<
      typeof findChanges<
        Omit<ReadOrgSchema, 'owner' | 'dateCreated'>,
        UpdateOrgSchema
      >
    >
  >({});

  const form = useForm<UpdateOrgSchema>({
    resolver: zodResolver(updateOrgInput),
    defaultValues: {
      id: org.id,
      name: org.name,
      addressLines: org.addressLines,
      category: org.category,
      locality: org.locality,
      administrativeArea: org.administrativeArea,
      postalCode: org.postalCode,
      countryCode: org.countryCode
    }
  });

  useEffect(() => {
    form.reset({
      id: org.id,
      name: org.name,
      addressLines: org.addressLines,
      category: org.category,
      locality: org.locality,
      administrativeArea: org.administrativeArea,
      postalCode: org.postalCode,
      countryCode: org.countryCode
    });
  }, [org]);

  const { mutate, isPending } = trpc.org.update.useMutation({
    onSuccess: async (_, d) => {
      setIsDialogOpen(false);
      await utils.org.read.invalidate();
      await revalidateAllPath();
      form.reset(d);
      toast({
        title: 'Success',
        description: 'Updates to organization saved'
      });
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message
      });
    }
  });

  const onSubmit = (data: UpdateOrgSchema) => {
    const changedFields = findChanges<
      Omit<ReadOrgSchema, 'owner' | 'dateCreated'>,
      UpdateOrgSchema
    >(org, data);
    setChanges(changedFields);
    setIsDialogOpen(true);
  };

  const confirmChanges = () => {
    const d = form.getValues();
    mutate({ ...d });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => onSubmit(d))}
        className='flex flex-col gap-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
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
        </div>
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
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <FormField
            control={form.control}
            name='locality'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town/City</FormLabel>
                <FormControl>
                  <Input placeholder='New York' {...field} />
                </FormControl>
                <FormMessage />
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
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip/Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder='1235' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='countryCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
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
        </div>
        <div>
          <Label>Owner</Label>
          <div className='flex items-center gap-2'>
            <Avatar className='size-8'>
              <AvatarImage src='' alt='Owner' />
              <AvatarFallback>
                <User size={24} />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-base font-medium'>
                {org.owner.firstName} {org.owner.lastName}
              </p>
              <p className='text-xs font-medium text-gray-500'>
                {org.owner.user.email}
              </p>
            </div>
          </div>
        </div>
        <FormRootError />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type='submit'
              className='mt-2 w-fit'
              disabled={!form.formState.isDirty}>
              Save Changes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Changes</DialogTitle>
            </DialogHeader>
            <div>
              {Object.keys(changes).length > 0 ? (
                <div className='flex flex-col gap-3'>
                  {Object.entries(changes).map(([field, c]) => (
                    <div key={field} className='flex flex-col'>
                      <p className='text-sm font-semibold text-gray-500'>
                        {FIELD_MAP[field as keyof UpdateOrgSchema]}
                      </p>
                      <div className='flex flex-row items-center gap-1'>
                        <p>{c.from}</p>
                        <ArrowRight size={14} className='text-green-500' />
                        <p>{c.to}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No changes were made.</p>
              )}
            </div>
            {Object.keys(changes).length > 0 && (
              <DialogFooter>
                <Button onClick={confirmChanges} disabled={isPending}>
                  Confirm Changes{' '}
                  {isPending && <Loader2 className='animate-spin' />}
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
