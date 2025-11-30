export function getDeviceInfo() {
  const ua = navigator.userAgent;

  // Detectar OS
  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS/i.test(ua)) os = "MacOS";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";

  // Detectar navegador
  let browser = "Unknown";
  if (/Chrome/i.test(ua)) browser = "Chrome";
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  if (/Firefox/i.test(ua)) browser = "Firefox";
  if (/Edg/i.test(ua)) browser = "Edge";

  // Detectar tipo de dispositivo
  let deviceType = "desktop";
  if (/Mobi|Android/i.test(ua)) deviceType = "mobile";
  if (/Tablet|iPad/i.test(ua)) deviceType = "tablet";

  // Nombre amigable
  let deviceName = "Unknown Device";
  if (deviceType === "mobile") {
    if (/iPhone/i.test(ua)) deviceName = "iPhone";
    else if (/Android/i.test(ua)) deviceName = "Android Phone";
  } else if (deviceType === "tablet") {
    if (/iPad/i.test(ua)) deviceName = "iPad";
    else if (/Android/i.test(ua)) deviceName = "Android Tablet";
  } else {
    deviceName = `${os} Computer`;
  }

  return {
    deviceName,
    deviceType,
    os,
    browser,
  };
}
