import React, { useEffect, useState } from "react";
import { Table } from "antd";
import fetchData from "../functions/fetchData";
import columns from "../functions/tableColums.json";
import DialogForm from "../components/DialogForm";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData({ url: "users" })
      .then((r) => r.json())
      .then((res) => setUsers(res.map((e) => ({ ...e, key: e.id }))));
  }, []);

  const [formOpen, setFormOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const handleClose = () => {
    setFormOpen(false);
    setSelectedId("");
  };

  const handleOpen = (entry) => {
    if (entry) {
      setSelectedId(entry.id);
    }
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedId) {
      //IF USER EXISTS, UPDATE IT
      return fetchData({
        url: "users/" + selectedId,
        method: "PUT",
        body: data,
      }).then((response) => {
        if (response.status === 204) {
          setUsers((oldUsers) =>
            oldUsers.map((user) => (user.id === data.id ? { ...data } : user))
          );
          return true;
        }
      });
    } else {
      //ELSE, CREATE A NEW ONE
      return fetchData({
        url: "users",
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.status === 201) {
          setUsers((oldUsers) => [...oldUsers, data]);
          return true;
        }
      });
    }
  };

  const handleDelete = () => {
    //DELETE USER
    return fetchData({
      url: "users/" + selectedId,
      method: "DELETE",
    }).then((response) => {
      if (response.status === 204) {
        setUsers((oldUsers) =>
          oldUsers.filter((user) => user.id !== selectedId)
        );
        return true;
      }
    });
  };

  return (
    <>
      <Table
        onRow={(record) => {
          return {
            onClick: () => handleOpen(record), // click row
          };
        }}
        dataSource={users}
        columns={columns}
      />
      <DialogForm
        open={formOpen}
        entry={users.find((e) => e.id === selectedId)}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onClose={handleClose}
      />
      <button onClick={() => handleOpen()}>Add NEW</button>
    </>
  );
};

export default ListUsers;
