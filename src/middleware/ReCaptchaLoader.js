import ReCaptchaV3 from "./reCaptcha";
import axios from "axios";

const getApiBaseUrl = () => {
  const isRemote = import.meta.env.VITE_REMOTE === "true";
  return isRemote
    ? import.meta.env.VITE_APIREMOTE
    : import.meta.env.VITE_APILOCAL;
};

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const apiBaseUrl = getApiBaseUrl();
const reCaptcha = new ReCaptchaV3(siteKey);

export const initializeReCaptcha = async () => {
  try {
    console.log("Initializing reCAPTCHA with site key:", siteKey);
    console.log("API Base URL:", apiBaseUrl);

    await reCaptcha.loadScript();
    console.log("reCAPTCHA script loaded successfully.");

    const token = await reCaptcha.execute("page_load");
    console.log("Generated reCAPTCHA token:", token);

    // Log API request payload
    const requestData = { token, action: "page_load" };
    console.log("Sending reCAPTCHA token to API:", requestData);

    const response = await axios.post(
      `${apiBaseUrl}/api/validate-recaptcha`,
      requestData
    );

    console.log("API response:", response.data);

    if (response.data.success) {
      console.log("reCAPTCHA validation successful.");
    } else {
      console.error("reCAPTCHA validation failed:", response.data);
    }
  } catch (error) {
    console.error("Error during reCAPTCHA process:", error.message);
  }
};
