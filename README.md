# Assignment 4 — Matt's PC Part Emporium

## Project Overview
This project is a multi-view React SPA utilizing React Router, and the Context API. 

## Features
Users can Create, View, Edit, Delete, Search, Filter, and Sort a catalog of PC parts with data that is persisted through the browser with localStorage.

## Live Demo Link
https://stradlingm.github.io/css-assignment-4-capstone/

## Setup Instructions

```bash
npm install
npm run dev
```
## Build and Deploy

```bash
npm run build
npm run deploy
```

## Routing Map

'/'         - HomeView       - App Home Page
'/list'     - ListView       - PC part list with search, filters, and sorting
'item/:id'  - DetailView     - Detail view for single PC part
'/new'      - CreateEditView - Create a new item 
'/edit/:id' - CreateEditView - Edit an existing PC part
'*'         - Not Found      - 404 Fallback

## Data Model

'id'          - string - Created using crypto.randomUUID()
'name'        - string - Required field
'category'    - string - Required field
'price'       - number - Required field, >= 0, up to 2 decimals
'stock'       - number - Required field, positive integer
'description' - string - Optional field

## Storage Key
Storage key used for localStorage: ```a4_items```
