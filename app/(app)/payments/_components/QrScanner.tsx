"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { X, ShieldAlert } from "lucide-react";

interface QrScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

export default function QrScanner({ onScan, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator?.mediaDevices?.getUserMedia) {
      setError(
        "L'accès à la caméra nécessite une connexion sécurisée (HTTPS). Veuillez accéder à l'application via HTTPS."
      );
      return;
    }

    const reader = new BrowserMultiFormatReader();
    let stopped = false;

    reader
      .decodeFromConstraints(
        { video: { facingMode: { ideal: "environment" } } },
        videoRef.current!,
        (result, _err, controls) => {
          controlsRef.current = controls;
          if (result && !stopped) {
            stopped = true;
            controls.stop();
            onScan(result.getText());
          }
        }
      )
      .catch((err) => {
        if (!stopped) {
          setError(
            err?.name === "NotAllowedError"
              ? "Accès à la caméra refusé. Veuillez autoriser l'accès dans les paramètres."
              : "Impossible d'accéder à la caméra."
          );
        }
      });

    return () => {
      stopped = true;
      controlsRef.current?.stop();
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
            <ShieldAlert className="size-10 text-white/60" />
            <p className="text-white text-sm leading-relaxed">{error}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative size-56 rounded-md border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
            </div>
            <p className="absolute bottom-8 left-0 right-0 text-white text-sm font-medium text-center">
              Placez le QR code dans le cadre
            </p>
          </>
        )}
      </div>
      <div className="p-8 flex justify-center bg-black">
        <button
          onClick={onClose}
          className="flex items-center justify-center size-12 rounded-full bg-white/10 text-white"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}
