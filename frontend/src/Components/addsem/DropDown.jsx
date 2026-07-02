import { useState } from "react";
import "./DropDown.css"
export default function CustomDropdown({options,name,selectedOption,setSelectedOption,property,
                                      fontSize,backgroundColor}) {
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block", margin: "20px" }}>
      {/* Dropdown Trigger Button */}
      <button className="btn-dropdown" 
      onClick={toggleDropdown} 
      style={{ padding: "10px 20px",
              backgroundColor: backgroundColor?backgroundColor:"#00073d",
              fontSize: fontSize?fontSize:"30px"
       }}>
        {selectedOption||name} {isOpen ? "▲" : "▼"}
      </button>

      {/* Conditional Rendering of the Options List */}
      {isOpen && (
        <ul className="ul-dropdown" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          backgroundColor:"#00073d",
          border: "1px solid #ccc",
          listStyle: "none",
          padding: "15px 0",
          margin: "5px 0 0 0",
          minWidth: "150px",
          zIndex: 10,
          fontFamily:"Google Sans",
          fontSize:"30px"
        }} 
        
        >
          {options.map((option) => (
            <li
             className="li-dropdown"
              key={property?option[property]:option} 
              onClick={() => handleOptionClick(property?option[property]:option)}
              style={{ padding: "8px 16px", cursor: "pointer" }}
            >
              {property?option[property]:option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
