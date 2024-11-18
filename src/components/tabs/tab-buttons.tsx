// TabButtons.tsx
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '#/components/ui/tabs';

interface Operation {
  label: string;
  value: string;
  path: string;
}

interface TabButtonsProps {
  operations: Operation[];
  router: any;
}

export default function TabButtons({ operations, router }: TabButtonsProps) {
  const pathname = usePathname();

  const currentTab =
    operations.find((op) => op.path === pathname)?.value || 'overview';

  const handleTabChange = (value: string) => {
    router.push(`/internal-security/${value}`);
  };

  return (
    <Tabs defaultValue={currentTab} className='mb-6'>
      <TabsList className='bg-transparent'>
        <div className='flex gap-3'>
          {operations.map((op, index) => (
            <TabsTrigger
              key={index}
              value={op.value}
              className='bg-white data-[state=active]:bg-black data-[state=active]:text-white'
              onClick={() => handleTabChange(op.value)}>
              {op.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
    </Tabs>
  );
}
