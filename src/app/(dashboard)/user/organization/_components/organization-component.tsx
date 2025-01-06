'use client';

import { trpc } from '#/trpc/query-clients/client';
import UpdateOrgForm from './update-org-form';

interface OrganizationComponentProps {
  orgId: string;
}

export default function OrganizationComponent(
  props: OrganizationComponentProps
) {
  const { orgId } = props;

  const { isPending, data } = trpc.org.read.useQuery(orgId);

  return (
    <div className='w-full'>
      <h1 className='mb-4 text-[30px] font-bold'>{data?.name}</h1>
      {/* <div className='flex flex-col gap-2 lg:flex-row'>
          <div className='flex flex-col gap-2'>
            <p className='min-w-[120px]'>Company Logo</p>
            <Avatar className='size-20'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='relative w-full gap-2'>
            <Input type='file' id='avatar-input' className='hidden' />
            <label
              htmlFor='avatar-input'
              className='flex h-[140px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-black hover:border-gray-500'>
              <span className='text-center'>
                Click to upload or drag and drop
              </span>
              <span className='text-sm text-gray-500'>
                PNG or JPG (File size limit: 50MB)
              </span>
            </label>
          </div>
        </div> */}
      {!isPending && data && <UpdateOrgForm org={data} />}
    </div>
  );
}
