import * as React from "react";
import { createRoot } from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";

import App from "./App";
import { globalStyle } from "./styles";

import "antd/dist/antd.css";

import "./global.css";

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

// @ts-ignore
declare global {
  // tslint:disable-next-line
  interface Window {
    web3: any;
    ethereum: any;
    Web3Modal: any;
    Box: any;
    box: any;
    space: any;
  }
}

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript
root.render(
  <>
    <GlobalStyle />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);
