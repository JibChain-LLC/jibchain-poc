import { MoreHorizontal, MoreVertical, X } from 'lucide-react';
import { ComponentProps, createElement, useState } from 'react';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu';

interface ControlledDropdownProps
  extends ComponentProps<typeof DropdownMenuContent> {
  direction?: 'vertical' | 'horizontal';
}

export default function ControlledDropdown(props: ControlledDropdownProps) {
  const { direction = 'vertical', ...rest } = props;

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          {open ? (
            <X />
          ) : (
            createElement(
              direction === 'vertical' ? MoreVertical : MoreHorizontal
            )
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent {...rest} />
    </DropdownMenu>
  );
}
