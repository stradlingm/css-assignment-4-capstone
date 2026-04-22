/*
  File: HomeView.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds a HomeView component that holds theewelcome messages as well as links to the listview and create edit view
*/

import React from 'react'
import { Link } from 'react-router-dom';

export default function HomeView(){
  return (
    <div className="p-4 bg-light rounded">
      <h2 className="h2">Welcome to my PC parts inventory page!!</h2>
      <p className="mb-0">Check out our current selection of PC parts that we currently have in stock or add your own!!</p>
      <div className="d-flex gap-2 mt-3">
        {/* Button that links to the listview */}
        <Link className="btn btn-outline-secondary" to="/list">View Items</Link>
        {/* Button that links to the create edit view */}
        <Link className="btn btn-primary" to="/new">Add New Items</Link>
      </div>
    </div>
  )
}
