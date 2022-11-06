import { useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { getChainData } from "../helpers/utilities";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useRecoilState } from "recoil";
import { addressState, chainIdState, connectedState, fetchingState, libraryState, providerState } from "src/state/provider";

let web3Modal: Web3Modal;
export default function useConnect() {
  const [provider, setProvider] = useRecoilState(providerState);
  const [connected, setConnected] = useRecoilState(connectedState);
  const [fetching, setFetching] = useRecoilState(fetchingState);
  const [address, setAddress] = useRecoilState(addressState);
  const [library, setLibrary] = useRecoilState(libraryState);
  const [chainId, setChainId] = useRecoilState(chainIdState);

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
    setProvider((old: Record<string, any>) => {
      if (!old) {
        return provider;
      }
      return Object.keys(provider).reduce((acc: Record<string, any>, key: string) => {
        if (typeof provider[key] !== "function") {
          acc[key] = provider[key];
        }
        return acc;
      }, old);
    });

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