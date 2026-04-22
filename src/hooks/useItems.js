/*
  File: useItems.js
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the logic for loading items on mount, persisting items when changes occur, the info banner, item CRUD operations, and sorting and filtering
           which is then passed to ItemsContext
*/

import { useEffect, useMemo, useState } from "react";
import { readItems, writeItems } from "../storage/localStorageHelper";
const STORAGE_KEY = "a4_items";

export default function useItems() {
  // Set items initial state to read items on mount
  const [items, setItems] = useState(() => readItems());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [banner, setBanner] = useState(null);

  // TODO: persist to localStorage when items change
  useEffect(() => {
    writeItems(items);
  }, [items]);

  // Banner useEffect
  useEffect(() => {
    if (!banner) return;
    const timer = setTimeout(() => setBanner(null), 2000);
    return () => clearTimeout(timer);
  }, [banner]);

  // AddItem method
  function addItem(data) {
    setItems((prev) => {
      const next = [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...data,
        },
      ];
      return next;
    });
  }

  // UpdateItem method
  function updateItem(id, patch) {
    setItems((prev) => {
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...patch,
            }
          : item,
      );
    });
  }

  // DeleteItem method
  function deleteItem(id) {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next;
    });
  }
  
  // Derived Items
  const derived = useMemo(() => {
    // TODO: apply search, category, min/max and sort
    const normalized = search.trim().toLowerCase();

    // Filter items by name, category, and min/max price
    const filtered = items.filter((item) => {
      const filterName = item.name.toLowerCase().includes(normalized);
      const filterCategory =
        category === "" ? true : item.category === category;
      const filterMin = minValue === "" ? true : item.price >= Number(minValue);
      const filterMax = maxValue === "" ? true : item.price <= Number(maxValue);

      return filterName && filterCategory && filterMin && filterMax;
    });

    // Sort the filtered list by name/price asc/desc
    const sorted = [...filtered];

    switch (`${sortKey}-${sortDir}`) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return sorted;
  }, [items, search, category, minValue, maxValue, sortKey, sortDir]);

  return {
    items,
    setItems,
    search,
    setSearch,
    category,
    setCategory,
    sortKey,
    setSortKey,
    sortDir,
    setSortDir,
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    derived,
    addItem,
    updateItem,
    deleteItem,
    banner,
    setBanner,
  };
}
