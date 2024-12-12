'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
/* @ts-expect-error no available typings */
import { geoCylindricalStereographic } from 'd3-geo-projection';
import { useLayoutEffect } from 'react';
import { CountryDataContext, risk_data } from '#/utils/utils';

const getFillColor = (
  dataContext: CountryDataContext | undefined,
  fallback: am5.Color
) => {
  const country = risk_data.find((data) => data.id === dataContext?.id);
  if (country) {
    switch (country.risk) {
      case 'High':
        return am5.color(0x046c4e); // Red for High Risk
      case 'Moderate':
        return am5.color(0x0e9f6e); // Orange for Moderate Risk
      case 'Low':
        return am5.color(0x84e1bc); // Green for Low Risk
      default:
        return fallback; // Default gray
    }
  }
  return fallback; // Default for countries without data
};

export default function MiniMap() {
  useLayoutEffect(() => {
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

    // className = 'text-gray-500';

    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) =>
      getFillColor(
        target.dataItem?.dataContext as CountryDataContext,
        fill ?? am5.color(0xd1d5db)
      )
    );

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
