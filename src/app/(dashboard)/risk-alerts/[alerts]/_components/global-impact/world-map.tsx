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
import { RegionEnum, RiskLevelEnum } from '#/enums';
import { cn } from '#/lib/utils';
import { RouteOutputs } from '#/trpc/query-clients/client';

type ImpactedSuppliers =
  RouteOutputs['dash']['risks']['read']['impactedSuppliers'];

interface WorldMapProps {
  impactedSuppliers: ImpactedSuppliers;
}

interface BulletTooltipProps {
  name: string;
  exposure: ImpactedSuppliers[number]['exposure'];
  category: ImpactedSuppliers[number]['supplier']['category'];
  regions: ImpactedSuppliers[number]['supplier']['regions'];
}

const BULLET_MAP: Record<RiskLevelEnum, { color: am5.Color; text: string }> = {
  low: { color: am5.color(0x0e9f6e), text: 'Low' },
  med: { color: am5.color(0xc27803), text: 'Medium' },
  hi: { color: am5.color(0xf05252), text: 'High' }
};

function BulletTooltip(props: BulletTooltipProps) {
  const { name, exposure, category, regions } = props;

  return (
    <div className='flex flex-col gap-4 p-1.5'>
      <div className='flex flex-col gap-1'>
        <Avatar className='size-10'>
          <AvatarImage src='' />
          <AvatarFallback>
            <Building size={16} />
          </AvatarFallback>
        </Avatar>
        <p className='text-sm font-semibold text-white'>{name}</p>
        {regions !== null && regions.length > 0 && (
          <p className='text-sm font-thin text-gray-400'>
            {RegionEnum[regions[0]]}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-1'>
        <p className='text-sm font-normal leading-none text-gray-200'>
          {category}
        </p>
        <div className='flex gap-2.5 text-sm font-semibold text-white'>
          <div className='flex gap-1'>
            <p>Exposure:</p>
            <p>{BULLET_MAP[exposure].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const WorldMap = (props: WorldMapProps) => {
  const { impactedSuppliers } = props;

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

    chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        fill: am5.color(0xf3f4f6),
        stroke: am5.color(0x9ca3af),
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ']
      })
    );

    // createPointSeries(chart, root);
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    const pointList = impactedSuppliers.map((data) => ({
      exposure: data.exposure,
      ...data.supplier,
      geometry: {
        type: 'Point',
        coordinates: [data.supplier.y, data.supplier.x]
      },
      color: BULLET_MAP[data.exposure].color
    }));

    // Set the data for the point series
    pointSeries.data.setAll(pointList);
    pointSeries.bullets.push((root, series, dataItem) => {
      const context = dataItem.dataContext as (typeof pointList)[number];

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
        ReactDOMServer.renderToString(
          <BulletTooltip
            name={context.name!}
            regions={context.regions}
            exposure={context.exposure}
            category={context.category!}
          />
        )
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

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className='relative mt-1'>
      <div id='chartdiv' className={cn('h-auto min-h-[450px] w-full')}></div>
    </div>
  );
};

export default WorldMap;
