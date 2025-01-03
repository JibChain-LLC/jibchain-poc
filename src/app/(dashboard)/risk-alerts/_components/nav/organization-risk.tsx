'use client';

import { Label, Pie, PieChart } from 'recharts';
import { ChartContainer } from '#/components/ui/chart';
import { RiskLevelEnum } from '#/enums';
import { RouteOutputs } from '#/trpc/query-clients/client';

type RiskListOutput = RouteOutputs['dash']['risks']['list'];

export default function OrganizationRisk(props: {
  data: RiskListOutput['data'];
  selected: RiskLevelEnum;
}) {
  const { data, selected } = props;

  const { hi, med, low } = data.reduce(
    (acc, curr) => {
      acc[curr.riskLevel!] += 1;
      return acc;
    },
    { hi: 0, med: 0, low: 0 } as Record<RiskLevelEnum, number>
  );

  return (
    <div className='flex w-full items-center justify-between'>
      <div>
        <p className='text-xs font-medium leading-tight text-gray-600'>
          Overall Risk Status:
        </p>
        <p className='text-2xl font-semibold leading-tight text-orange-600'>
          Medium
        </p>
      </div>
      <ChartContainer
        config={{}}
        className='flex aspect-square min-h-[108px] items-center justify-center'>
        <PieChart>
          <Pie
            data={[
              {
                status: 'High',
                value: hi,
                fill: selected === 'hi' ? '#E02424' : '#F3F4F6'
              },
              {
                status: 'Medium',
                value: med,
                fill: selected === 'med' ? '#FF5A1F' : '#E5E7EB'
              },
              {
                status: 'Low',
                value: low,
                fill: selected === 'low' ? '#31C48D' : '#dbdde0'
              }
            ]}
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
                        {data.length}
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
  );
}
