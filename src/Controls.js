/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

import {
  useEffect,
  useState
} from 'react';

// Polyfillable resize observer.
import {ResizeObserver} from '@juggle/resize-observer';

import './Controls.css';

import Config from './Config';
import FormSelect from './FormSelect';

export const Controls = (props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = props.map.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return
      if (!entries.length) return

      const entry = entries[0]

      if (width !== entry.contentRect.width) setWidth(entry.contentRect.width)
      if (height !== entry.contentRect.height) setHeight(entry.contentRect.height)
      console.log(entry.contentRect.width);
      console.log(entry.contentRect.height);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.map]);

  // <FormSelect
  //   id="VisualizationSelect"
  //   classNames={['text-center']}
  //   label="Select Visualization"
  //   value={props.visualization}
  //   items={props.visualizations}
  //   onChange={props.updateVisualization}
  // />

  return (
    <div className="AppControls col-md-4 m-0 p-0">
      <Config
        visualization={props.visualization}
        projection={props.projection}
        updateProjection={props.updateProjection}
        currentState={props.currentState}
        updateCurrentState={props.updateCurrentState}
        clipToState={props.clipToState}
        toggleClipToState={props.toggleClipToState}
        showSurroundingStates={props.showSurroundingStates}
        toggleShowSurroundingStates={props.toggleShowSurroundingStates}
        showCounties={props.showCounties}
        toggleShowCounties={props.toggleShowCounties}
        showWeatherAlerts={props.showWeatherAlerts}
        toggleShowWeatherAlerts={props.toggleShowWeatherAlerts}
        showStates={props.showStates}
        toggleShowStates={props.toggleShowStates}
        showRadar={props.showRadar}
        toggleShowRadar={props.toggleShowRadar}
        radarStation={props.radarStation}
        updateRadarStation={props.updateRadarStation}
        showRadarStations={props.showRadarStations}
        toggleShowRadarStations={props.toggleShowRadarStations}
        radarOpacity={props.radarOpacity}
        updateRadarOpacity={props.updateRadarOpacity}
        alertOpacity={props.alertOpacity}
        updateAlertOpacity={props.updateAlertOpacity}
      />
    </div>
  );
}

export default Controls;
