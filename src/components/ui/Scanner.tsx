"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { CameraIcon, Search } from "lucide-react";
import { cn } from "~/lib/utils";
import { Transition } from "@headlessui/react";

export default function Scanner() {
  const [currentTextInput, setTextInput] = useState<string>("");
  const [foundValue, setFoundValue] = useState<string | null>(null);
  const router = useRouter();
  let html5QrCode: any;
  let qrcodeId = "qr-code-scanner";

  async function handleCodeInput(code: string) {
    console.log(code);
    router.push(`/product/${code}`);
  }

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
        setFoundValue(decodedText);
      };
      const config = {
        fps: 10,
        // qrbox: { width: 250, height: 250 },
        focusMode: "continuous",
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true,
        },
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
  }, [handleCodeInput, foundValue]);

  return (
    <>
      <div id={qrcodeId} className="h-96 overflow-hidden">
        <CameraIcon className="h-10 w-10 animate-pulse" />
      </div>
      <div className="-mt-4 flex items-center justify-between rounded-b-xl bg-gradient-to-tr from-slate-500 via-gray-500 to-slate-500 p-3 text-white">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute h-6 w-6 animate-ping" />
            <Search className="h-6 w-6" />
          </div>
          <h4
            className={cn(
              foundValue ? null : "animate-pulse",
              "truncate font-medium"
            )}
          >
            {foundValue ? `Found: ${foundValue}` : "Searching"}
          </h4>
        </div>
        <Transition show={foundValue !== null}>
          <DialogClose>
            <Button
              variant={"secondary"}
              onClick={() => handleCodeInput(foundValue!)}
            >
              Go
            </Button>
          </DialogClose>
        </Transition>
      </div>
      <div>
        <Label>Not working?</Label>
        <div className="flex w-full items-center gap-2">
          <Input
            type="number"
            autoFocus={false}
            value={currentTextInput}
            onChange={(e) => setTextInput(e.target.value)}
            maxLength={15}
            inputMode="numeric"
          />
          <DialogClose>
            <Button onClick={() => handleCodeInput(currentTextInput)}>
              Go
            </Button>
          </DialogClose>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Input the EAN code on the reverse of the item to quickly locate it.
        </p>
      </div>
    </>
  );
}
