// ElementMaker.js

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
// Creat an ElementMaker component
function ElementMaker(props) {
  return (
    // Render a <span> element
    <div>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input 
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
          />
        ) : (
          <div 
            onClick={props.handleSingleClick}
            style={{ 
              display: "inline-block", 
              height: "25px", 
              minWidth: "300px", 
            }}
          >
            {props.value}<FontAwesomeIcon icon={faPen} style={{'margin-left':'8px'}} size='2xs'/>
          </div>
        )
      }
    </div>
  );
}

export default ElementMaker;