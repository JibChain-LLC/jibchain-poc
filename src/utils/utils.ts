import { Bell } from 'flowbite-react-icons/solid';
import { Grid } from 'flowbite-react-icons/solid';
import { Truck } from 'flowbite-react-icons/solid';
import { UsersGroup } from 'flowbite-react-icons/solid';

import { ShieldAlert, Globe, FileText } from 'lucide-react';
import { ChartConfig } from '#/components/ui/chart';
import MoneyImage from '#/images/money-image.jpg';
import smallLogo from '#/images/small.svg';

export const roles = [
  { value: 'Owner', label: 'Owner' },
  { value: 'Admin', label: 'Admin' },
  {
    value: 'Editor',
    label: 'Editor',
    className: 'border-b-[1px] rounded-none border-gray-200'
  },
  { value: 'Deactive', label: 'Deactivate User', className: 'text-red-500' }
];
export const formOrganizationFields = [
  {
    id: 'company-name',
    label: 'Company Name',
    defaultValue: 'Shell USA, Inc.'
  },
  {
    id: 'organization-id',
    label: 'Organization ID',
    defaultValue: 'DE42313253'
  },
  { id: 'address', label: 'Address', defaultValue: '4517 Washington Ave.' },
  { id: 'town-city', label: 'Town/City', defaultValue: 'Manchester' },
  { id: 'country', label: 'Country', defaultValue: 'United States' },
  { id: 'state-county', label: 'State/County', defaultValue: 'Delaware' },
  { id: 'zip-postal-code', label: 'Zip/Postal Code', defaultValue: '29403' }
];

export const formUserFields = [
  { id: 'first-name', label: 'First Name', defaultValue: 'Jamie' },
  { id: 'last-name', label: 'Last Name', defaultValue: 'Smith' },
  {
    id: 'organization',
    label: 'Organization',
    defaultValue: 'Shell USA, Inc.'
  },
  {
    id: 'job-title',
    label: 'Job Title',
    defaultValue: 'Chief Operating Officer'
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    defaultValue: 'jsmith@shell.com'
  },
  { id: 'role', label: 'Role', isSelect: true },
  { id: 'password', label: 'Password', type: 'password' },
  { id: 'confirm-password', label: 'Confirm Password', type: 'password' }
];

export const sidebarLinks = [
  { name: 'Dashboard', icon: Grid, link: '/dashboard' },
  { name: 'Risk Alerts', icon: Bell, link: '/risk-alerts' },
  { name: 'Suppliers', icon: Truck, link: '/suppliers' },
  { name: 'My Team', icon: UsersGroup, link: '/organization' }
];
export const chartData = [
  { status: 'Risk', value: 3, fill: '#FF5722' },
  { status: 'Medium', value: 7, fill: '#ff916f' },
  { status: 'Low', value: 10, fill: '#d4f8d4' }
];

export const criticalRiskAlerts = [
  { label: 'Ransomware Attack', link: '/ransomware-attack' },
  { label: 'Internal Security Failures', link: '/internal-security' },
  { label: 'Natural Disaster', link: '/natural-disaster' },
  { label: 'Terrorism', link: '/terrorism' },
  { label: 'Cyber Security', link: '/cyber-security' }
];
export const mediumRiskAlerts = [
  { label: 'Technological Failure', link: '/technological-failure' },
  { label: 'Terrorism', link: './terrorism' },
  { label: 'Cyber Security', link: './cyber-security' },
  { label: 'Labor Strike', link: './labor-strike' },
  { label: 'Public Health Crisis', link: './public-health-crisis' },
  { label: 'Economic Downturn', link: './economic-downturn' }
];
export const lowRiskAlerts = [
  { label: 'Environmental', link: '/environmental' },
  { label: 'Supply Chain', link: './supply-chain' },
  { label: 'Regulatory Changes', link: './regulatory-changes' },
  { label: 'Political', link: './political' },
  { label: 'Internet Security', link: './internal-security' },
  { label: 'Counterfeit Parts', link: './counterfeit-parts' },
  { label: 'Ransomware', link: './ransomware' },
  { label: 'Legal Risks', link: './legal-risks' },
  { label: 'SDLC Processes', link: '/sdlc-processes' },
  { label: 'Cloud Service', link: '/cloud-service' }
];
export const notifications = [
  {
    title: 'COEUS Communication',
    description: 'Get flowbites news announcements'
  },
  {
    title: 'COEUS Communication',
    description: 'Get flowbites news announcements'
  },
  {
    title: 'COEUS Communication',
    description: 'Get flowbites news announcements'
  },
  {
    title: 'COEUS Communication',
    description: 'Get flowbites news announcements'
  }
];

