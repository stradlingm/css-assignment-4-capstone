/*
  File: ItemsContext.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the logic that allows us to pass useItems states and methods as context to the rest of our components 
           using the context provider
*/

import React, { createContext, useEffect } from "react";
import useItems from "../hooks/useItems";

export const ItemsContext = createContext(null);

export function ItemsProvider({ children }) {
  // TODO: initialize state and handlers (consider a custom useItems hook)
  // TODO: expose items, derived list, filter state, CRUD handlers
  const value = useItems();

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}
