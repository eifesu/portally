"use client";

import { useState, useCallback } from "react";
import { PinVerificationDialog } from "./verify-action";

interface UseVerifyActionReturn {
  /**
   * Triggers the PIN verification dialog.
   * Returns a promise that resolves to true if verified, false otherwise.
   */
  verifyAction: () => Promise<boolean>;

  /**
   * PIN verification dialog component. Must be rendered in the component tree.
   */
  PinDialog: React.ComponentType;
}

/**
 * Hook for verifying user actions with PIN.
 *
 * Usage:
 * ```tsx
 * const { verifyAction, PinDialog } = useVerifyAction();
 *
 * async function handleAction() {
 *   const verified = await verifyAction();
 *   if (verified) {
 *     // Proceed with action
 *   }
 * }
 *
 * return (
 *   <>
 *     <button onClick={handleAction}>Do something</button>
 *     <PinDialog />
 *   </>
 * );
 * ```
 */
export function useVerifyAction(): UseVerifyActionReturn {
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [pinResolver, setPinResolver] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const verifyAction = useCallback(async (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setPinResolver({ resolve });
      setShowPinDialog(true);
    });
  }, []);

  const handlePinVerified = useCallback(() => {
    if (pinResolver) {
      pinResolver.resolve(true);
      setPinResolver(null);
    }
  }, [pinResolver]);

  const handlePinDialogClose = useCallback(
    (open: boolean) => {
      setShowPinDialog(open);
      if (!open && pinResolver) {
        // Dialog closed without verification
        pinResolver.resolve(false);
        setPinResolver(null);
      }
    },
    [pinResolver]
  );

  const PinDialog = useCallback(
    () => (
      <PinVerificationDialog
        open={showPinDialog}
        onOpenChange={handlePinDialogClose}
        onVerified={handlePinVerified}
      />
    ),
    [showPinDialog, handlePinDialogClose, handlePinVerified]
  );

  return {
    verifyAction,
    PinDialog,
  };
}
