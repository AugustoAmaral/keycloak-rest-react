import React from "react";
import DialogForm from "./DialogForm";

const ConnectedDialogForm = ({ entry, ...props }) => {

  // const handleSubmit = (data) => {
  //   if (entry) {
  //     //UPDATE
  //   } else {
  //     //CRETE
  //   }
  // };

  // const handleDelete = (id) => {
  //   if (entry) {
  //     //DELETE
  //   }
  // };
  return (
    <DialogForm
      entry={entry}
      // onSubmit={handleSubmit}
      // onDelete={handleDelete}
      {...props}
    />
  );
};

export default ConnectedDialogForm;
