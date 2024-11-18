'use client';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import { useLayoutEffect } from 'react';

interface CountryDataContext {
  id: string;
  risk?: string;
}

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
    if (root._logo) {
      root._logo.dispose();
    }
    // Create polygon series for the world map
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ['AQ'] // Exclude Antarctica
      })
    );
    polygonSeries.mapPolygons.template.set('fill', am5.color(0xcccccc));

    // Set tooltips to show risk information
    polygonSeries.mapPolygons.template.set('tooltipText', '{name}: {risk}');

    polygonSeries.mapPolygons.template.events.on('pointerover', function (ev) {
      const target = ev.target;
      if (target.dataItem?.dataContext && supplier) {
        const riskData = [
          { id: 'US', risk: 'High' }, // United States
          { id: 'BR', risk: 'High' }, // Brazil
          { id: 'IN', risk: 'Moderate' }, // India
          { id: 'DE', risk: 'Low' }, // Germany
          { id: 'RU', risk: 'High' } // Russia
        ];
        const dataContext = target.dataItem.dataContext as CountryDataContext;
        let originalColor = am5.color(0xcccccc); // Default color for countries without data
        const country = riskData.find((data) => data.id === dataContext.id);
        if (country) {
          switch (country.risk) {
            case 'High':
              originalColor = am5.color(0xff0000); // Red for High Risk
              break;
            case 'Moderate':
              originalColor = am5.color(0xffa500); // Orange for Moderate Risk
              break;
            case 'Low':
              originalColor = am5.color(0x00ff00); // Green for Low Risk
              break;
            default:
              originalColor = am5.color(0xcccccc); // Default gray
          }
          target.set('fill', originalColor);
        }
      }
    });

    if (!supplier) {
      const pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      const bubbleData = [
        {
          latitude: 40.7128,
          longitude: -74.006,
          color: am5.color(0xff0000),
          radius: 10
        }, // Example: New York
        {
          latitude: -23.5505,
          longitude: -46.6333,
          color: am5.color(0xffa500),
          radius: 8
        }, // Example: São Paulo
        {
          latitude: 48.8566,
          longitude: 2.3522,
          color: am5.color(0x00ff00),
          radius: 8
        },
        {
          latitude: 35.6895,
          longitude: 139.6917,
          color: am5.color(0xff0000),
          radius: 10
        }
      ];

      pointSeries.bullets.push(() => {
        const circle = am5.Circle.new(root, {
          radius: 7,
          tooltipText: 'Risk Level',
          fill: am5.color(0xff0000)
        });

        // Animation for the bubble
        circle.animate({
          key: 'scale',
          from: 1,
          to: 1.5,
          duration: 1000,
          // loops: true,
          easing: am5.ease.bounce
        });

        return am5.Bullet.new(root, {
          sprite: circle
        });
      });

      // Apply bubble data
      pointSeries.data.setAll(
        bubbleData.map((data) => ({
          geometry: {
            type: 'Point',
            coordinates: [data.longitude, data.latitude]
          },
          fill: data.color,
          radius: data.radius
        }))
      );
    }

    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');

    if (zoomInButton) {
      zoomInButton.addEventListener('click', () => {
        chart.zoomIn();
      });
    }

    if (zoomOutButton) {
      zoomOutButton.addEventListener('click', () => {
        chart.zoomOut();
      });
    }

    return () => {
      root.dispose(); // Clean up when the component unmounts

      // Remove event listeners to prevent memory leaks
      if (zoomInButton) {
        zoomInButton.removeEventListener('click', () => chart.zoomIn());
      }
      if (zoomOutButton) {
        zoomOutButton.removeEventListener('click', () => chart.zoomOut());
      }
    };
  }, [supplier]);

  return (
    <div style={{ position: 'relative', marginTop: '5px' }}>
      <div
        id='chartdiv'
        style={{
          width: '100%',
          height: supplier ? '180px' : '600px',
          maxWidth: supplier ? '700px' : '1200px'
        }}></div>

      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <button id='zoomIn' style={{ margin: '0 5px', borderRadius: '5px' }}>
          +
        </button>
        <button id='zoomOut' style={{ margin: '0 5px' }}>
          -
        </button>
      </div>
    </div>
  );
};
export default CountryRiskProbability;
