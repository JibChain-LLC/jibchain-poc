'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
/* @ts-expect-error no available typings */
import { geoCylindricalStereographic } from 'd3-geo-projection';
import { useLayoutEffect } from 'react';

interface MiniMapProps {
  distinctCountries: { countryCode: string | null; count: number }[];
}

export default function MiniMap(props: MiniMapProps) {
  const { distinctCountries } = props;

  useLayoutEffect(() => {
    const distinctMap = new Map<string, number>();
    distinctCountries.forEach(({ countryCode, count }) => {
      distinctMap.set(countryCode!, count);
    });

    const root = am5.Root.new('chartdiv');
    root.setThemes([
      am5themes_Responsive.new(root),
      am5themes_Animated.new(root)
    ]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: geoCylindricalStereographic().parallel(0),
        panX: 'none',
        panY: 'none',
        wheelY: 'none'
      })
    );

    if (root._logo) root._logo.dispose();

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color(0xd1d5db),
        stroke: am5.color(0xffffff),
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ']
      })
    );

    polygonSeries.mapPolygons.template.adapters.add('fill', (_, target) => {
      const cc = (target.dataItem?.dataContext as { id: string }).id;
      const count = distinctMap.get(cc);
      if (count === undefined) return am5.color(0xd1d5db);
      if (count > 30) return am5.color(0x046c4e);
      else if (count > 10) return am5.color(0x0e9f6e);
      else return am5.color(0x84e1bc);
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className='relative mt-1'>
      <div id='chartdiv' className='h-[160px] w-full max-w-[700px]'></div>
    </div>
  );
}