export const emailNotifications = [
  'A high threat has been detected',
  'A medium threat has been detected',
  'A low threat has been detected',
  'A high threat has been detected',
  'A medium threat has been detected',
  'A low threat has been detected'
];
export const subscribeNotifications = [
  {
    title: 'Weekly newsletter',
    description: 'Get the latest newsletter news announcements'
  },
  {
    title: 'Products',
    description: 'Get products news announcements'
  }
];
export const buttons = [
  { label: 'Account', href: '/user/account' },
  { label: 'Billing & Subscription', href: '/user/billing' },
  { label: 'Notifications', href: '/user/notifications' },
  { label: 'Organization', href: '/user/organization' }
];

export const sectionsScenario = [
  {
    title: 'Aspirational',
    level: 'Level 3',
    scenario:
      'Ransomware attacks will become nearly obsolete due to advancements in quantum encryption and AI-Driven threat detection systems making it extremely difficult for attackers to infiltrate systems undetected. Patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities.',
    strategy:
      'Invest in quantum encryption and AI-based cybersecurity tools to protect against ransomware attacks. The document highlights strong encryption and proactive risk management patching and poor cybersecurity hygiene within suppliers as essential components of ransomware defense.',
    confidenceLevel: 'Medium (60%)',
    implementationTime: '3 Months',
    cost: '$1.2m'
  },
  {
    title: 'Exploratory',
    level: 'Level 2',
    scenario:
      'Lack of regular patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities, increasing the frequency of data leaks and security breaches.',
    strategy:
      'The document emphasizes the importance of enforcing basic cyber hygiene, such as regular patching, security training, and monitoring of internal systems. Implement mandatory patch management schedules and train staff on security awareness to mitigate vulnerabilities.',
    confidenceLevel: 'High (80%)',
    implementationTime: '6 Months',
    cost: '$2.5m'
  },
  {
    title: 'Redemption',
    level: 'Level 1',
    scenario:
      'The lack of regular patching and poor cybersecurity hygiene within suppliers will result in easily exploitable vulnerabilities, increasing the frequency of data leaks and security breaches.',
    strategy:
      'The document emphasizes the importance of enforcing basic cyber hygiene, such as regular patching, security training, and monitoring of internal systems. Implement mandatory patch management schedules and train staff on security awareness to mitigate vulnerabilities.',
    confidenceLevel: 'High (70%)',
    implementationTime: '2 Months',
    cost: '$3m'
  }
];

export const lineChartData = [
  { month: '0 Days', desktop: 30, mobile: 25 },
  { month: '30 Days', desktop: -10, mobile: 35 },
  { month: '60 Days', desktop: 10, mobile: 25 },
  { month: '90 Days', desktop: 15, mobile: 30 }
];

export const colorChartConfig = {
  desktop: {
    label: 'Customer Trust',
    color: 'green'
  },
  mobile: {
    label: 'Financial Loss',
    color: 'red'
  }
} satisfies ChartConfig;

export const overviewCardData = [
  {
    title: 'Financial Impact',
    value: '$5m',
    icon: MoneyImage,
    alt: 'Money'
  },
  {
    title: 'Probability',
    value: '75%',
    icon: MoneyImage,
    alt: 'Graph'
  },
  {
    title: 'Impacted Suppliers',
    value: '23',
    icon: MoneyImage,
    alt: 'Suppliers'
  }
];
export const mitigationBestPractices = [
  { icon: ShieldAlert, label: 'Implement Backups' },
  { icon: Globe, label: 'Security Awareness Training' },
  { icon: FileText, label: 'Incident Response Plan' }
];
export const globalImpactCard = [
  { title: 'Global Impact', value: '60%' },
  { title: 'Global Suppliers Affected', value: '15,345' },
  { title: 'Internal Suppliers Affected', value: '54' }
];

