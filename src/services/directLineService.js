// src/services/directLineService.js
import { DirectLine } from "botframework-directlinejs";

const DIRECT_LINE_SECRET =
  "2fh1GbX8Jmw3ei9uGYsDCvHOJiK3b6X84wzv5foVoiHNBSSaIrNvJQQJ99BFAC5T7U2AArohAAABAZBS15yP.5haTOOQhsHBDXb29QuJEuSKYRX3u1tbmTU6CSlql0JoLArjTfKjgJQQJ99BFACYeBjFAArohAAABAZBS2Gwu";

class DirectLineService {
  constructor() {
    this.directLine = null;
    this.refreshTimer = null;
    this.activityHandlers = new Set();
  }

  onActivity(handler) {
    this.activityHandlers.add(handler);
    return () => this.activityHandlers.delete(handler);
  }

  async fetchToken() {
    const res = await fetch(
      "https://directline.botframework.com/v3/directline/tokens/generate",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${DIRECT_LINE_SECRET}` },
      }
    );
    if (!res.ok) throw new Error("Error generando token");
    const { token, expires_in } = await res.json();
    return { token, expires_in };
  }

  setupDirectLine(token) {
    this.directLine?.end();

    // Solo pasamos el token: DirectLine.js crea una nueva conversación
    this.directLine = new DirectLine({ token });

    this.directLine.activity$.subscribe((activity) => {
      this.activityHandlers.forEach((h) => h(activity));
    });
  }

  async init() {
    const { token, expires_in } = await this.fetchToken();
    this.setupDirectLine(token);

    const ms = (expires_in - 60) * 1000;
    this.refreshTimer = setTimeout(() => this.init(), ms);
  }

  postActivity(activity) {
    return this.directLine?.postActivity(activity);
  }

  dispose() {
    clearTimeout(this.refreshTimer);
    this.directLine?.end();
    this.activityHandlers.clear();
  }
}

export default new DirectLineService();
