'use client';

import {
  Loader2,
  LucideIcon,
  OctagonAlert,
  ThumbsDown,
  ThumbsUp
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '#/components/ui/sheet';
import { RegionEnum, RiskLevelEnum } from '#/enums';
import { trpc } from '#/trpc/query-clients/client';
interface SupplierModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  supplierId: string;
}

const BADGE_MAP: Record<
  RiskLevelEnum,
  {
    variant: React.ComponentProps<typeof Badge>['variant'];
    text: string;
    icon: LucideIcon;
  }
> = {
  hi: { variant: 'destructive', text: 'High', icon: ThumbsDown },
  med: { variant: 'warning', text: 'Medium', icon: OctagonAlert },
  low: { variant: 'default', text: 'Low', icon: ThumbsUp }
};

const SupplierModal: React.FC<SupplierModalProps> = (props) => {
  const { isOpen, setOpen, supplierId } = props;
  const { data, isPending } = trpc.dash.suppliers.read.useQuery(supplierId);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className='w-[700px] p-6'>
        {!isPending && data && (
          <>
            <SheetHeader className='mb-8 flex flex-col items-start'>
              <SheetTitle className='flex flex-col items-start'>
                <Avatar className='mb-8 size-20'>
                  <AvatarImage src='' />
                  <AvatarFallback className='text-3xl text-white'>
                    {data.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className='mb-3 text-sm font-medium text-gray-600'>
                  Supplier since March 2022
                </h2>
                <h1 className='mb-2 text-2xl font-bold leading-none'>
                  {data?.name}
                </h1>
                <h2 className='text-lg font-normal'>{data.category}</h2>
              </SheetTitle>
            </SheetHeader>

            <div className='grid grid-cols-2'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium text-gray-600'>Risk Status</p>
                {data.riskEvents[0] && (
                  <Badge
                    sz={'lg'}
                    variant={
                      BADGE_MAP[data.riskEvents[0].risk.riskLevel!].variant
                    }
                    className='flex w-fit items-center gap-2 px-4 py-2 text-lg font-semibold'>
                    {(() => {
                      const { text, icon: Icon } =
                        BADGE_MAP[data.riskEvents[0].risk.riskLevel!];
                      return (
                        <>
                          <Icon />
                          {text}
                        </>
                      );
                    })()}
                  </Badge>
                )}
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm font-medium text-gray-600'>
                  Risk Exposure
                </p>
                <div className='flex flex-col'>
                  {data.riskEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/risk-alerts/${event.risk.id}`}
                      className='border-b border-gray-200 p-3 text-base font-normal text-black transition-colors hover:rounded-md hover:border-transparent hover:bg-gray-100'>
                      {event.risk.riskCategory}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className='mb-10'>
              <p className='mb-0.5 text-sm font-medium text-gray-600'>
                Region ({data.regions?.length ?? 0})
              </p>
              {data.regions &&
                data.regions.map((r, idx) => (
                  <p
                    key={idx}
                    className='border-l-2 border-green-500 pl-3 text-base font-normal'>
                    {RegionEnum[r]}
                  </p>
                ))}
            </div>

            <div className='mb-8 flex gap-4'>
              <Button disabled>Download Report</Button>
              <Button asChild variant={'outline'} className='mb-8'>
                <a href='mailto:coeus@adssrisk.com'>Contact ADSS</a>
              </Button>
            </div>

            <div className='grid grid-cols-2 border-t border-gray-200 pt-2'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Contact</p>
                <p className='text-base font-semibold'>
                  {data.contactName ?? 'N/A'}
                </p>
                {data.email && (
                  <>
                    <p className='mb-5 text-sm font-normal text-gray-600'>
                      {data.email}
                    </p>
                    <Button asChild variant={'outline'}>
                      <a href={`mailto:${data.email}`}>Contact Supplier</a>
                    </Button>
                  </>
                )}
              </div>
              <div>
                <p className='text-sm font-medium text-gray-600'>Address</p>
                <div className='text-sm font-normal'>
                  <p>{data.addressLines?.join(' ')}</p>
                  <p>
                    {data.locality}, {data.administrativeArea} {data.postalCode}
                  </p>
                  <p>{data.countryCode}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {isPending && (
          <div className='flex size-full items-center justify-center'>
            <Loader2 size={48} className='animate-spin text-green-600' />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SupplierModal;
