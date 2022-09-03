/* eslint-disable react/prop-types */
import React from 'react';

import './FormCheckbox.scss';

function FormCheckbox({
  fieldLabel,
  fieldName,
  fieldID,
  value,
  checked,
  onChange,
  disabled,
}) {
  return (
    <label
      htmlFor={fieldName}
      className="form-checkbox__label"
    >
      <input
        type="checkbox"
        name={fieldName}
        id={fieldID}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox__input"
        disabled={disabled}
      />

      {fieldLabel}

    </label>
  );
}

export default FormCheckbox;
