import ReCaptchaV3 from "./reCaptcha";

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const reCaptcha = new ReCaptchaV3(siteKey);

export const initializeReCaptcha = async () => {
  try {
    await reCaptcha.loadScript();
    console.log("reCAPTCHA script loaded successfully.");
  } catch (error) {
    console.error("Error loading reCAPTCHA script:", error);
  }
};
