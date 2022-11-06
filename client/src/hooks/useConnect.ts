import { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { getChainData } from "../helpers/utilities";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal: Web3Modal;
export default function useConnect() {
  // const [connected, setConnected] = useState(false);
  // const [connecting, setConnecting] = useState(false);

  // const connect = useCallback(async () => {
  //   setConnecting(true);
  //   try {
  //     await window.ethereum.enable();
  //     setConnected(true);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setConnecting(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     setConnected(true);
  //   }
  // }, []);

  // return { connected, connecting, connect };
  const [provider, setProvider] = useState<any>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [library, setLibrary] = useState<any>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(1);

  useEffect(() => {
    createWeb3Modal();

    if (web3Modal.cachedProvider) {
      onConnect();
    }
  }, []);

  function createWeb3Modal() {
    web3Modal = new Web3Modal({
      network: getNetwork(),
      cacheProvider: true,
      providerOptions: getProviderOptions(),
    });
  }

  const onConnect = async () => {
    const provider = await web3Modal.connect();
    setProvider(provider);

    const library = new Web3Provider(provider);

    const network = await library.getNetwork();

    const address = provider.selectedAddress ? provider.selectedAddress : provider?.accounts[0];
    setLibrary(library);
    setChainId(network.chainId);
    setAddress(address);
    setConnected(true);

    await subscribeToProviderEvents(provider);
  };

  const subscribeToProviderEvents = async (provider: any) => {
    if (!provider.on) {
      return;
    }

    provider.on("accountsChanged", changedAccount);
    provider.on("networkChanged", networkChanged);
    provider.on("close", resetApp);

    await web3Modal.off("accountsChanged");
  };

  const unSubscribe = async (provider: any) => {
    // Workaround for metamask widget > 9.0.3 (provider.off is undefined);
    window.location.reload();
    if (!provider.off) {
      return;
    }

    provider.off("accountsChanged", changedAccount);
    provider.off("networkChanged", networkChanged);
    provider.off("close", resetApp);
  };

  const changedAccount = async (accounts: string[]) => {
    if (!accounts.length) {
      // Metamask Lock fire an empty accounts array
      await resetApp();
    } else {
      setAddress(accounts[0]);
    }
  };

  const networkChanged = async (networkId: number) => {
    const library = new Web3Provider(provider);
    const network = await library.getNetwork();
    const chainId = network.chainId;
    setChainId(chainId);
    setLibrary(library);
  };

  function getNetwork() {
    return getChainData(chainId).network;
  }

  function getProviderOptions() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
    };
    return providerOptions;
  }

  const resetApp = async () => {
    await web3Modal.clearCachedProvider();
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    await unSubscribe(provider);
  };

  const resetState = () => {
    setFetching(false);
    setAddress("");
    setLibrary(null);
    setConnected(false);
    setChainId(1);
  };

  return { provider, fetching, address, library, connected, chainId, resetApp, resetState, onConnect };
}