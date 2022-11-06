import * as React from "react";
import { useState } from "react";

import { Contract, ethers } from "ethers";
import { SNAPCHAINABI as snapchainabi } from "./abi/ERC20ABI";

import { signERC2612Permit } from "eth-permit-ethers";

// @ts-ignore
import Column from "./components/Column";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ChainList from "./components/ChainList";

import useConnect from "./hooks/useConnect";
import {
  SLayout,
  SSubHeader,
  STitle,
  SContent,
  SContainer,
  SLanding,
} from "./App.styles";
import CreateModal from "./components/CreateModal";
import ConnectButton from "./components/ConnectButton";
import CreateButton from "./components/CreateButton";
import {
  TransactionReceipt,
  TransactionResponse,
} from "@ethersproject/providers";
import { EHOSTUNREACH } from "constants";
import { getContractAddress } from "@ethersproject/address";

const App = () => {
  const {
    fetching,
    address,
    connected,
    chainId,
    resetApp,
    onConnect,
  } = useConnect();

  const snaptokenAddressContract = "0x15a8230EBad975689D01F9Dca62118990979a15e";
  const snapchainAddressContract = "0xAEF3829058a5c2A4F5e3c1c2BE7D84D5a86A567c";
  const privateKey =
    "83538b23ba561dae134818fa16ea939f84f80970f435414e0c967647a24a54af"; // LOOOOL

  const [isCreateOpen, setCreateOpen] = useState<boolean>(false);

  const showCreateModal = () => {
    console.log("show create modal", isCreateOpen);
    setCreateOpen(!isCreateOpen);
  };

  async function createChain(tty: number) {
    if (!window.ethereum) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const snapErc20: Contract = new ethers.Contract(
      snaptokenAddressContract,
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      signer
    );

    await snapErc20.approve(
      snapchainAddressContract,
      ethers.constants.MaxUint256
    );

    // const payload = ethers.utils.solidityKeccak256(
    //   ["bytes2", "bytes32", "bytes32"],
    //   [
    //     "0x1901",
    //     snapDomainSeparator,
    //     ethers.utils.keccak256(
    //       ethers.utils.defaultAbiCoder.encode(
    //         ["uint256", "address", "address", "uint256", "uint256", "uint256"],
    //         [
    //           ethers.utils.id(
    //             "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
    //           ),
    //           signer.getAddress(),
    //           addressContract,
    //           ethers.constants.MaxUint256,
    //           nonce,
    //           Math.floor(Date.now() / 1000) + 60 * 60,
    //         ]
    //       )
    //     ),
    //   ]
    // );

    // const snapDomainSeparator = await snapErc20.DOMAIN_SEPARATER();
    // const ethWallet = new ethers.Wallet(privateKey, provider);

    // const result = await signERC2612Permit(
    //   ethWallet,
    //   snaptokenAddressContract,
    //   await signer.getAddress(),
    //   snapchainAddressContract,
    //   ethers.constants.MaxUint256.toString(),
    //   Math.floor(Date.now() / 1000) + 60 * 60,
    //   nonce
    // );

    const snapChain: Contract = new ethers.Contract(
      snapchainAddressContract,
      snapchainabi,
      signer
    );

    // const { v, r, s } = await snapChain.splitSignature(result);

    snapChain
      .deposit(tty)
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`);
        tr.wait().then((receipt: TransactionReceipt) => {
          console.log("creation receipt", receipt);
        });
      })
      .catch((e: Error) => console.log(e));
  }

  const handleOnSubmit = (
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    networkName: string,
    currency: string
  ) => {
    console.log("values", days, hours, minutes, seconds, networkName, currency);
    const tty = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    createChain(tty);
  };

  return (
    <>
      <SLayout>
        <Column maxWidth={1400} spanHeight>
          <Header
            connected={connected}
            address={address}
            chainId={chainId}
            killSession={resetApp}
          />
          <SSubHeader>
            <STitle>Chains</STitle>
            {connected && <CreateButton onClick={showCreateModal} />}
          </SSubHeader>

          <SContent>
            {fetching ? (
              <Column center>
                <SContainer>
                  <Loader />
                </SContainer>
              </Column>
            ) : (
              <SLanding>
                {!connected && <ConnectButton onClick={onConnect} />}
                {connected && <ChainList />}
                <CreateModal
                  isCreateOpen={isCreateOpen}
                  showCreateModal={showCreateModal}
                  handleOnSubmit={handleOnSubmit}
                />
              </SLanding>
            )}
          </SContent>
        </Column>
      </SLayout>
    </>
  );
};
export default App;
