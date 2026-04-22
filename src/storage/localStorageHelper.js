/*
  File: localStorageHelper.js
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the read and write storage methods that are used in the useItems hook
*/

const STORAGE_KEY = "a4_items";

// Read items function that gets the storage item, parses the raw array and returns either the parsed array or empty array
export const readItems = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const next = JSON.parse(raw);
        return Array.isArray(next) ? next : [];
    } catch {
        return [];
    }
}

// Write items helper that writes the array to localstorage or an empty array if null
export const writeItems = (list) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list ?? []));
    } catch (err) {
        console.log(err.message || "Could not write items to localStorage.");
    }
}
