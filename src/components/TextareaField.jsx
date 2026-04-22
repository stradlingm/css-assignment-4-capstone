/*
  File: TextareaField.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds a textarea component that is used within the item form for the item description
*/

const TextareaField = ({ id, name, rows, error, value, onChange, onBlur }) => {
  // Error description for any invalid field values
  const errorDescription = error ? `${id}-error` : undefined;

  return (
    <div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={errorDescription}
        className={`form-control ${error ? "is-invalid" : ""}`}
      ></textarea>

      {error && (
        <div id={`${id}-error`} style={{ color: "darkred" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default TextareaField;
