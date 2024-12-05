class ReCaptchaV3 {
  constructor(siteKey) {
    if (!siteKey) {
      throw new Error("siteKey is required for reCAPTCHA.");
    }
    this.siteKey = siteKey;
    this.scriptLoaded = false;
  }

  async loadScript() {
    if (this.scriptLoaded) return;
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${this.siteKey}`;
      script.async = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = () =>
        reject(new Error("Failed to load reCAPTCHA script."));
      document.body.appendChild(script);
    });
  }

  async execute(action) {
    if (!action) {
      throw new Error("Action is required to execute reCAPTCHA.");
    }

    await this.loadScript();
    return new Promise((resolve, reject) => {
      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(this.siteKey, { action })
          .then((token) => resolve(token))
          .catch((error) => reject(error));
      });
    });
  }
}

export default ReCaptchaV3;
