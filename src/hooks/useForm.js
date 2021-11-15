import { useState } from "react";

const useForm = (initialState, onSubmit) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(values);
  };

  return [values, handleChange, handleSubmit];
};

export default useForm;
