import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { loadKeycloakInfo } from "../keycloak/functions";

const baseUrl = "http://localhost:8080/auth/admin/realms/sample/";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
  },
];

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(baseUrl + "users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loadKeycloakInfo().access_token}`,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setUsers(r.map((e) => ({ ...e, key: e.id })));
      });
  }, []);

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default ListUsers;
