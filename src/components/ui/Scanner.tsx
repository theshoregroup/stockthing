"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function Scanner() {
  const [activeCamera, setActiveCamera] = useState<string>("");
  let html5QrCode: any;
  let qrcodeId = "qr-code-scanner";
  useEffect(() => {
    // Anything in here is fired on component mount.
    if (!html5QrCode?.getState()) {
      html5QrCode = new Html5Qrcode(qrcodeId);
      const qrCodeSuccessCallback = (
        decodedText: string,
        decodedResult: string
      ) => {
        /* handle success */
        console.log(`QR Code detected: ${decodedText}`);
      };
      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      };

      // If you want to prefer back camera
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );
    }

    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  return <div id={qrcodeId} className="w-full"></div>;
}
