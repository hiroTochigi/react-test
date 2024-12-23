import React, { useState } from "react";

const MultipleForm = () => {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [fullName, setFullName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFullName(`${name.firstName} ${name.lastName}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} data-testid="form">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={name.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={name.lastName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Full Name: {fullName}</h2>
    </div>
  );
};

export default MultipleForm;
