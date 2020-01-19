import SortableList from 'react-sortable-list'
import ReactDOM from 'react-dom'
import React, { Component } from 'react'

export default function DraggableList({ items }) {

   return (
      <div>
         <SortableList data={items} />
      </div>
   )
}