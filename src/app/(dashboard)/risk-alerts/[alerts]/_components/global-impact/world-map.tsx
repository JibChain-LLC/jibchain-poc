'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
/* @ts-expect-error no available typings */
import { geoCylindricalStereographic } from 'd3-geo-projection';
import { Building } from 'lucide-react';
import { useLayoutEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { cn } from '#/lib/utils';
import { BubbleData } from '#/utils/utils';

interface Address {
  administrativeArea: string;
  country: string;
  latLong: [number, number];
  locality: string;
  postalCode: string;
  premise: string;
  thoroughfare: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface Supplier {
  id: string;
  name: string;
  address: Address;
  regions: string[];
  contact: Contact;
  exposure: string;
  impact: string;
}

interface WorldMapProps {
  data: {
    impactedSuppliers: Supplier[];
  };
}

const BulletTooltip = ({ supplier }: { supplier: Supplier }) => {
  return (
    <div className='flex flex-col gap-4 p-1.5'>
      <div className='flex flex-col gap-1'>
        <Avatar className='size-10'>
          <AvatarImage src='' />
          <AvatarFallback>
            <Building size={16} />
          </AvatarFallback>
        </Avatar>
        <p className='text-sm font-semibold text-white'>{supplier.name}</p>
        <p className='text-sm font-thin text-gray-400'>
          {supplier.address.country} +{supplier.regions.length - 1}
        </p>
      </div>

      <div className='flex flex-col gap-1'>
        <p className='text-sm font-normal leading-none text-gray-200'>
          {supplier.address.administrativeArea}, {supplier.address.locality}
        </p>
        <div className='flex gap-2.5 text-sm font-semibold text-white'>
          <div className='flex'>
            <p>Exposure: </p>
            <p className='capitalize'>{supplier.exposure}</p>
          </div>
          <div className='flex'>
            <p>Impact: </p>
            <p className='capitalize'>{supplier.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorldMap = ({ data }: WorldMapProps) => {
  useLayoutEffect(() => {
    if (!data?.impactedSuppliers) return;
    
    const root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Responsive.new(root), am5themes_Animated.new(root)]);
  
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: geoCylindricalStereographic().parallel(0),
        panX: 'none',
        panY: 'none',
        wheelY: 'none'
      })
    );
  
    if (root._logo) root._logo.dispose();
  
    chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color(0xf3f4f6),
        stroke: am5.color(0x9ca3af),
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ']
      })
    );
  
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.data.setAll(
      data.impactedSuppliers.map((supplier) => ({
        geometry: {
          type: 'Point',
          coordinates: [
            supplier.address.latLong[1], 
            supplier.address.latLong[0]  
          ]
        },
        color: getColorFromImpact(supplier.impact),
        supplier: supplier // Pass the entire supplier object
      }))
    );
  
    pointSeries.bullets.push((root, series, dataItem) => {
      const context = dataItem.dataContext as BubbleData & { supplier: Supplier };
  
      const tooltip = am5.Tooltip.new(root, {
        pointerOrientation: 'horizontal',
        getFillFromSprite: false,
        autoTextColor: false,
        animationDuration: 0,
        stateAnimationDuration: 0,
        showTooltipOn: 'hover',
        keepTargetHover: true,
        background: am5.PointedRectangle.new(root, { cornerRadius: 6 })
      });
  
      tooltip.get('background')?.setAll({
        fill: am5.color(0x111928),
        fillOpacity: 1
      });
  
      const mainCircle = am5.Circle.new(root, {
        radius: 8,
        fill: context.color,
        stroke: am5.Color.lighten(context.color, 0.6),
        strokeWidth: 2,
        tooltip: tooltip
      });
  
      mainCircle.set(
        'tooltipHTML',
        ReactDOMServer.renderToString(<BulletTooltip supplier={context.supplier} />)
      );
      mainCircle.animate({
        key: 'strokeWidth',
        from: 2,
        to: 8,
        duration: 3500,
        loops: Infinity,
        easing: am5.ease.yoyo(am5.ease.linear)
      });
  
      return am5.Bullet.new(root, { sprite: mainCircle });
    });
  
    return () => root.dispose();
  }, [data]);

  return (
    <div className='relative mt-1'>
      <div id='chartdiv' className={cn('min-h-screen w-full')}></div>
    </div>
  );
};

const getColorFromImpact = (impact: string) => {
  switch (impact) {
    case 'high':
      return am5.color(0xff0000);
    case 'medium':
      return am5.color(0xffa500);
    default:
      return am5.color(0x00ff00);
  }
};

export default WorldMap;
