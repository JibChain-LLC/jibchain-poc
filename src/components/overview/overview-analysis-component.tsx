import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '#/components/ui/chart';
import { lineChartData, colorChartConfig } from '#/utils/utils';

const OverviewAnalysisComponent = () => {
  return (
    <Card className='mb-4 rounded-b-md rounded-t-none border-none bg-white shadow-none'>
      <CardHeader className='border-none bg-transparent shadow-none'>
        <CardTitle className='text-sm font-semibold text-gray-600'>
          Risk Scenario Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className='p-8'>
        <ChartContainer
          config={colorChartConfig}
          className='max-h-[700px] w-full rounded-md pb-4 pr-2 pt-8 shadow-lg'>
          <AreaChart data={lineChartData} margin={{ left: 20, right: 10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id='fillDesktop' x1='0' y1='1' x2='0' y2='0'>
                <stop
                  offset='5%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={0.4}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-desktop)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillMobile' x1='0' y1='1' x2='0' y2='0'>
                <stop
                  offset='5%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.4}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-mobile)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey='mobile'
              type='monotone'
              fill='url(#fillMobile)'
              fillOpacity={0.4}
              stroke='red'
              dot={{
                fill: 'white',
                r: 5
              }}
              activeDot={{
                r: 6,
                fill: 'white',
                stroke: 'red',
                strokeWidth: 1
              }}
              stackId='a'
            />
            <Area
              dataKey='desktop'
              type='monotone'
              fill='url(#fillDesktop)'
              fillOpacity={0.4}
              stroke='green'
              dot={{
                fill: 'white',
                r: 5
              }}
              activeDot={{
                r: 6,
                fill: 'white',
                stroke: 'green',
                strokeWidth: 1
              }}
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className='flex w-full flex-col items-center justify-center gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
          Event Duration
        </div>
        <div className='flex items-center gap-4 leading-none text-muted-foreground'>
          <span className='size-2 rounded-full bg-green-700'></span>
          <span className='text-green-700'>Customer Trust</span>
          <span className='size-2 rounded-full bg-red-700'></span>
          <span className='text-red-700'>Financial Loss</span>
        </div>
      </div>
    </Card>
  );
};

export default OverviewAnalysisComponent;
