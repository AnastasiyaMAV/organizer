/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React from 'react';

import './FormSelect.scss';

function FormSelect({
  children,
  fieldLabel,
  fieldName,
  fieldID,
  error,
  touched,
  onBlur,
  selectValue,
  onChange,
  disabled,
}) {
  return (
    <label
      htmlFor={fieldID}
      className="form-select__label"
    >
      {fieldLabel}
      <div
        className="form-select__wrap"
      >
        <select
          name={fieldName}
          id={fieldID}
          value={selectValue}
          onBlur={onBlur}
          onChange={onChange}
          className={disabled ? 'form-select__select_disabled' : "form-select__select"}
          disabled={disabled}
        >

          {children}

        </select>
      </div>

      {touched && error
        ? (
          <span
            className="form-field__input-err"
          >
            {error}
          </span>
        ) : (<></>)}

    </label>
  );
}

export default FormSelect;
