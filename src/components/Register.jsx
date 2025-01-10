// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { validateEmail } from "../utils/Handlers";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({ email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name])
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // ----------------------------- Handlers Logic -----------------------------
  const handleLoadClick = async () => {
    setLoading(true);

    try {
      if (typeof grecaptcha !== "undefined") {
        // eslint-disable-next-line no-undef
        const token = await grecaptcha.execute(
          "6Lcwt58qAAAAAOL6bEfU1PRZBgXCHhTPIXBaK6AX",
          { action: "validate_email" }
        );

        // Chamar validação sem exibir mensagem de sucesso
        const isValid = await validateEmail(
          formData.email,
          token,
          token,
          setErrors,
          t
        );

        if (isValid) {
          setStep(2); // Apenas avança para o próximo passo
        }
      } else {
        console.error("grecaptcha não está definido.");
      }
    } catch (error) {
      console.error("Erro ao validar email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isEmailValid = await validateEmail(formData.email, setErrors, t);
      if (isEmailValid) {
        setStep(2);
      }
    } else if (step === 2) {
      if (formData.password === formData.confirmPassword) {
        setStep(3);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: t("passwordMismatch"),
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await validatePhone(formData.phone, setErrors, t)) {
      console.log("Form Submitted:", formData);
    }
  };

  // ----------------------------- Website Logic -----------------------------
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
        {t("register")}
      </Typography>

      {step === 1 && (
        <>
          <TextField
            label={t("email")}
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            error={!!errors.email}
            helperText={errors.email}
          />
          <LoadingButton
            loading={loading}
            loadingIndicator={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  size={16}
                  color="inherit"
                  style={{ marginRight: 8 }}
                />
                {t("verify")}
              </div>
            }
            variant="contained"
            color="primary"
            onClick={handleLoadClick}
            disabled={loading}
          >
            {t("next")}
          </LoadingButton>
        </>
      )}

      {step === 2 && (
        <>
          <TextField
            label={t("password")}
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            type="password"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label={t("confirmPassword")}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            type="password"
            error={formData.password !== formData.confirmPassword}
            helperText={
              formData.password !== formData.confirmPassword
                ? t("passwordMismatch")
                : ""
            }
          />
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            disabled={formData.password !== formData.confirmPassword}
          >
            {t("next")}
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField
            label={t("phoneOptional")}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <Button type="submit" variant="contained" color="primary">
            {t("register")}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Register;
