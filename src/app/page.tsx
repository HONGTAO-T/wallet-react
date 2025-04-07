"use client";

import { useState } from "react";
import Web3Modal from "web3modal";
// import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers"; 
// import Image from "next/image";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
      });

      const instance = await web3Modal.connect();

      const provider = new Web3Provider(instance);

      const signer = provider.getSigner();

      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Wallet connection failed:::", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connect MY Wallet</h1>
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-yellow-500 text-white rounded"
      >
        Connect Wallet
      </button>
      {walletAddress && (
        <p className="mt-4 text-lg">Connected Wallet Address: {walletAddress}</p>
      )}
    </div>
  );
}