export type Supplier = {
  supplier: string;
  region: string;
  exposureToRisk: 'Low' | 'Medium' | 'High';
  impactOperation: 'Low' | 'Medium' | 'High';
};

export const supplierTable: Supplier[] = [
  {
    supplier: 'LaunchPad Innovations',
    region: 'North America +2',
    exposureToRisk: 'High',
    impactOperation: 'High'
  },
  {
    supplier: 'Agile Ventures',
    region: 'North America',
    exposureToRisk: 'High',
    impactOperation: 'High'
  },
  {
    supplier: 'Pioneer Industries',
    region: 'Europe +3',
    exposureToRisk: 'High',
    impactOperation: 'Low'
  },
  {
    supplier: 'Leap Innovations',
    region: 'South East Asia',
    exposureToRisk: 'High',
    impactOperation: 'High'
  },
  {
    supplier: 'Breakthrought Solutions',
    region: 'Pacific Asia +2',
    exposureToRisk: 'High',
    impactOperation: 'Medium'
  },
  {
    supplier: 'Secure Wealth Management',
    region: 'Central Asia',
    exposureToRisk: 'Medium',
    impactOperation: 'Low'
  },
  {
    supplier: 'Haute Coutyre Co.',
    region: 'Africa +1',
    exposureToRisk: 'Medium',
    impactOperation: 'High'
  },
  {
    supplier: 'Haute Coutyre Co.',
    region: 'South America +1',
    exposureToRisk: 'Medium',
    impactOperation: 'Medium'
  },
  {
    supplier: 'Haute Coutyre Co.',
    region: 'South America +2',
    exposureToRisk: 'Low',
    impactOperation: 'Medium'
  },
  {
    supplier: 'Haute Coutyre Co.',
    region: 'Eastern Europe',
    exposureToRisk: 'Low',
    impactOperation: 'Low'
  }
];
export const doughnutChartConfig = {
  Risk: { color: 'hsl(20, 100%, 60%)' },
  Remaining: { color: 'hsl(180, 100%, 90%)' }
} satisfies ChartConfig;

export const suppliersData = [
  { label: 'Total Suppliers', value: 243 },
  { label: 'Countries', value: 18 }
];

export const supplierRiskLevels = [
  { label: 'High', value: 76, count: 49, indicatorColor: 'bg-red-400' },
  { label: 'Medium', value: 20, count: 13, indicatorColor: 'bg-yellow-400' },
  { label: 'Low', value: 4, count: 3, indicatorColor: 'bg-green-400' }
];

export type Invoice = {
  image: string;
  supplier: string;
  riskStatus: 'Low' | 'Medium' | 'High';
  topRisk: string;
  impactOperation: string;
  region: string;
};

export const supplierTableInvoices: Invoice[] = [
  {
    image: smallLogo,
    supplier: 'Blue Sky Inc.',
    riskStatus: 'Low',
    topRisk: 'Ransomware Attack',
    impactOperation: 'High',
    region: 'EU'
  },
  {
    image: smallLogo,
    supplier: 'Vandhana',
    riskStatus: 'Medium',
    topRisk: 'Political Instability',
    impactOperation: 'Low',
    region: 'AF'
  },
  {
    image: smallLogo,
    supplier: 'LGT Logistics',
    riskStatus: 'Medium',
    topRisk: 'Cyber Security',
    impactOperation: 'Medium',
    region: 'EU'
  },
  {
    image: smallLogo,
    supplier: 'Vishal Tradings',
    riskStatus: 'High',
    topRisk: 'Ransomware Attack',
    impactOperation: 'High',
    region: 'NA'
  },
  {
    image: smallLogo,
    supplier: 'AR Traders',
    riskStatus: 'Low',
    topRisk: 'Labor Strike',
    impactOperation: 'Low',
    region: 'EU'
  },
  {
    image: smallLogo,
    supplier: 'Gogo Tech',
    riskStatus: 'High',
    topRisk: 'Ransomware Attack',
    impactOperation: 'Medium',
    region: 'SA'
  },
  {
    image: smallLogo,
    supplier: 'National Lumber',
    riskStatus: 'Medium',
    topRisk: 'Legal Risk',
    impactOperation: 'High',
    region: 'EU'
  }
];

export const timeFrames = [
  { label: 'This week', value: 'this-week' },
  { label: 'Last week', value: 'last-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Last month', value: 'last-month' },
];
