import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '#/components/ui/card';

export default function Loading() {
  return (
    <Card>
      <CardContent className='flex h-full items-center justify-center'>
        <Loader2 className='animate-spin text-green-700' size={52} />
      </CardContent>
    </Card>
  );
}
