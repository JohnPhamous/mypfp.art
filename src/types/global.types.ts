import { ExternalProvider } from "@ethersproject/providers/src.ts/web3-provider";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}
