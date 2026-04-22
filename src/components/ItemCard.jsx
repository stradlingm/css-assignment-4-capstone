/*
  File: ItemCard.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the format of each item cacard including a view, edit, and delete button
*/

import React from "react";

export default function ItemCard({ item, onView, onEdit, onDelete }) {
  return (
    <div className="border rounded p-3">
      <div className="row">
        <div className="card h-100 border border-info shadow-sm w-100">
          {/* Item ID Header */}
          <div className="card-header m-3">Item ID: {item.id}</div>
          <div className="card-body d-flex flex-column">
            {/* Item Name */}
            <h4 className="card-title mb-3 mx-2">{item.name}</h4>
            {/* Item Price */}
            <div className="card-subtitle mb-3 mx-2 text-muted">
              Price: <strong>${Number(item.price).toFixed(2)}</strong>
            </div>
            {/* Item Stock */}
            <div className="card-subtitle mb-3 mx-2 text-muted">
              Stock: <strong>{Number(item.stock)}</strong>
            </div>
            {/* Item Description */}
            <div className="card-subtitle mb-3 mx-2 fst-italic">
              {item.description}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end gap-2">
            {/* View Button */}
            <button
              className="btn btn-info"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onView(item.id);
              }}
              >
                View Item
            </button>
             {/* Edit Button */} 
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(item.id);
              }}
              >
                Edit Item
            </button>
              {/* Delete Button */}
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onDelete(item.id);
              }}
              >
                Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
