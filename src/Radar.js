/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import useFetchData from './useFetchData';

import './Radar.css';

const Radar = (props) => {
  let radarDataUrl = '';

  if (props.showRadar) {
    const [miny, maxx] = props.projection.invert([0, 0]);
    const [maxy, minx] = props.projection.invert([props.dms.boundedWidth, props.dms.boundedHeight]);

    radarDataUrl = `https://opengeo.ncep.noaa.gov/geoserver/kbmx/ows?service=wms&version=1.3.0&request=GetMap&format=image/png&&layers=kbmx_bref_raw&crs=EPSG:4326&transparent=true&width=${Math.floor(props.dms.width)}&height=${Math.floor(props.dms.height)}&bbox=${minx},${miny},${maxx},${maxy}`;
  }

  const [
    radarData,
    radarLoadingData,
    radarLoadingDataError
  ] = useFetchData(radarDataUrl, null, {'responseType': 'blob'});

  if (props.showRadar && radarData) {
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
  } else {
    return (
      <></>
    );
  }
}

export default Radar;
