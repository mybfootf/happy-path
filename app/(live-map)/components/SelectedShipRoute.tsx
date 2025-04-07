'use client';

import { Source, Layer, LayerProps } from 'react-map-gl';

type SelectedShipRouteProps = {
  selectedShipData: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[][];
    };
    properties: {
      mmsi: number;
      risk: string;
    };
  };
};

export const SelectedShipRoute = ({
  selectedShipData,
}: SelectedShipRouteProps) => {
  const layerStyle: LayerProps = {
    id: 'ship-route',
    type: 'line',
    paint: {
      'line-color': `${
        selectedShipData.properties.risk === 'high'
          ? '#FF0000'
          : selectedShipData.properties.risk === 'medium'
          ? '#FFA500'
          : '#008000'
      }`,
      'line-width': 3,
      'line-opacity': 1,
    },
  };

  if (!selectedShipData) {
    return null;
  }

  return (
    <Source
      id='route'
      type='geojson'
      data={selectedShipData}
    >
      <Layer {...layerStyle} />
    </Source>
  );
};
