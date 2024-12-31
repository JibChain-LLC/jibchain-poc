import Link from 'next/link';
import { Button } from '#/components/ui/button';

export default function NoUser() {
  return (
    <div className='grid w-full grid-cols-2 gap-4'>
      <Button asChild variant={'outline'}>
        <Link href={'/login'}>Sign in</Link>
      </Button>
      <Button asChild>
        <Link href={'/signup'}>Create an account</Link>
      </Button>
    </div>
  );
}
