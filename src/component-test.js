import React from "react";
import './component-test.css'

import { ReactComponent as Hamburger } from './img/hamburger.svg';

export default class AppTest extends React.Component {
   state = {
      items: ["🍰", "🍩", "🍎", "🍕"]
   };

   onDragStart = (e, index) => {
      this.draggedItem = this.state.items[index];
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.target.parentNode);
      e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
   };

   onDragOver = index => {
      const draggedOverItem = this.state.items[index];

      // if the item is dragged over itself, ignore
      if (this.draggedItem === draggedOverItem) {
         return;
      }

      // filter out the currently dragged item
      let items = this.state.items.filter(item => item !== this.draggedItem);

      // add the dragged item after the dragged over item
      items.splice(index, 0, this.draggedItem);

      this.setState({ items });
   };

   onDragEnd = () => {
      this.draggedIdx = null;
   };

   render() {
      return (
         <div className="AppTest">
            <main>
               <ul>
                  {this.state.items.map((item, idx) => (
                     <li key={item} onDragOver={() => this.onDragOver(idx)}
                        draggable
                        onDragStart={e => this.onDragStart(e, idx)}
                        onDragEnd={this.onDragEnd}>
                        <div
                           draggable
                           onDragStart={e => this.onDragStart(e, idx)}
                           onDragEnd={this.onDragEnd}
                        >
                           <span>{item}</span>
                        </div>
                     </li>
                  ))}
               </ul>
            </main>
         </div>
      );
   }
}