'use client';
import React, { useEffect, useState } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { chartData } from '#/utils/utils';
import { doughnutChartConfig } from '#/utils/utils';
import TimeFrame from '../defaul-components/time-frame';
import { ChartContainer } from '../ui/chart';

const OrganizationRisk = () => {
  const [riskStatus, setRiskStatus] = useState(0);

  useEffect(() => {
    const totalRisk = chartData.reduce((acc, chart) => acc + chart.value, 0);
    setRiskStatus(totalRisk);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full'>
        <TimeFrame />
      </div>
      <div className='flex min-h-[165px] w-full items-center justify-between'>
        <div>
          <p className='text-xs font-medium leading-tight text-gray-600'>
            Overall Risk Status:
          </p>
          <p className='text-2xl font-semibold leading-tight text-orange-600'>
            Medium
          </p>
        </div>
        <ChartContainer
          config={doughnutChartConfig}
          className='flex aspect-square min-h-[108px] items-center justify-center'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='status'
              innerRadius={44}
              outerRadius={54}
              strokeWidth={0}>
              <Label
                position={'center'}
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 6}
                          className='fill-gray-900 text-2xl font-semibold leading-none'>
                          {riskStatus}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className='fill-gray-500 text-xs font-medium leading-tight'>
                          Total Risks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default OrganizationRisk;
