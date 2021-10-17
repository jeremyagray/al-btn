/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import useRefetchData from './useRefetchData';

import './Radar.css';

const Radar = (props) => {
  let radarDataUrl = '';

  if (props.showRadar) {
    const [miny, maxx] = props.projection.invert([0, 0]);
    const [maxy, minx] = props.projection.invert([props.dms.boundedWidth, props.dms.boundedHeight]);

    radarDataUrl = `https://opengeo.ncep.noaa.gov/geoserver/kbmx/ows?service=wms&version=1.3.0&request=GetMap&format=image/png&&layers=kbmx_bref_raw&crs=EPSG:4326&transparent=true&width=${Math.floor(props.dms.boundedWidth)}&height=${Math.floor(props.dms.boundedHeight)}&bbox=${minx},${miny},${maxx},${maxy}`;
  }

  const [
    radarData,
  ] = useRefetchData(radarDataUrl, 120000, null, {'responseType': 'blob'});

  if (props.showRadar && radarData) {
    if (props.clipToState) {
      return (
        <image
          id="radar"
          href={URL.createObjectURL(radarData)}
          width={props.dms.boundedWidth}
          height={props.dms.boundedHeight}
          x={props.dms.marginLeft}
          y={props.dms.marginRight}
          style={{
            'opacity': props.opacity
          }}
          clipPath={`url(#${props.clipPath})`}
        />
      );
    }

    return (
      <image
        id="radar"
        href={URL.createObjectURL(radarData)}
        width={props.dms.boundedWidth}
        height={props.dms.boundedHeight}
        x={props.dms.marginLeft}
        y={props.dms.marginRight}
        style={{
          'opacity': props.opacity
        }}
      />
    );
  }

  return (
    <></>
  );
}

export default Radar;
