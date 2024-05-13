export const greetAgent = (): string => {
    const now = new Date();
    const userAgentMatch = navigator.userAgent.match(/(?:Mozilla\/[\d.]+ \(\S+\)|Chrome\/[\d.]+|Edg\/[\d.]+|Firefox\/[\d.]+)/);
    let userAgent = userAgentMatch ? userAgentMatch[0].replace(/\/[\d.]+$/, '').replace(/(Mozilla|Firefox)\/|\s+\(.*?\)/g, '') : "UNKNΘWN USΣR";
    
    if (userAgent === "Chrome" && navigator.userAgent.includes("Edg")) {
        userAgent = "Edge";
    }
    
    const hours = (now.getHours() % 12 || 12).toString();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    const formattedDate = now.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
    const formattedMinutes = now.getMinutes().toString().padStart(2, '0');
    
    return `DispΔtcth ${userAgent} - ${formattedDate}, ${hours}:${formattedMinutes} ${ampm}`;
};
