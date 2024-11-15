import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';

export function ChangeRoleModal({ isOpen, onClose }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px] lg:w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-lg'>Change User Role?</DialogTitle>
        </DialogHeader>

        <h2 className=''>
          You're About to change <strong>Bonnie's</strong> role from Admin to
          Editor
        </h2>

        <DialogFooter className='flex flex-row items-start justify-start w-full  mt-1.5'>
          <Button
            type='submit'
            onClick={onClose}
            className='bg-[#046C4E] flex items-center gap-2 hover:bg-[#046C4E] p-4'>
            Change Role
          </Button>
          <Button
            onClick={onClose}
            className=' border border-green-700 text-green-700 bg-white hover:bg-white'>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
