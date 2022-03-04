/**
 *
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021-2022 Jeremy A Gray <gray@flyquackswim.com>.
 *
 */

// React.
import {
  useEffect,
  useState
} from 'react';

// Other stuff.
import axios from 'axios';

export const useFetchDataWithToken = (url, token, dataDefault = null, config = {}) => {
  // Data state.
  const [data, setData] = useState(dataDefault);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingDataError, setLoadingDataError] = useState(null);

  // Add the token authorization header.
  // {'headers': {'Authorization': `Bearer ${auth?.user?.id_token}`}}
  if (! config?.headers) {
    config['headers'] = {
      'Authorization': `Bearer ${token}`
    };
  } else {
    config['headers']['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    let isMounted = true;
    setLoadingData(true);

    const fetchData = async () => {
      try {
        let response = {};

        if (! url) {
          response.data = dataDefault;
        } else {
          console.log(config);
          response = await axios.get(url, config);
        }

        if (isMounted) {
          setData(response.data);
          setLoadingData(false);
        }
      } catch (error) {
        /* istanbul ignore else */
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
  }, [url, token]);

  return [ data, loadingData, loadingDataError ];
}

export default useFetchDataWithToken;
