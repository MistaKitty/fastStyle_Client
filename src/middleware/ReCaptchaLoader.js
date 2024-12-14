import ReCaptchaV3 from "./reCaptcha";
import axios from "axios";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const reCaptcha = new ReCaptchaV3(siteKey);

export const initializeReCaptcha = async () => {
  try {
    await reCaptcha.loadScript();
    console.log("reCAPTCHA script loaded successfully.");

    const token = await reCaptcha.execute("page_load");

    const response = await axios.post("/api/validate-recaptcha", {
      token,
      action: "page_load",
    });

    if (response.data.success) {
      console.log("reCAPTCHA validation successful.");
    } else {
      console.log("reCAPTCHA validation failed.");
    }
  } catch (error) {
    console.error("Error loading or validating reCAPTCHA:", error);
  }
};
