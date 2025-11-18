import { useState } from 'react';
// import "./TodoItem.css";

function ToRead({ toread }) {
  return (
    <li style={{ textDecoration: toread.read ? "line-through" : "underline" }}>
      {toread.text}
    </li>
  );
}
export default ToRead