import React, { useState } from "react";
import { FormData } from "./FormInterface";

const Form = ({ updateDisplay }) => {
    const [selectedShape, setSelectShape] = useState<string>("Box");
    const [color, setColor] = useState<string>("#000000");
    const [outlineSegments, setOutlineSegments] = useState<boolean>(true);

    const shapeOptions: string[] = [
        "Box",
        "Capsule",
        "Cone",
        "Cylinder",
        "Dodecahedron",
        "Icosahedron",
        "Octahedron",
        "Sphere",
        "Tetrahedron",
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
            color: color,
            outlineSegments: outlineSegments,
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
                <label>
                    Show Segment Outlines
                    <input
                        type="checkbox"
                        checked={outlineSegments}
                        onChange={(e) => setOutlineSegments(e.target.checked)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
