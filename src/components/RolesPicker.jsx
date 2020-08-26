import React, { useState, useEffect } from "react";
import { Select } from "antd";
import fetchData from "../functions/fetchData";

const { Option } = Select;

const RolesPicker = ({ userId }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [avaliableOptions, setAvaliableOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (options) => {
    setLoading(true);

    //THIS WILL CHECK IF USER IS ADDING NEW ROLE
    if (options.length > selectedOptions.length) {
      const addedOption = avaliableOptions.find((opt) =>
        options.includes(opt.id)
      ); //FIND ROLE OBJECT
      fetchData({
        url: "users/" + userId + "/role-mappings/realm",
        method: "POST",
        body: [addedOption],
      }).then((r) => {
        if (r.status === 204) {
          setSelectedOptions((oldOptions) => [...oldOptions, addedOption]);
          setAvaliableOptions((oldOptions) => [
            ...oldOptions.filter((e) => e.id !== addedOption.id),
          ]);
          setLoading(false);
        } else {
          alert("Something went wrong, please reload the page");
        }
      });
    } else {
      // delete role
      const removedOption = selectedOptions.find(
        (opt) => !options.includes(opt.id)
      );

      fetchData({
        url: "users/" + userId + "/role-mappings/realm",
        method: "DELETE",
        body: [removedOption],
      }).then((r) => {
        if (r.status === 204) {
          setSelectedOptions((oldOptions) => [
            ...oldOptions.filter((e) => e.id !== removedOption.id),
          ]);
          setAvaliableOptions((oldOptions) => [...oldOptions, removedOption]);
          setLoading(false);
        } else {
          alert("Something went wrong, please reload the page");
        }
      });
    }
  };

  useEffect(() => {
    Promise.all([
      fetchData({ url: "users/" + userId + "/role-mappings/realm/available" })
        .then((r) => r.json())
        .then((res) => setAvaliableOptions(res)),
      fetchData({ url: "users/" + userId + "/role-mappings/realm" })
        .then((r) => r.json())
        .then((res) => setSelectedOptions(res)),
    ]).then(() => setLoading(false));
  }, [userId]);

  return (
    <Select
      mode="multiple"
      value={[...selectedOptions.map((e) => e.id)]}
      onChange={handleChange}
      placeholder="Please select user roles"
      loading={loading}
      disabled={loading}
    >
      {selectedOptions.map((opt) => (
        <Option key={opt.id} value={opt.id}>
          {opt.name}
        </Option>
      ))}
      {avaliableOptions.map((opt) => (
        <Option key={opt.id} value={opt.id}>
          {opt.name}
        </Option>
      ))}
    </Select>
  );
};

export default RolesPicker;
