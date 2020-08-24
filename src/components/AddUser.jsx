import React, { useState } from "react";

const AddUser = () => {
  const [fieldValue, setFieldValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fieldValue);
  };

  return (
    <div>
      Add users
      <br />
      <form onSubmit={handleSubmit}>
        <input
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
          placeholder="Insert user name here"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
