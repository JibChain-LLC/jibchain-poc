'use client';
import React, { useEffect, useState } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { chartData } from '#/utils/utils';
import { doughnutChartConfig } from '#/utils/utils';
import { Card, CardContent } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

const OrganizationRisk = () => {
  const [riskStatus, setRiskStatus] = useState(0);

  useEffect(() => {
    const totalRisk = chartData.reduce((acc, chart) => acc + chart.value, 0);
    setRiskStatus(totalRisk);
  }, []);

  return (
    <Card className='flex min-h-[165px] w-full items-center justify-between overflow-hidden rounded-b-none rounded-t-lg border-x border-y-0 border-gray-200 bg-white shadow-md'>
      <CardContent className='flex flex-col items-center p-4'>
        <div>
          <p className='text-gray-600'>Your overall risk status is</p>
          <p className='text-[32px] font-semibold text-orange-500'>Medium</p>
        </div>
      </CardContent>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={doughnutChartConfig}
          className='mx-auto flex aspect-square min-h-[130px] items-center justify-center'>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='status'
              innerRadius={45}
              outerRadius={55}
              strokeWidth={0}>
              <Label
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
                          y={viewBox.cy}
                          className='text-xl font-bold text-black'>
                          {riskStatus}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='text-base text-gray-500'>
                          Total
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
      </CardContent>
    </Card>
  );
};

export default OrganizationRisk;
