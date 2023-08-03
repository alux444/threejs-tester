import React, { useState } from "react";
import { FormData } from "./FormInterface";
import { SketchPicker, ColorResult } from "react-color";

const Form = ({ updateDisplay }) => {
    const [selectedShape, setSelectShape] = useState<string>("Box");
    const [color, setColor] = useState<string>("##ffff00");
    const [outlineSegments, setOutlineSegments] = useState<boolean>(true);
    const [texture, setTexture] = useState<File>();
    const [textureURL, setTextureURL] = useState<string>();
    const [xRot, setXRot] = useState<number>(0.01);
    const [yRot, setYRot] = useState<number>(0.01);
    const [zRot, setZRot] = useState<number>(0.01);

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

    const handleColorChange = (newColor: ColorResult) => {
        setColor(newColor.hex);
    };

    const handleRotChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "xRot":
                setXRot(Number(value));
                break;
            case "yRot":
                setYRot(Number(value));
                break;
            case "zRot":
                setZRot(Number(value));
                break;
            default:
                break;
        }
    };

    const onChangeImage = (e) => {
        const image = e.target.files[0];
        setTexture(image);
        const imageURL = URL.createObjectURL(image);
        setTextureURL(imageURL);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        const newDisplay: FormData = {
            shape: selectedShape,
            color: color,
            outlineSegments: outlineSegments,
            xRotation: xRot,
            yRotation: yRot,
            zRotation: zRot,
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
                <SketchPicker
                    color={color}
                    onChangeComplete={handleColorChange}
                />
                <label>
                    Show Segment Outlines
                    <input
                        type="checkbox"
                        checked={outlineSegments}
                        onChange={(e) => setOutlineSegments(e.target.checked)}
                    />
                </label>
                <label>X rotation</label>
                <input
                    type="number"
                    value={xRot}
                    name="xRot"
                    onChange={handleRotChange}
                />
                <label>Y rotation</label>
                <input
                    type="number"
                    value={yRot}
                    name="yRot"
                    onChange={handleRotChange}
                />
                <label>Z rotation</label>
                <input
                    type="number"
                    value={zRot}
                    name="zRot"
                    onChange={handleRotChange}
                />

                <input
                    id="image-upload"
                    type="file"
                    className="file-input"
                    onChange={onChangeImage}
                    accept=".jpg,.jpeg,.png"
                />
                <p>Texture Preview</p>
                <img src={textureURL} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
