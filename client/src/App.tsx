import * as React from "react";

// @ts-ignore
import Column from "./components/Column";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ChainList from "./components/ChainList";

import DepositButton from "./components/DepositButton";
import useConnect from "./hooks/useConnect";
import { SLayout, SSubHeader, STitle, SContent, SContainer, SLanding } from "./App.styles";

const App = () => {
  const { fetching, address, connected, chainId, resetApp, onConnect } = useConnect();

  return (
    <SLayout>
      <Column maxWidth={1400} spanHeight>
        <Header connected={connected} address={address} chainId={chainId} killSession={resetApp} />
        <SSubHeader>
          <STitle>Chains</STitle>
          <DepositButton />
        </SSubHeader>

        <SContent>
          {fetching ? (
            <Column center>
              <SContainer>
                <Loader />
              </SContainer>
            </Column>
          ) : (
            <SLanding center>
              <ChainList connected={connected} onConnect={onConnect} />
            </SLanding>
          )}
        </SContent>
      </Column>
    </SLayout>
  );
};
export default App;
