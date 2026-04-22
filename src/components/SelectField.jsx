/*
  File: SelectField.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds a SelectField component that is used in both the item form and the listview for category selection and filtering
*/

const SelectField = ({ id, name, value, onChange, onBlur, error }) => {
  // Error description for any invalid field values
  const errorDescription = error ? `${id}-error` : undefined;

  return (
    <div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={errorDescription}
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value="">Select a Category</option>
        <option value="memory">Memory</option>
        <option value="gpu">Graphics Card</option>
        <option value="case">Gaming PC Case</option>
        <option value="motherboard">Motherboards</option>
        <option value="cpu">CPU</option>
        <option value="cooler">CPU Cooler</option>
        <option value="storage">Storage</option>
        <option value="psu">Power Supply</option>
        <option value="monitor">Monitor</option>
        <option value="peripheral">Peripherals</option>
      </select>

      {error && (
        <div id={`${id}-error`} style={{ color: "darkred" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectField;
