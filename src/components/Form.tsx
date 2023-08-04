import React, { useState } from "react";
import { FormData } from "./FormInterface";
import { SketchPicker, ColorResult } from "react-color";

const Form = ({ updateDisplay }) => {
    const [selectedShape, setSelectShape] = useState<string>("Box");
    const [color, setColor] = useState<string>("#ffff00");
    const [textureURL, setTextureURL] = useState<string | null>(null);
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
        const imageURL = URL.createObjectURL(image);
        setTextureURL(imageURL);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        const newDisplay: FormData = {
            shape: selectedShape,
            color: color,
            xRotation: xRot,
            yRotation: yRot,
            zRotation: zRot,
            texture: textureURL,
            optionOne: undefined,
            optionTwo: undefined,
            optionThree: undefined,
        };
        updateDisplay(newDisplay);
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "2rem",
            }}
        >
            <form
                onSubmit={onSubmit}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "5px",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
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
                <small>Color: {color}</small>
                <div style={{ display: "flex", gap: "1rem" }}>
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
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <input
                        id="image-upload"
                        type="file"
                        className="file-input"
                        onChange={onChangeImage}
                        accept=".jpg,.jpeg,.png"
                    />
                    <img src={textureURL} style={{ maxHeight: "20vh" }} />
                    <button type="button" onClick={() => setTextureURL(null)}>
                        X
                    </button>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
