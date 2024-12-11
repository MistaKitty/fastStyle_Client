class ReCaptchaV3 {
  constructor(siteKey) {
    if (!siteKey) throw new Error("siteKey is required.");
    this.siteKey = siteKey;
    this.scriptLoaded = false;
  }

  async loadScript() {
    if (this.scriptLoaded) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${this.siteKey}`;
    script.async = true;
    document.body.appendChild(script);

    await new Promise((resolve, reject) => {
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () =>
        reject(new Error("Failed to load reCAPTCHA script."));
    });
  }

  async execute(action) {
    if (!action) throw new Error("Action is required.");
    await this.loadScript();

    await new Promise((resolve) => window.grecaptcha.enterprise.ready(resolve));

    try {
      const token = await window.grecaptcha.enterprise.execute(this.siteKey, {
        action,
      });
      if (!token) throw new Error("Token generation failed.");
      return token;
    } catch (error) {
      throw new Error(`Error during reCAPTCHA execution: ${error.message}`);
    }
  }
}

export default ReCaptchaV3;
