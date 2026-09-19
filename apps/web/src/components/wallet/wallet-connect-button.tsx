/**
 * @file apps/web/src/components/wallet/wallet-connect-button.tsx
 * @description Layer 1: Presentation - Solana Wallet Connection Trigger.
 * Connects to wallet modal and renders connected address status.
 */

"use client";

import React from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useSolanaWallet } from "@/lib/hooks/use-solana-wallet";
import { Button } from "../ui/button";

export function WalletConnectButton() {
  const { visible, setVisible } = useWalletModal();
  const { connected, connecting, formattedAddress, disconnect } = useSolanaWallet();

  // Step 1: If connected, render address pill with disconnect action
  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 rounded-sm border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-mono text-white">
          <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse inline-block" />
          {formattedAddress}
        </span>
        <Button variant="outline" size="sm" onClick={() => void disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  // Step 2: Otherwise, render connect wallet trigger
  return (
    <Button
      variant="primary"
      size="md"
      disabled={connecting}
      onClick={() => setVisible(!visible)}
    >
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
