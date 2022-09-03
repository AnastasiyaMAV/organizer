/* eslint-disable react/prop-types */
import React from 'react';

import '../FormSelect.scss';

function FormSelectOption({
  optionValue,
  optionText,
  selected,
  disabled,
}) {
  return (
    <option
      value={optionValue}
      className="form-field__option"
      selected={selected}
      disabled={disabled}
    >
      {optionText}
    </option>

  );
}

export default FormSelectOption;
