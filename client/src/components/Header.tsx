import * as React from "react";
import styled from "styled-components";
import Blockie from "./Blockie";
import { ellipseAddress } from "../helpers/utilities";
import { transitions } from "../styles";
import useConnect from "src/hooks/useConnect";
import SnapChain from "./SnapChain";

const SHeader = styled.div`
  margin-bottom: 40px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-image: url(src/assets/Snapchain_Background.png);
`;

const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;

const SBlockie = styled(Blockie)`
  margin-right: 10px;
`;

const SSnapChainTitle = styled.h1`
  font-family: "Baunk";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
  text-transform: uppercase;
  color: #fefefe;
`;

interface IHeaderStyle {
  connected: boolean;
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  color: white;
  margin: ${({ connected }) => (connected ? "-2px auto 0.7em" : "0")};
`;

const SDisconnect = styled.div<IHeaderStyle>`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  color: white;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? "visible" : "hidden")};
  pointer-events: ${({ connected }) => (connected ? "auto" : "none")};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;

const Header = () => {
  const { address, connected, resetApp } = useConnect();
  return (
    <SHeader>
      <SnapChain />
      {address && (
        <SActiveAccount>
          <SBlockie address={address} />
          <SAddress connected={connected}>{ellipseAddress(address)}</SAddress>
          <SDisconnect connected={connected} onClick={resetApp}>
            {"Disconnect"}
          </SDisconnect>
        </SActiveAccount>
      )}
    </SHeader>
  );
};

export default Header;
