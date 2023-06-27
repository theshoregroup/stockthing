"use client";

import { Html5Qrcode } from "html5-qrcode";

export default function Scanner() {
  const cam = Html5Qrcode.getCameras().then((devices) => {
    if (devices && devices.length > 0) {
      const cameraId = devices[0]?.id;
      if (!cameraId) {
        return;
      }
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCode.start(
        cameraId,
        {
          fps: 10,
          qrbox: 250,
        },
        (qrCode) => {
          console.log(qrCode);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
    }
  });

  return <div id="reader" className="w-full"></div>;
}
