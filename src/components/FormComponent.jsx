import React, { useState } from "react";
import { Form, Input, Switch } from "antd";
import GroupsPicker from "./GroupsPicker";
import RolesPicker from "./RolesPicker";

const FormComponent = ({ error, entry, onSubmit }) => {
  const [values, setValues] = useState({
    username: entry?.username || "",
    firstName: entry?.firstName || "",
    lastName: entry?.lastName || "",
    email: entry?.email || "",
    enabled: entry?.enabled || false,
  });

  const handleChange = (val) => {
    setValues((oldValues) => ({ ...oldValues, ...val }));
  };

  const handleSubmit = () => onSubmit({ ...values });

  return (
    <Form
      id="userForm"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={values}
      onValuesChange={handleChange}
      onSubmitCapture={handleSubmit}
      size="default"
    >
      {error && (
        <Form.Item label="Plain Text">
          <span className="ant-form-text">{error}</span>
        </Form.Item>
      )}
      <Form.Item
        name="username"
        label="Username"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please, insert one username!",
          },
        ]}
      >
        <Input required />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please, insert your name",
          },
        ]}
      >
        <Input required />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please, insert your last name!",
          },
        ]}
      >
        <Input required />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please, insert your email!",
          },
        ]}
      >
        <Input type="email" required />
      </Form.Item>
      <Form.Item
        checked={values.enabled}
        name="enabled"
        label="Enabled"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      {entry && (
        <>
          <Form.Item
            label="Groups"
            help="Please, note this will be updated in real time"
          >
            <GroupsPicker userId={entry.id} />
          </Form.Item>
          <Form.Item
            label="Roles"
            help="Please, note this will be updated in real time"
          >
            <RolesPicker userId={entry.id} />
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default FormComponent;
