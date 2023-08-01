import React, { useState } from "react";
import Display from "./Display";
import Form from "./Form";
import { FormData } from "./FormInterface";

const SelectDisplay = () => {
  const [form, setForm] = useState<FormData>({
    shape: "Box",
  });

  const newDisplaySubmit = (data: FormData) => {
    setForm(data);
  };

  return (
    <div>
      <p>Select Criteria</p>
      <small>Currently: {form.shape} </small>
      <Form updateDisplay={newDisplaySubmit} />
      <Display />
    </div>
  );
};

export default SelectDisplay;
