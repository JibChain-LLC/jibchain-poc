import Image from 'next/image';
import { useState } from 'react';
import Tick from '../../images/tick-icon.svg';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

export function DeactivateUserModal({ isOpen, onClose }: any) {
  // const [isDeactivatedModalOpen, setDeactivatedModalOpen] = useState(false);
  const [statusDeactivated, setStatusDeactivated] = useState<boolean>(true);
  const handleDeactivate = () => {
    setStatusDeactivated(false);
  };

  return (
    <>
      {statusDeactivated ? (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className='sm:max-w-[600px] lg:w-[700px]'>
            <DialogHeader>
              <DialogTitle className='text-lg'>Deactivate User?</DialogTitle>
            </DialogHeader>

            <h2>
              Are you sure you want to deactivate this user from the
              organization?
            </h2>

            <DialogFooter className='mt-1.5 flex w-full flex-row items-start justify-start'>
              <Button
                type='button'
                onClick={handleDeactivate}
                className='bg-red-700 p-4 hover:bg-red-700'>
                Deactivate
              </Button>
              <Button
                onClick={onClose}
                className='border border-green-700 bg-white text-green-700 hover:bg-white'>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <>
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
        </>
      )}

      {/* <UserDeactivated
        isOpen={isDeactivatedModalOpen}
        onClose={() => {
          setDeactivatedModalOpen(false);
          onClose();
        }}
      /> */}
    </>
  );
}
