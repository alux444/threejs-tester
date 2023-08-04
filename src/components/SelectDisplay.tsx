import React, { useState } from "react";
import Display from "./Display";
import Form from "./Form";
import { FormData } from "./FormInterface";

const SelectDisplay = () => {
    const [form, setForm] = useState<FormData>({
        shape: "Box",
        color: "#ffffff",
        xRotation: 0.01,
        yRotation: 0.01,
        zRotation: 0.01,
        texture: null,
        optionOne: undefined,
        optionTwo: undefined,
        optionThree: undefined,
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
