import React from "react";
import useHandleForm from "./useHandleForm";

const Form = () => {
  const {
    email,
    submittedEmail,
    error,
    handleSubmit,
    handleReset,
    handleChange,
  } = useHandleForm();

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" value={email} onChange={handleChange} />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      {error && <p>{error}</p>}
      {submittedEmail && <p>Submitted Email: {submittedEmail}</p>}
    </form>
  );
};

export default Form;
