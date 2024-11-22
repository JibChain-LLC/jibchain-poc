'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { useLayoutEffect } from 'react';
import { cn } from '#/lib/utils';
import {
  bubble_data,
  BubbleData,
  CountryDataContext,
  risk_data
} from '#/utils/utils';

const getFillColor = (dataContext: CountryDataContext | undefined) => {
  const country = risk_data.find((data) => data.id === dataContext?.id);
  if (country) {
    switch (country.risk) {
      case 'High':
        return am5.color(0xff0000); // Red for High Risk
      case 'Moderate':
        return am5.color(0xffa500); // Orange for Moderate Risk
      case 'Low':
        return am5.color(0x00ff00); // Green for Low Risk
      default:
        return am5.color(0xcccccc); // Default gray
    }
  }
  return am5.color(0xcccccc); // Default for countries without data
};

const createPointSeries = (chart: am5map.MapChart, root: am5.Root) => {
  const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
  pointSeries.data.setAll(
    bubble_data.map((data) => ({
      geometry: { type: 'Point', coordinates: [data.longitude, data.latitude] },
      color: data.color,
      radius: data.radius
    }))
  );

  pointSeries.bullets.push((root, series, dataItem) => {
    const context = dataItem.dataContext as BubbleData;
    const circle = am5.Circle.new(root, {
      radius: context.radius,
      tooltipText: 'Risk Level',
      fill: context.color
    });

    circle.animate({
      key: 'scale',
      from: 1,
      to: 1.5,
      duration: 1000,
      easing: am5.ease.bounce
    });

    return am5.Bullet.new(root, { sprite: circle });
  });
};

const CountryRiskProbability = ({ supplier }: { supplier: boolean }) => {
  useLayoutEffect(() => {
    const root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoMercator(),
        panX: 'none',
        panY: 'none',
        wheelY: 'zoom',
        maxZoomLevel: supplier ? 10 : 2
      })
    );

    if (root._logo) root._logo.dispose();

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ']
      })
    );

    polygonSeries.mapPolygons.template.set('fill', am5.color(0xcccccc));
    polygonSeries.mapPolygons.template.set('tooltipText', '{name}: {risk}');

    if (supplier) {
      polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) =>
        getFillColor(target.dataItem?.dataContext as CountryDataContext)
      );
    } else {
      createPointSeries(chart, root);
    }

    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');

    const handleZoomIn = () => chart.zoomIn();
    const handleZoomOut = () => chart.zoomOut();

    if (zoomInButton) zoomInButton.addEventListener('click', handleZoomIn);
    if (zoomOutButton) zoomOutButton.addEventListener('click', handleZoomOut);

    return () => {
      root.dispose();
      if (zoomInButton) zoomInButton.removeEventListener('click', handleZoomIn);
      if (zoomOutButton)
        zoomOutButton.removeEventListener('click', handleZoomOut);
    };
  }, [supplier]);

  return (
    <div className='relative mt-1'>
      <div
        id='chartdiv'
        className={cn(
          'w-full',
          supplier ? 'h-[160px] max-w-[700px]' : 'h-[600px] max-w-[1200px]'
        )}></div>
      <div className='absolute right-2 top-2'>
        <button
          id='zoomIn'
          className={cn(
            'mx-1 rounded-full border px-2',
            'border-gray-300 hover:bg-gray-200'
          )}>
          +
        </button>
        <button
          id='zoomOut'
          className={cn(
            'rounded-full border px-2',
            'border-gray-300 hover:bg-gray-200'
          )}>
          -
        </button>
      </div>
    </div>
  );
};

export default CountryRiskProbability;
