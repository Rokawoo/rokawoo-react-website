export const greetAgent = (): [string, string | null] => {
    const now = new Date();
    const userAgent = detectUserAgent();
    const isUnknownAgent = userAgent === "UNKNΘWN USΣR";
    
    const hours = (now.getHours() % 12 || 12);
    const meridiem = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = `${now.getMonth() + 1}/${now.getDate()}`;
    const formattedMinutes = now.getMinutes().toString().padStart(2, '0');

    const browserImage = isUnknownAgent? null : getBrowserImage(userAgent);

    return [`DispΔtcth ${userAgent} - ${formattedDate}, ${hours}:${formattedMinutes} ${meridiem}`, browserImage];
};

const detectUserAgent = (): string => {
    const userAgentMatch = navigator.userAgent.match(/(Mozilla\/[\d.]+ \(\S+\)|Chrome\/[\d.]+|Edg\/[\d.]+|Firefox\/[\d.]+)/);
    if (!userAgentMatch) return "UNKNΘWN USΣR";

    let userAgent = userAgentMatch[0].replace(/\/[\d.]+$/, '').replace(/(Mozilla|Firefox)\/|\s+\(.*?\)/g, '');
    if (userAgent === "Chrome" && navigator.userAgent.includes("Edg")) {
        userAgent = "Edge";
    }
    return userAgent;
};

import { getAssetUrl } from "../../../utils";

const getBrowserImage = (userAgent: string): string => {
    return getAssetUrl(`nav/${userAgent.toLowerCase()}.webp`);
};
