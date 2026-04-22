/*
  File: Layout.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds the layout component that specifies the layout that persists each page 
*/

import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ItemsContext } from "../context/ItemsContext";

export default function Layout() {
  // Context for utilizing banner
  const ctx = useContext(ItemsContext);

  return (
    <div className="container py-3">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Matt's PC Part Emporium</h1>
        <nav className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-secondary" to="/">
            Home
          </Link>
          <Link className="btn btn-sm btn-outline-secondary" to="/list">
            List
          </Link>
          <Link className="btn btn-sm btn-primary" to="/new">
            Create
          </Link>
        </nav>
      </header>

      {/* Success/Delete banner */}
      {ctx.banner && (
        <div className={`alert alert-${ctx.banner.type}`}>
          {ctx.banner.text}
        </div>
      )}

      <Outlet />
    </div>
  );
}
