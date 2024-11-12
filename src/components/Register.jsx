import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio de dados, por exemplo, chamar a API de registo
    console.log("Form Submitted:", formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center">
        Registar
      </Typography>

      <TextField
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        type="email"
      />

      <TextField
        label="Senha"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        type="password"
      />

      <Button type="submit" variant="contained" color="primary">
        Registrar
      </Button>
    </Box>
  );
};

export default Register;
