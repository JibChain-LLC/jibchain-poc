import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import Image from 'next/image';
import Tick from '../../images/tick-icon.svg';

export default function UserDeactivated({ isOpen, onClose }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] lg:w-[700px]  '>
        <DialogHeader className='flex flex-row justify-start items-start gap-2'>
          <Image
            src={Tick}
            alt='tick'
            className='p-2 mt-1 rounded-full bg-green-100 '
            width={35}
            height={35}
          />
          <DialogTitle className='text-lg text-green-500'>
            User deactivated
          </DialogTitle>
        </DialogHeader>

        <h2>Bonnie Green has been successfully deactivated.</h2>

        <DialogFooter className='flex flex-row items-start justify-start w-full mt-1.5'>
          <Button
            onClick={onClose}
            className='bg-green-700 hover:bg-green-700 p-4'>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
