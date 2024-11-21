import OrganizationRisk from '#/components/organization/organization-risk';
import OrganizationTabs from '#/components/organization/organization-tabs';
import { Card, CardContent } from '#/components/ui/card';

export default function RiskNav() {
  return (
    <Card className='grow'>
      <CardContent>
        <OrganizationRisk />
        <OrganizationTabs />
      </CardContent>
    </Card>
  );
}
