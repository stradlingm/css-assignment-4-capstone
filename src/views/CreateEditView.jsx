/*
  File: CreateEditView.jsx
  Author: Matthew Stradling
  Date: 2026-04-21
  Purpose: This file holds a create edit view component that either creates a new item or edits an existing 
           item depending on the existence of an item id
*/

import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { ItemsContext } from "../context/ItemsContext";

export default function CreateEditView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(ItemsContext);
  // TODO: initial if editing; onSave add/update then navigate
  const item = id ? ctx.items.find((item) => item.id === id) : null;

  // Handle onSave that updates existing item if id exists or adds new item if id is null
  const handleOnSave = (data) => {

    id 
      // Update item if id exists
      ? ctx.updateItem(id, data) 
      // Otherwise add new item
      : ctx.addItem(data);
    // Show a banner that either shows that the item was successfully updated or edited
    ctx.setBanner({ type: 'success', text: id ? 'Item Successfully Updated!' : 'Item Successfully Added!' })
    // Navigate back to listview
    navigate("/list");
  };

  return (
    <div>
      <h2 className="h5 mb-3">{id ? "Edit Item" : "Add Item"}</h2>
      <ItemForm
        initial={item}
        onSave={handleOnSave}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}
