import { MoreHorizontal } from 'lucide-react';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';

export default function RiskAlertHeader() {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div className='flex flex-col gap-1.5'>
        <div className='flex flex-row items-center gap-1.5'>
          <span className='text-xs font-semibold text-gray-500'>
            Live view:
          </span>
          <Badge variant={'destructive'}>
            {'High'} Threat: {'76'}%
          </Badge>
        </div>
        <p className='text-2xl font-semibold leading-tight text-gray-950'>
          {'Ransomware Attack'}
        </p>
      </div>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' className='text-xl text-gray-500'>
          <MoreHorizontal />
        </Button>
        <Button>Download Report</Button>
      </div>
    </div>
  );
}