/* eslint-disable react/prop-types */
import React from 'react';

import './FormField.scss';

function FormField({
  fieldType,
  fieldLabel,
  fieldName,
  fieldID,
  fieldPlaceholder,
  value,
  error,
  touched,
  onChange,
  disabled,
}) {
  return (
    <label
      htmlFor={fieldName}
      className="form-field__label"
    >
      {fieldLabel}
      <input
        type={fieldType}
        name={fieldName}
        id={fieldID}
        placeholder={fieldPlaceholder}
        value={value}
        onChange={onChange}
        className={disabled ? 'form-field__input_disabled' : 'form-field__input'}
        disabled={disabled}
      />

      {
        touched && error
          ? (
            <span
              className="form-field__input-err"
            >
              {error}
            </span>
          ) : (<></>)
      }

    </label>
  );
}

export default FormField;
