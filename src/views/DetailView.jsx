/*
  File: DetailView.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds a detail view component that shows a detailed card of a single product by item id
*/

import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";

export default function DetailView() {
  const { id } = useParams();
  const ctx = useContext(ItemsContext);
  // TODO: find by id
  const item = ctx.items.find((item) => item.id === id);
  return (
    <div>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-secondary" to="/list">
          ← Back to list
        </Link>
      </div>


      <div>
        {!item ? (
          <div className="alert alert-danger">{"Item Not Found"}</div>
        ) : (
          <div className="card border border-info h-100 w-100 shadow-sm">
            <div className="card-header m-3">Item ID: {item.id}</div>

            <div className="card-body d-flex flex-column">
              <h4 className="card-title mb-3 mx-2">{item.name}</h4>

              <div className="card-subtitle mb-3 mx-2 text-muted">
                Price: <strong>${Number(item.price).toFixed(2)}</strong>
              </div>

              <div className="card-subtitle mb-3 mx-2 text-muted">
                Stock: <strong>{item.stock}</strong>
              </div>

              <div className="card-subtitle mb-3 mx-2 text-muted">
                Category: <strong>{item.category}</strong>
              </div>

              <div className="card-subtitle mb-3 mx-2 fst-italic">
                {item.description.length === 0 ? (
                  <p>No Description Provided</p>
                ) : (
                  item.description
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
