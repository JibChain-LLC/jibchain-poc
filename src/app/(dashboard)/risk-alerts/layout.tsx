import OrgCard from '#/components/organization-card';
import RiskNav from './_components/risk-nav';

interface RiskAlertsLayoutProps {
  children: React.ReactNode;
}

export default function RiskAlertsLayout(props: RiskAlertsLayoutProps) {
  const { children } = props;

  return (
    <div className='grid h-full grid-cols-[336px_1fr] grid-rows-1 gap-4'>
      <div className='flex flex-col gap-4'>
        <OrgCard />
        <RiskNav />
      </div>
      {children}
    </div>
  );
}
