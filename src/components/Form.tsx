import React, { useState } from "react";
import { FormData } from "./FormInterface";

const Form = ({ updateDisplay }) => {
  const [selectedShape, setSelectShape] = useState<string>("Box");

  const shapeOptions: string[] = [
    "Box",
    "Capsule",
    "Cone",
    "Cylinder",
    "Dodecahedron",
    "Isocahedron",
    "Octahedron",
    "Sphere",
    "Tetrahedtron",
    "Torus",
    "TorusKnot",
  ];

  const handleShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectShape(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newDisplay: FormData = {
      shape: selectedShape,
    };
    updateDisplay(newDisplay);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <select value={selectedShape} onChange={handleShapeChange}>
          {shapeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
