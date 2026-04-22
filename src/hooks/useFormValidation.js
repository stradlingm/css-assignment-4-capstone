/*
  File: useFormValidation.js
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the states for form validation and the handleChange, handleBlur, and validateAll methods for form validation
*/

import { useState } from "react";

export default function useFormValidation(initialValues, validators) {
    // validator useStates
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // validateField method
    const validateField = (field, value) => {
        const rule = validators[field];
        const msg = rule
            ? rule(value, values)
            : null;
        setErrors((e) => ({
            ...e,
            [field]: msg,
        }));
        return msg;
    };

    // handleChange method
    const handleChange = (field, value) => {
        setValues((v) => ({
            ...v,
            [field]: value,
        }));
        validateField(field, value);
    };

    // handleBlur method
    const handleBlur = (field) => {
        setTouched((t) => ({
            ...t,
            [field]: true,
        }));
        validateField(field, values[field]);
    };

    // validateAll method
    const validateAll = () => {
        const errs = {};
        for (const key of Object.keys(validators)) {
            errs[key] = validators[key](values[key], values);
        }
        setErrors(errs);
        return errs;
    };

    return { values, errors, touched, handleChange, handleBlur, validateAll, setValues };
};