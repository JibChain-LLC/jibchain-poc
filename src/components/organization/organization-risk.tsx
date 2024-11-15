'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../ui/chart';
import { Label, Pie, PieChart } from 'recharts';
import { chartData } from '#/utils/utils';
import { doughnutChartConfig } from '#/utils/utils';

const OrganizationRisk = () => {
  const [riskStatus, setRiskStatus] = useState(0);

  useEffect(() => {
    const totalRisk = chartData.reduce((acc, chart) => acc + chart.value, 0);
    setRiskStatus(totalRisk);
  }, [chartData]);

  return (
    <Card className='w-full min-h-[165px] flex items-center justify-between bg-white border-x-[1px] border-y-0 shadow-md rounded-t-lg rounded-b-none border-gray-200 overflow-hidden'>
      <CardContent className='p-4 flex flex-col items-center'>
        <div>
          <p className='text-gray-600'>Your overall risk status is</p>
          <p className='text-orange-500 text-[32px] font-semibold'>Medium</p>
        </div>
      </CardContent>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={doughnutChartConfig}
          className='mx-auto aspect-square min-h-[130px] flex justify-center items-center'>
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
                          className='text-black text-xl font-bold'>
                          {riskStatus}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='text-gray-500 text-base'>
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
