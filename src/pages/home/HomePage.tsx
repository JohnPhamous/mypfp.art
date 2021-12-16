import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import NFTPicker from "../../components/NFTPicker";
import { EtherError } from "../../types/Ethereum";
import { hasEthereum } from "../../util/ethereum";

const HomePage = () => {
  const [connectedWalletAddress, setConnectedWalletAddress] = useState("");
  const [walletError, setWalletError] = useState<null | EtherError>(null);
  const [loadingWallet, setLoadingWallet] = useState(false);

  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddress("");
      setWalletError({
        code: -1,
        message: "We can't find a wallet on your system.",
      });
      return;
    }
    async function getConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddress(signerAddress);
      } catch (e) {
        if ((e as any).code !== "UNSUPPORTED_OPERATION") {
          setWalletError(e as EtherError);
          setConnectedWalletAddress("");
        }
        return;
      }
    }

    if (!loadingWallet) {
      getConnectedWalletAddress();
    }
  }, [loadingWallet]);

  // Request access to MetaMask account
  async function requestAccessToWallet() {
    setLoadingWallet(true);
    if (window?.ethereum?.request) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (e) {
        setWalletError(e as EtherError);
      }
    }
    setLoadingWallet(false);
  }

  return (
    <div>
      <h2>MyPFP.art</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
        voluptatibus accusamus laborum pariatur ducimus! Tenetur, illum tempore.
        Qui, mollitia? Laudantium sit numquam sequi ipsa eligendi odio maxime,
        ut quia perspiciatis?
      </p>
      {walletError && (
        <div>
          <h3>{walletError.code}</h3>
          <p>{walletError.message}</p>
        </div>
      )}

      <button onClick={requestAccessToWallet}>Connect</button>

      {connectedWalletAddress && (
        <>
          <h4>Your Wallet Address</h4>
          <p>{connectedWalletAddress}</p>
          <NFTPicker walletAddress={connectedWalletAddress} />
        </>
      )}
    </div>
  );
};

export default HomePage;
