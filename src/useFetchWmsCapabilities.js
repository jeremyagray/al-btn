/*
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

// React.
import {
  useEffect,
  useRef,
  useState
} from 'react';

// Other stuff.
import axios from 'axios';

const parseCapabilities = (caps) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(caps, "application/xml");
  let products = [];

  // Capability -> Layer -> Layers.
  const cap = doc.getElementsByTagName('Capability');
  const layers = cap[0].getElementsByTagName('Layer');
  let radarLayers = [];
  for (const layer of layers) {
    if (layer.parentNode.nodeName === 'Layer') {
      radarLayers.push(layer);
    }
  }

  // Process each layer's data.
  for (const layer of radarLayers) {
    const stationData = {};

    // Get the layer name.
    for (const name of layer.getElementsByTagName('Name')) {
      if (name.parentNode.nodeName === 'Layer') {
        stationData['layer'] = name.textContent;
      }
    }

    // Get the layer description.
    for (const description of layer.getElementsByTagName('Abstract')) {
      if (description.parentNode.nodeName === 'Layer') {
        stationData['description'] = description.textContent;
      }
    }

    // Get the layer legend data.
    const style = layer.getElementsByTagName('Style')[0];
    const legendData = layer.getElementsByTagName('LegendURL')[0];
    const legendURL = legendData.getElementsByTagName('OnlineResource')[0];

    stationData['legendHeight'] = legendData.getAttribute('height');
    stationData['legendWidth'] = legendData.getAttribute('width');
    stationData['legendURL'] = legendURL.getAttribute('xlink:href');

    // Get the layer image times.
    stationData['times'] = layer.getElementsByTagName("Dimension").item(0).textContent.split(',');

    // Get the layer's geographic bounding box.

    products.push(stationData);
  }
  
  return products;
};

export const useFetchWmsCapabilities = (site) => {
  // Data state.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Construct URL.
  const url = `https://opengeo.ncep.noaa.gov/geoserver/${site}/ows?service=wms&version=1.3.0&request=GetCapabilities`;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let response = {};

        if (! site) {
          response.data = [];
        } else {
          response = await axios.get(url);
        }

        if (isMounted) {
          const caps = parseCapabilities(response.data);
          setData(caps);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoadingError(error);
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isLoading, loadingError };
}

export default useFetchWmsCapabilities;
