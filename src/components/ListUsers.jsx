import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import fetchData from "../functions/fetchData";
import columns from "../functions/tableColums.json";
import DialogForm from "../components/DialogForm";
import { PlusCircleOutlined } from "@ant-design/icons";

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
      console.log(data);
      return fetchData({
        url: "users/" + selectedId,
        method: "PUT",
        body: data,
      }).then((response) => {
        if (response.status === 204) {
          setUsers((oldUsers) =>
            oldUsers.map((user) =>
              user.id === selectedId ? { ...user, ...data } : user
            )
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
          return fetchData({ url: "users" })
            .then((r) => r.json())
            .then((res) => {
              setUsers(res.map((e) => ({ ...e, key: e.id })));
              return true;
            });
        } else {
          alert("Something went wrong");
          return false;
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
        footer={() => (
          <Button
            size="large"
            icon={<PlusCircleOutlined />}
            onClick={() => handleOpen()}
          />
        )}
        pagination={false}
      />
      <DialogForm
        open={formOpen}
        entry={users.find((e) => e.id === selectedId)}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onClose={handleClose}
      />
    </>
  );
};

export default ListUsers;
