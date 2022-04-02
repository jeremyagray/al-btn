/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  useEffect,
  useRef,
  useState
} from 'react';

// Other stuff.
import axios from 'axios';

const getLayers = (caps) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(caps, "application/xml");
  let products = [];

  // print the name of the root element or error message
  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    console.log("error while parsing");
  } else {
    console.log(doc.documentElement.nodeName);
  }

  // Capability -> Layer -> Layers
  const cap = doc.getElementsByTagName('Capability');
  const layers = cap[0].getElementsByTagName('Layer');
  let radarLayers = [];
  for (const layer of layers) {
    if (layer.parentNode.nodeName === 'Layer') {
      radarLayers.push(layer);
    }
  }

  for (const layer of radarLayers) {
    for (const name of layer.getElementsByTagName('Name')) {
      if (name.parentNode.nodeName === 'Layer') {
        console.log(name.textContent);
        products.push(name.textContent);
      }
    }
  }
  
  return products;
};

export const useFetchWmsCapabilities = (site, callback, callbackArgs = {}) => {
  // Data state.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Get a reference for the callback.
  const ref = useRef();

  // Store the callback and update on change.
  // useEffect(() => {
  //   ref.current = callback;
  // }, [callback]);

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
          // setData(ref.current(response.data, callbackArgs));
          const caps = getLayers(response.data);
          setData(response.data);
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
