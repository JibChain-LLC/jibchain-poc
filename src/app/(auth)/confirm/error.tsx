'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error(_props: ErrorProps) {
  return (
    <div className='flex size-full items-center justify-center'>
      <div>
        <h2 className='text-3xl font-bold'>Something went wrong!</h2>
      </div>
    </div>
  );
}
