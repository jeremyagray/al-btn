/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  useEffect,
  useRef,
  useState
} from 'react';

// Other stuff.
import axios from 'axios';

export const useFetchWmsCapabilities = (site, callback, callbackArgs = {}) => {
  // Data state.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  // Get a reference for the callback.
  const ref = useRef();

  // Store the callback and update on change.
  useEffect(() => {
    ref.current = callback;
  }, [callback]);

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
          setData(ref.current(response.data, callbackArgs));
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
