import { useRouter, redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  redirect(`/risk-alerts/ransomware-attack`);
}
