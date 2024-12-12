import * as am5 from '@amcharts/amcharts5';
import { UsersGroup } from 'flowbite-react-icons/solid';
import { Bell, Grid, Truck } from 'flowbite-react-icons/solid';
import { DollarSignIcon, Frown, Cloud } from 'lucide-react';
import { Building } from 'lucide-react';
import { ChartConfig } from '#/components/ui/chart';

type ButtonVariant = {
  text: string;
  variant?:
    | 'default'
    | 'link'
    | 'outline'
    | 'secondary'
    | 'destructive'
    | 'ghost';
  className?: string;
};

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
    icon: '/dollar.jpg',
    alt: 'Money'
  },
  {
    title: 'Probability',
    value: '75%',
    icon: '/zoom.jpg',
    alt: 'Graph'
  },
  {
    title: 'Impacted Suppliers',
    value: '23',
    icon: '/arrow-right.svg',
    alt: 'Suppliers'
  }
];
export const mitigationBestPractices = [
  { icon: Cloud, label: 'Service Availability' },
  { icon: DollarSignIcon, label: 'Financial Loss' },
  { icon: Frown, label: 'Public Trust' }
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

export type Suppliers = {
  supplier: string;
  riskStatus: 'Low' | 'Medium' | 'High';
  topRisk: string;
  impactOperation: string;
  region: string;
};

export const supplierTableInvoices: Suppliers[] = [
  {
    supplier: 'Blue Sky Inc.',
    riskStatus: 'Low',
    topRisk: 'Ransomware Attack',
    impactOperation: 'High',
    region: 'EU'
  },
  {
    supplier: 'Vandhana',
    riskStatus: 'Medium',
    topRisk: 'Political Instability',
    impactOperation: 'Low',
    region: 'AF'
  },
  {
    supplier: 'LGT Logistics',
    riskStatus: 'Medium',
    topRisk: 'Cyber Security',
    impactOperation: 'Medium',
    region: 'EU'
  },
  {
    supplier: 'Vishal Tradings',
    riskStatus: 'High',
    topRisk: 'Ransomware Attack',
    impactOperation: 'High',
    region: 'NA'
  },
  {
    supplier: 'AR Traders',
    riskStatus: 'Low',
    topRisk: 'Labor Strike',
    impactOperation: 'Low',
    region: 'EU'
  },
  {
    supplier: 'Gogo Tech',
    riskStatus: 'High',
    topRisk: 'Ransomware Attack',
    impactOperation: 'Medium',
    region: 'SA'
  },
  {
    supplier: 'National Lumber',
    riskStatus: 'Medium',
    topRisk: 'Legal Risk',
    impactOperation: 'High',
    region: 'EU'
  }
];

export const riskExposures = [
  'Ransomware Attack',
  'Labor Strike',
  'Political Instability'
];

export const regions = ['South America', 'North America'];

export const topRisk = [
  { percentage: -1.45, label: 'Ransomware Attack' },
  { percentage: 1.35, label: 'Internal Security Failures' },
  { percentage: 1.45, label: 'Natural Disaster' }
];

export const atRiskSuppliers = [
  { logo: Building, name: 'Vandhana Enterprises', impact: 'High' },
  { logo: Building, name: 'National Lumber', impact: 'High' },
  { logo: Building, name: 'Next Generation Financial', impact: 'Medium' }
];

export const dashboardCardData = [
  {
    image: '/office-image.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat Lorem ipsum dolor sit, amet consectetur ',
    buttonText: 'Read More'
  },
  {
    image: '/calendar-image.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat Lorem ipsum dolor sit, amet consectetur',
    buttonText: 'Read More'
  },
  {
    image: '/learning-image.jpg',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, quis repellat Lorem ipsum dolor sit, amet consectetur',
    buttonText: 'Read More'
  }
];

export interface CountryDataContext {
  id: string;
  risk?: string;
}

export interface BubbleData {
  latitude: number;
  longitude: number;
  color: am5.Color;
}

export const risk_data: CountryDataContext[] = [
  { id: 'US', risk: 'High' },
  { id: 'BR', risk: 'High' },
  { id: 'IN', risk: 'Moderate' },
  { id: 'DE', risk: 'Low' },
  { id: 'RU', risk: 'High' },
  { id: 'FR', risk: 'Low' },
  { id: 'CA', risk: 'Moderate' },
  { id: 'CN', risk: 'Low' },
  { id: 'KZ', risk: 'Low' },
  { id: 'GL', risk: 'Low' }
];

export const bubble_data: BubbleData[] = [
  {
    latitude: 40.7128,
    longitude: -74.006,
    color: am5.color(0xf05252)
  },
  {
    latitude: -23.5505,
    longitude: -46.6333,
    color: am5.color(0xc27803)
  },
  {
    latitude: 48.8566,
    longitude: 2.3522,
    color: am5.color(0x0e9f6e)
  },
  {
    latitude: 35.6895,
    longitude: 139.6917,
    color: am5.color(0xf05252)
  }
];
export const planDetails = {
  name: 'Pro Plan',
  type: 'Essentials',
  price: '$1,300/month',
  renewalDate: 'Dec 01 2024',
  suppliers: {
    current: 243,
    total: 500
  }
};
export const billingBenefits = [
  { text: 'Number of suppliers: 500' },
  { text: 'Team size: 10' },
  { text: 'Mitigation strategies' },
  { text: 'Comprehensive reporting' },
  { text: 'Unlimited tracking' },
  { text: 'Scenario planning' },
  { text: 'Phone support' }
];
export const billingActions: ButtonVariant[] = [
  {
    text: 'Cancel Subscription',
    variant: 'outline',
    className: ''
  },
  {
    text: 'Upgrade to Platinum',
    variant: 'default'
  }
];
export type BillingHistoryTypes = {
  id: string;
  amount: number;
  status: 'Pending' | 'Paid';
  InvoiceId: string;
  date: string;
};

export const billingHistroyData: BillingHistoryTypes[] = [
  {
    id: '1',
    amount: 150,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846210'
  },
  {
    id: '2',
    amount: 200,
    status: 'Paid',
    date: '01 May 2024',
    InvoiceId: '#1846215'
  },
  {
    id: '3',
    amount: 350,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846217'
  },
  {
    id: '4',
    amount: 120,
    status: 'Paid',
    date: '01 May 2024',
    InvoiceId: '#1846212'
  },
  {
    id: '5',
    amount: 250,
    status: 'Pending',
    date: '01 May 2024',
    InvoiceId: '#1846219'
  }
];

export const paymentSwitches = [
  {
    id: 'recurring',
    label: 'Recurring payment',
    description: 'Automatically charge your account at regular intervals.'
  },
  {
    id: 'quick-purchase',
    label: 'Quick purchase',
    description: 'You will be asked to verify your account for all purchases.'
  }
];

export const paymentMethods = [
  {
    id: 'visa',
    label: 'Visa ending in 7658',
    description: 'Expiry 10/2024'
  },
  {
    id: 'mastercard',
    label: 'Mastercard ending in 8429',
    description: 'Expiry 04/2026'
  },
  {
    id: 'paypal',
    label: 'PayPal account',
    description: ''
  }
];
