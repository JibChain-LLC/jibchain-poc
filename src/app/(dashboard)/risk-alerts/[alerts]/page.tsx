import Alerts from './alerts';

export async function generateStaticParams() {
  return [
    { alerts: 'internal-security' },
    { alerts: 'ransomware-attack' },
    { alerts: 'natural-disaster' },
    { alerts: 'terrorism' },
    { alerts: 'cyber-security' },
    { alerts: 'technological-failure' },
    { alerts: 'internal-security' },
    { alerts: 'labor-strike' },
    { alerts: 'public-health-crisis' },
    { alerts: 'economic-downturn' },
    { alerts: 'environmental' },
    { alerts: 'supply-chain' },
    { alerts: 'regulatory-changes' },
    { alerts: 'political' },
    { alerts: 'counterfeit-parts' },
    { alerts: 'legal-risks' },
    { alerts: 'sdlc-processes' },
    { alerts: 'cloud-service' }
  ];
}

export default function Page() {
  return <Alerts />;
}
