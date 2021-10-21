/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import useRefetchData from './useRefetchData';
import useFetchWmsCapabilities from './useFetchWmsCapabilities';

import './Radar.css';

const parseCapabilitiesToProductTimes = (xmlString, args = {'product': 'kbmx_bref_raw'}) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');
  const layers = doc.getElementsByTagName("Layer");

  let times = [];

  for (let i = 0; i < layers.length; i++) {
    if (layers.item(i).getElementsByTagName("Name").item(0).textContent === `${args.product}`) {
      times = layers.item(i).getElementsByTagName("Dimension").item(0).textContent.split(',');
      break;
    }
  }

  return times;
}

const parseCapabilitiesToProducts = (xmlString, args = {}) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');
  const layers = doc.getElementsByTagName("Layer");

  let products = [];

  for (let i = 0; i < layers.length; i++) {
    products.push(
      layers
        .item(i)
        .getElementsByTagName("Name")
        .item(0)
        .textContent);
  }

  return products;
}

const Radar = (props) => {
  let radarDataUrl = '';

  if (props.showRadar) {
    const [miny, maxx] = props.projection.invert([0, 0]);
    const [maxy, minx] = props.projection.invert([props.dms.boundedWidth, props.dms.boundedHeight]);

    // radarDataUrl = `https://opengeo.ncep.noaa.gov/geoserver/kbmx/ows?service=wms&version=1.3.0&request=GetMap&format=image/png&&layers=kbmx_bref_raw&crs=EPSG:4326&transparent=true&width=${Math.floor(props.dms.boundedWidth)}&height=${Math.floor(props.dms.boundedHeight)}&bbox=${minx},${miny},${maxx},${maxy}`;
    radarDataUrl = `https://opengeo.ncep.noaa.gov/geoserver/${props.radarStation.toLowerCase()}/ows?service=wms&version=1.3.0&request=GetMap&format=image/png&&layers=${props.radarStation.toLowerCase()}_bref_raw&crs=EPSG:4326&transparent=true&width=${Math.floor(props.dms.boundedWidth)}&height=${Math.floor(props.dms.boundedHeight)}&bbox=${minx},${miny},${maxx},${maxy}`;
  }

  const [
    radarData,
    radarLoading,
    radarError
  ] = useRefetchData(radarDataUrl, 240000, null, {'responseType': 'blob'});

  const {
    'data': siteProducts,
    'loadingError': productsLoadingError
  } = useFetchWmsCapabilities('kbmx', parseCapabilitiesToProducts, {});

  const {
    'data': siteTimes,
    'loadingError': timesLoadingError
  } = useFetchWmsCapabilities('kbmx', parseCapabilitiesToProductTimes, {'product': 'kbmx_bref_raw'});

  if (props.showRadar && props.radarStation && ! radarLoading && ! radarError) {
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
