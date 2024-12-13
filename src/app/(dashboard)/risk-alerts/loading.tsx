import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <Loader2 className='animate-spin text-green-600' size={52} />
    </div>
  );
}
