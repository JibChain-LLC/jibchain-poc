export default function CustomTabTrigger({
  title,
  amount
}: {
  title: string;
  amount: number;
}) {
  return (
    <div className='flex flex-col gap-0'>
      <span className='text-xs font-medium leading-tight'>{title}</span>
      <span className='text-3xl font-semibold leading-tight'>{amount}</span>
    </div>
  );
}
