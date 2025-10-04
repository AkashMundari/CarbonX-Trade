// app/providers/VeChainKitProvider.js
"use client";
import dynamic from "next/dynamic";

const VeChainKitProvider = dynamic(
  async () => (await import("@vechain/vechain-kit")).VeChainKitProvider,
  { ssr: false }
);

export function Providers({ children }) {
  return (
    <VeChainKitProvider
      network={{ type: "test" }}
      feeDelegation={{
        delegatorUrl: "https://sponsor-testnet.vechain.energy/by/441",
        delegateAllTransactions: false,
      }}
      loginMethods={[
        { method: "vechain", gridColumn: 4 },
        { method: "dappkit", gridColumn: 4 },
      ]}
      dappKit={{
        allowedWallets: ["veworld", "wallet-connect", "sync2"],
        walletConnectOptions: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
          metadata: {
            name: "Your DApp Name",
            description: "Your DApp description visible in wallets",
            url: typeof window !== "undefined" ? window.location.origin : "",
            icons: ["https://your-domain.com/logo.png"],
          },
        },
      }}
      darkMode={false}
      language="en"
      allowCustomTokens={false}
      loginModalUI={{
        logo: "/your-logo.png",
        description: "Welcome to our DApp",
      }}
    >
      {children}
    </VeChainKitProvider>
  );
}
