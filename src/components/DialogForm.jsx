import React, { useState } from "react";
import { Modal, Button, Row, Col } from "antd";
import FormComponent from "./FormComponent";

const DialogForm = ({ onSubmit, onDelete, open, entry, onClose }) => {
  const [error, setError] = useState(null);

  const handleSubmit = (entry) => {
    onSubmit(entry).then((res) => {
      if (res === true) {
        onClose();
      } else {
        setError("Something went wrong");
      }
    });
  };

  const handleDelete = () => {
    onDelete().then((res) => {
      if (res === true) {
        onClose();
      } else {
        setError("Something went wrong");
      }
    });
  };

  return (
    <Modal
      visible={open}
      title={entry ? "Edit user" : "Add User"}
      onOk={onSubmit}
      onCancel={onClose}
      footer={
        <Row justify="space-between">
          <Col>
            {entry && (
              <Button onClick={handleDelete} key="delete" type="dashed">
                Delete
              </Button>
            )}
          </Col>
          <Col>
            <Button key="back" onClick={onClose}>
              Return
            </Button>
            <Button
              form="userForm"
              htmlType="submit"
              key="submit"
              type="primary"
            >
              Submit
            </Button>
          </Col>
        </Row>
      }
    >
      {open && (
        <FormComponent entry={entry} error={error} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
};

export default DialogForm;
