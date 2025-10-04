"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRole } from "./role-context";
import { DAppKitUI } from "@vechain/dapp-kit-ui";

export function SiteHeader() {
  const [connected, setConnected] = useState(false);
  const { role, setRole } = useRole();
  const [address, setAddress] = useState("");
  const [wallet, setWallet] = useState(null);

  // Initialize DAppKit only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dappKit = DAppKitUI.configure({
        node: "https://testnet.vechain.org/", // or mainnet URL
        allowedWallets: ["veworld"],
        usePersistence: true,
      });

      dappKit.wallet.setSource("veworld");
      setWallet(dappKit.wallet);
    }
  }, []);

  // Function to connect to VeWorld
  async function connectVeWorld() {
    if (!wallet) {
      alert("Wallet not initialized yet.");
      return;
    }

    const res = await wallet.connect();
    if (res) {
      console.log(res);
      setConnected(true);
      setAddress(res.account);
      alert(`Connected: ${res.account}`);
    } else {
      alert("Connection failed");
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-primary" aria-hidden />
          <span className="font-semibold">VeCarbon Market</span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 text-sm"
        >
          <Link className="hover:opacity-80" href="/marketplace">
            Marketplace
          </Link>
          {role === "seller" && (
            <Link className="hover:opacity-80" href="/sell/list-project">
              List Project
            </Link>
          )}
          <Link className="hover:opacity-80" href="/#how-it-works">
            How it works
          </Link>
          <a
            className="hover:opacity-80"
            href="https://vechain.org"
            target="_blank"
            rel="noreferrer"
          >
            VeChain
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 text-xs">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRole("buyer")}
              aria-pressed={role === "buyer"}
            >
              Buyer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRole("seller")}
              aria-pressed={role === "seller"}
            >
              Seller
            </Button>
          </div>

          {!connected ? (
            <Button
              onClick={connectVeWorld}
              className="bg-accent text-accent-foreground hover:opacity-90"
              disabled={!wallet}
            >
              Connect VeWorld
            </Button>
          ) : (
            <Button variant="outline">
              {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
