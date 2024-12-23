import { useState } from "react";
import { validateEmail } from "./utils";

const useHandleForm = () => {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }
    setError("");
    setSubmittedEmail(email);
  };

  const handleReset = () => {
    setEmail("");
    setSubmittedEmail("");
    setError("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return {
    email,
    setEmail,
    submittedEmail,
    error,
    handleSubmit,
    handleReset,
    handleChange,
  };
};

export default useHandleForm;
