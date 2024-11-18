import Image from 'next/image';
import Tick from '../../images/tick-icon.svg';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

interface UserDeactivatedProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDeactivated({
  isOpen,
  onClose
}: UserDeactivatedProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] lg:w-[700px]'>
        <DialogHeader className='flex flex-row items-start justify-start gap-2'>
          <Image
            src={Tick}
            alt='tick'
            className='mt-1 rounded-full bg-green-100 p-2'
            width={35}
            height={35}
          />
          <DialogTitle className='text-lg text-green-500'>
            User deactivated
          </DialogTitle>
        </DialogHeader>

        <h2>Bonnie Green has been successfully deactivated.</h2>

        <DialogFooter className='mt-1.5 flex w-full flex-row items-start justify-start'>
          <Button
            onClick={onClose}
            className='bg-green-700 p-4 hover:bg-green-700'>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
