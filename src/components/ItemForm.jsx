/*
  File: ItemForm.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds an item form component that holds all the validation and logic that is used when creating/editing items
*/

import React, { useEffect } from "react";
import useFormValidation from "../hooks/useFormValidation";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextareaField from "./TextareaField";

// Validators object that holds all the conditions that need to be tested in the form
const validators = {
  name: (v) => {
    if (!v.trim()) return "Name field is required.";
    return null;
  },
  price: (v) => {
    if (!v.trim()) return "Price field is required.";

    if (!/^\d+(\.\d{1,2})?$/.test(v.trim()))
      return "Price must be a positive number up to 2 decimals.";
    return null;
  },
  stock: (v) => {
    if (!v.trim()) return "Stock field is required.";

    if (!/^\d+$/.test(v.trim())) return "Stock must be a positive number.";
    return null;
  },
  category: (v) => {
    if (!v.trim()) return "Category field is required.";
    return null;
  },
};

export default function ItemForm({ initial, onSave, onCancel }) {
  // useFormValidation hook utilized for itemForm
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
  } = useFormValidation(
    initial || {
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    },
    validators,
  );

  // Re-hydrate form when initial values are present
  useEffect(() => {
    initial
      ? setValues({
          name: initial.name,
          price: String(initial.price),
          stock: String(initial.stock),
          category: initial.category,
          description: initial.description,
        })
      // Leave fields blank when no initial values found
      : setValues({
          name: "",
          price: "",
          stock: "",
          category: "",
          description: "",
        });
  }, [initial]);

  function onSubmit(e) {
    // Prevent page reloads
    e.preventDefault();
    /* TODO: validate + save */
    const errs = validateAll();
    // Check for errors
    if (Object.values(errs).every((v) => !v)) {
      // Normalized item values
      const normalizedItem = {
        name: values.name.trim(),
        price: parseFloat(parseFloat(values.price.trim()).toFixed(2)),
        stock: parseInt(values.stock.trim()),
        category: values.category.trim(),
        description: values.description.trim(),
      };
      // Call onSave with normalized item
      onSave(normalizedItem);
    }
  }

  return (
    <form className="row g-3" onSubmit={onSubmit} noValidate>
      {/* TODO: name/title (required) */}
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <InputField
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={errors.name}
        />
      </div>
      {/* TODO: category (required) */}
      <div className="col-md-6">
        <label className="form-label">Category</label>
        <SelectField
          id="category"
          name="category"
          value={values.category}
          onChange={(e) => handleChange("category", e.target.value)}
          onBlur={() => handleBlur("category")}
          error={errors.category}
        />
      </div>
      {/* TODO: numeric fields like price/rating with validation */}
      <div className="col-md-3">
        <label className="form-label">Price</label>
        <InputField
          id="price"
          name="price"
          type="text"
          value={values.price}
          onChange={(e) => handleChange("price", e.target.value)}
          onBlur={() => handleBlur("price")}
          error={errors.price}
        />
        <div className="form-text">Format: 12.34</div>
      </div>
      {/* Stock Field */}
      <div className="col-md-3">
        <label className="form-label">Stock</label>
        <InputField
          id="stock"
          name="stock"
          type="text"
          value={values.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
          onBlur={() => handleBlur("stock")}
          error={errors.stock}
        />
      </div>
      {/* TODO: description */}
      <div className="col-12">
        <label className="form-label">Description</label>
        <TextareaField
          id="description"
          name="description"
          rows={3}
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onBlur={() => handleBlur("description")}
        />
      </div>
      <div className="col-12 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          Save
        </button>
        {/* TODO: Cancel button in edit mode */}
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
