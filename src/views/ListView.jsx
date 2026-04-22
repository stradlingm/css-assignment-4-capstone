/*
  File: ListView.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the ListView view component that takes ItemsContext for the derived list and searching/sorting filters
           and utilizes them for each Input/Select field
*/

import React, { useContext } from "react";
import ItemCard from "../components/ItemCard";
import { ItemsContext } from "../context/ItemsContext";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Link, useNavigate } from "react-router-dom";

export default function ListView() {
  const ctx = useContext(ItemsContext); // TODO: use ctx.derived and filters

  // Template used for sort value
  const sortSelection = `${ctx.sortKey}-${ctx.sortDir}`;

  // nav variable for navigating to detailview upon clicking on item card
  const nav = useNavigate();

  // Helper method that handles sorting value changes
  const handleSortChange = (sortValue) => {
    const [key, direction] = sortValue.split("-");
    ctx.setSortKey(key);
    ctx.setSortDir(direction);
  };

  // Helper method that handles category changes
  const handleCategoryOnChange = (value) => {
    ctx.setCategory(value);
  };

  return (
    <div>
      <div className="d-flex flex-column flex-md-row gap-2 w-100 align-items-md-center mb-3">
        <div className="card shadow-sm mb-3 flex-grow-1">
          <div className="card-body">
            <div className="row g-2 align-items-end mb-3">

              {/* search input */}
              <div className="col-12 col-md-7">
                <label className="form-label">Find Items</label>
                <InputField
                  className="form-control"
                  value={ctx.search}
                  onChange={(e) => ctx.setSearch(e.target.value)}
                  placeholder="Find items...."
                />
              </div>

              {/* category filter */}
              <div className="col-12 col-md-3">
                <label className="form-label">Item Category</label>
                <SelectField
                  className="form-select"
                  value={ctx.category}
                  onChange={(e) => handleCategoryOnChange(e.target.value)}
                />
              </div>
              {/* min price filter */}
              <div className="col-12 col-md-3">
                <label className="form-label">Item Min Price</label>
                <InputField
                  id="minValue"
                  name="minValue"
                  type="number"
                  value={ctx.minValue}
                  onChange={(e) => ctx.setMinValue(e.target.value)}
                />
              </div>

              {/* max price fiter */}
              <div className="col-12 col-md-3">
                <label className="form-label">Item Max Price</label>
                <InputField
                  id="maxValue"
                  name="maxValue"
                  type="number"
                  value={ctx.maxValue}
                  onChange={(e) => ctx.setMaxValue(e.target.value)}
                />
              </div>

              {/* sort key/dir filter */}
              <div className="col-12 col-md-3">
                <label className="form-label">Sort Items</label>
                <select
                  className="form-select"
                  value={sortSelection}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low-High)</option>
                  <option value="price-desc">Price (High-Low)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          {/* TODO: empty state */}
          {ctx.derived.length === 0 ? (
            <div className="alert alert-danger">No Items Found</div>
          ) : (
            // TODO: map ctx.derived to ItemCard
            ctx.derived.map((item) => (
              // Link item card to detail view when clicked on
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <ItemCard
                  // Derived items
                  item={item}
                  // Navigate to detail view
                  onView={() => nav(`/item/${item.id}`)}
                  // Navigate to create edit view
                  onEdit={() => nav(`/edit/${item.id}`)}
                  // Delete item along with a feedback banner
                  onDelete={() => {
                    ctx.deleteItem(item.id);
                    ctx.setBanner({
                      type: "danger",
                      text: "Item Deleted Successfully!",
                    });
                  }}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
