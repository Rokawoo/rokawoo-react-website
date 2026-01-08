import { getAssetUrl } from "../../../utils";

const UNKNOWN_AGENT = "UNKNΘWN USΣR";

const detectUserAgent = (): string => {
    const ua = navigator.userAgent;

    // Check Edge first (contains both Chrome and Edg)
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("Chrome/")) return "Chrome";
    if (ua.includes("Firefox/")) return "Firefox";

    return UNKNOWN_AGENT;
};

export const greetAgent = (): [string, string | null] => {
    const now = new Date();
    const userAgent = detectUserAgent();

    const hours = now.getHours();
    const h12 = hours % 12 || 12;
    const meridiem = hours >= 12 ? "PM" : "AM";
    const mins = now.getMinutes().toString().padStart(2, "0");
    const date = `${now.getMonth() + 1}/${now.getDate()}`;

    const browserImage = userAgent === UNKNOWN_AGENT
        ? null
        : getAssetUrl(`nav/${userAgent.toLowerCase()}.webp`);

    return [`DispΔtcth ${userAgent} - ${date}, ${h12}:${mins} ${meridiem}`, browserImage];
};