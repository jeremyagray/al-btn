/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React.
import {
  useEffect,
  useState
} from 'react';

// Other stuff.
import axios from 'axios';

export const useFetchData = (url, dataDefault = null, config = {}) => {
  // Data state.
  const [data, setData] = useState(dataDefault);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDataError, setLoadingDataError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingData(true);

    const fetchData = async () => {
      try {
        let response = {};

        if (! url) {
          response.data = dataDefault;
        } else {
          response = await axios.get(url, config);
        }

        if (isMounted) {
          setData(response.data);
          setLoadingData(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoadingDataError(error);
          setLoadingData(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [ data, loadingData, loadingDataError ];
}

export default useFetchData;
