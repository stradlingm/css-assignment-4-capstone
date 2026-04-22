/*
  File: InputField.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds an inputfield component that is used within both the item form and the listview component for form field inputs
*/

const InputField = ({ id, name, type, value, onChange, onBlur, error }) => {
  // Error description for any invalid field values
  const errorDescription = error ? `${id}-error` : undefined;

  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={errorDescription}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />

      {error && (
        <div id={`${id}-error`} style={{ color: "darkred" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default InputField;
