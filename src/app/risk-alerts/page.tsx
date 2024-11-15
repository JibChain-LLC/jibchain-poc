import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const Dashboard = () => {
  redirect('/risk-alerts/ransomware-attack');
};

export default Dashboard;
