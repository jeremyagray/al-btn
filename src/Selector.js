import {
  useState
} from 'react';

import './Selector.css';
import AlabamaMap from './Alabama.js';

function Selector() {
  const [graph, setGraph] = useState('counties');

  if (graph === 'counties') {
    return (
      <div className="root">
        <SelectorDropDown
          graph={graph}
          setGraph={setGraph}
        />
        <AlabamaMap />
      </div>
    );
  }
}

function SelectorDropDown(props) {
  function changer(e) {
    props.setGraph(e.target.value);
  }
  
  return (
    <div id='SelectorDropDown'>
      <label htmlFor="graph-select">Select a Graph:</label>
      <br />
      <select
        name="graphs"
        id="graph-select"
        value={props.graph}
        onChange={changer}
      >
        <option value="counties">County Map</option>
      </select>
    </div>
  );
}

export default Selector;
