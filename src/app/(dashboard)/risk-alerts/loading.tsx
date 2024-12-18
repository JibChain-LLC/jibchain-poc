import { Skeleton } from '#/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='size-full overflow-y-hidden'>
      <div className='mb-8 flex flex-col gap-1.5'>
        <Skeleton className='h-[22px] w-36' />
        <Skeleton className='h-[30px] w-52' />
      </div>
      <Skeleton className='mb-4 h-9 w-full' />
      <div className='mb-12 grid grid-cols-3 gap-2'>
        <Skeleton className='h-32' />
        <Skeleton className='h-32' />
        <Skeleton className='h-32' />
      </div>
      <div className='flex flex-col'>
        <Skeleton className='mb-0.5 h-3 w-40' />
        <Skeleton className='mb-4 h-5 w-80' />
        <Skeleton className='mb-4 h-48 w-4/5' />
        <Skeleton className='mb-4 h-4 w-80' />
        <Skeleton className='mb-8 h-10 w-40' />

        <Skeleton className='mb-0.5 h-3 w-40' />
        <Skeleton className='mb-6 h-5 w-80' />

        <Skeleton className='mb-0.5 h-3 w-40' />
        <Skeleton className='h-5 w-80' />
      </div>
    </div>
  );
}
