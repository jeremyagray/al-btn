/*
 * SPDX-License-Identifier: MIT
 *
 * Copyright 2021 Jeremy A Gray <gray@flyquackswim.com>.
 */

// React Bootstrap.
import Form from 'react-bootstrap/Form';

import './FormSelect.css';

export const FormSelect = (props) => {
  return (
    <div
      className={[...props.classNames].join(' ')}
      id={props.id}
    >
      <Form.Group
      >
        <Form.Label
          htmlFor={`FormSelect${props.id}`}
        >
          {props.label}
        </Form.Label>
        <Form.Control
          as="select"
          id={`FormSelect${props.id}`}
          onChange={props.onChange}
          value={props.value}
        >
          {props.default && <option value={props.default.value} key={props.default.key}>{props.default.label}</option>}
          {props.items.map((item) => {
            return (
              <option value={item.value} key={item.key}>{item.label}</option>
            );
          })}
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default FormSelect;
