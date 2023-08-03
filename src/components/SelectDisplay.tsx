import React, { useState } from "react";
import Display from "./Display";
import Form from "./Form";
import { FormData } from "./FormInterface";

const SelectDisplay = () => {
    const [form, setForm] = useState<FormData>({
        shape: "Box",
        color: "#F2F2A2",
        outlineSegments: false,
        xRotation: 0.01,
        yRotation: 0.01,
        zRotation: 0.01,
    });

    const newDisplaySubmit = (data: FormData) => {
        setForm(data);
    };

    return (
        <div>
            <p>Select Criteria</p>
            <small>Currently: {form.shape} </small>
            <Form updateDisplay={newDisplaySubmit} />
            <Display data={form} />
        </div>
    );
};

export default SelectDisplay;
