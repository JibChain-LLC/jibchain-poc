import { Construction } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex h-full w-screen justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <Construction size={48} />
        <span className='text-2xl font-semibold italic'>
          This page is currently under construction
        </span>
      </div>
    </div>
  );
}
