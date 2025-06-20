import React, { useState, useEffect } from "react";
import API from "../api/axios";
import styled from "styled-components";

// Styled Components
const Form = styled.form`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #374151;
  }
`;

const AddUserForm = ({ onUserAdded }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "journalist",
    districtId: "681f2969edb0a8195732d428",
  });
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await API.get("/districts");
      setDistricts(res.data);
    };
    fetchDistricts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", form);
      alert("User created");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "journalist",
        districtId: "681f2969edb0a8195732d428",
      });
      onUserAdded(); // Refresh user list in admin panel
    } catch (err) {
      alert("Failed to create user");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>Create New User</Heading>
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <Select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        required
      >
        <option value="journalist">Journalist</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </Select>
      <Select
        value={form.districtId}
        onChange={(e) => setForm({ ...form, districtId: e.target.value })}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </Select>
      <Button type="submit">➕ Add User</Button>
    </Form>
  );
};

export default AddUserForm;
