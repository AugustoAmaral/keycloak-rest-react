import React, { useState, useEffect } from "react";
import { Select } from "antd";
import fetchData from "../functions/fetchData";

const { Option } = Select;

const GroupsPicker = ({ userId }) => {
  const [userGroups, setUserGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleChange = (options) => {
    setLoading(true);

    if (options.length > userGroups.length) {
      //ADD USER ON GROUP
      const userGroupIds = userGroups.map((e) => e.id);
      const newGroupId = options.find((opt) => !userGroupIds.includes(opt));
      const addedOption = allGroups.find((group) => group.id === newGroupId);
      fetchData({
        url: "users/" + userId + "/groups/" + newGroupId,
        method: "PUT",
        body: { realm: "sample", userId: userId, groupId: newGroupId },
      }).then((r) => {
        if (r.status === 204) {
          setUserGroups((oldOptions) => [...oldOptions, addedOption]);
          setLoading(false);
        } else {
          alert("Something went wrong, please reload the page");
        }
      });
    } else {
      // REMOVE USER FROM GROUP
      const removedOption = userGroups.find((opt) => !options.includes(opt.id));

      fetchData({
        url: "users/" + userId + "/groups/" + removedOption.id,
        method: "DELETE",
      }).then((r) => {
        if (r.status === 204) {
          setUserGroups((oldOptions) => [
            ...oldOptions.filter((e) => e.id !== removedOption.id),
          ]);
          setLoading(false);
        } else {
          alert("Something went wrong, please reload the page");
        }
      });
    }
  };

  useEffect(() => {
    Promise.all([
      fetchData({ url: "groups" })
        .then((r) => r.json())
        .then((res) => setAllGroups(res)), //STORE ALL USERS INSIDE HOOK
      fetchData({ url: "users/" + userId + "/groups" })
        .then((r) => r.json())
        .then((res) => setUserGroups(res)), //STORE ALL USERS INSIDE HOOK (too)
    ]).then(() => setLoading(false));
  }, [userId]);

  return (
    <Select
      mode="multiple"
      value={[...userGroups.map((e) => e.id)]}
      onChange={handleChange}
      placeholder="Please select user groups"
      loading={loading}
    >
      {allGroups.map((opt) => (
        <Option key={opt.id} value={opt.id}>
          {opt.name}
        </Option>
      ))}
    </Select>
  );
};

export default GroupsPicker;
