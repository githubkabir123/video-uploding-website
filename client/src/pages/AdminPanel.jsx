import React, { useEffect, useState } from "react";
import API from "../api/axios";
import AddUserForm from "../components/AddUserForm";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
`;

const Heading = styled.h2`
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const FilterSelect = styled.select`
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const RoleSelect = styled.select`
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 0.4rem 0.7rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b91c1c;
  }
`;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filterDistrict, setFilterDistrict] = useState("");

  useEffect(() => {
    fetchData();
  }, [filterDistrict]);

  const fetchData = async () => {
    try {
      const userRes = await API.get("/users");
      const districtRes = await API.get("/districts");

      let allUsers = userRes.data;
      if (filterDistrict) {
        allUsers = allUsers.filter((u) => u.districtId?._id === filterDistrict);
      }

      setUsers(allUsers);
      setDistricts(districtRes.data);
    } catch (err) {
      console.error("Admin load error", err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await API.put(`/users/${id}`, { role });
      fetchData();
    } catch (err) {
      alert("Failed to change role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <Container>
      <Heading>🛠️ Admin Panel</Heading>
      <AddUserForm onUserAdded={fetchData} />

      <FilterSelect
        onChange={(e) => setFilterDistrict(e.target.value)}
        value={filterDistrict}
      >
        <option value="">All Districts</option>
        {districts.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </FilterSelect>

      <StyledTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>District</Th>
            <Th>Role</Th>
            <Th>Change Role</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <Td>
                <Link to={`/journalist/${u._id}/videos`}>{u.name}</Link>
              </Td>
              <Td>{u.email}</Td>
              <Td>
                <Link to={`/district/${u.districtId?._id}`}>
                  {u.districtId?.name || "—"}
                </Link>
              </Td>
              <Td>{u.role}</Td>
              <Td>
                <RoleSelect
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  <option value="journalist">Journalist</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </RoleSelect>
              </Td>
              <Td>
                <DeleteButton onClick={() => handleDelete(u._id)}>
                  ❌
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default AdminPanel;
