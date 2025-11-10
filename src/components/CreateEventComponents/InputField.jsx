import React from "react";
import "../../styles/generalinfo.css";

// makes input fields for forms - can be normal input or big text box
export default function InputField({ placeholder, value, onChange, type = "text", multiline = false, rows = 4 }) {
  // if multiline is true, show textarea instead
  if (multiline) {
    return (
      <div className="input-container">
        <textarea
          className="input-field textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows} // this sets how tall the textarea is
        />
      </div>
    );
  }

  // normal input field
  return (
    <div className="input-container">
      <input
        type={type} // type can be text
        className="input-field"
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
      />
    </div>
  );
}