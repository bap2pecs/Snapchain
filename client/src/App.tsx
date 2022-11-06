import * as React from "react";
import { useState } from "react";

// @ts-ignore
import Column from "./components/Column";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ChainList from "./components/ChainList";

import useConnect from "./hooks/useConnect";
import { SLayout, SSubHeader, STitle, SContent, SContainer, SLanding } from "./App.styles";
import CreateModal from "./components/CreateModal";
import ConnectButton from "./components/ConnectButton";
import CreateButton from "./components/CreateButton";

const App = () => {
  const { fetching, address, connected, chainId, resetApp, onConnect } = useConnect();

  const [isCreateOpen, setCreateOpen] = useState<boolean>(false);

  const showCreateModal = () => {
    console.log("show create modal", isCreateOpen);
    setCreateOpen(!isCreateOpen);
  };

  return (
    <>
      <SLayout>
        <Column maxWidth={1400} spanHeight>
          <Header connected={connected} address={address} chainId={chainId} killSession={resetApp} />
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
              </SLanding>
            )}
          </SContent>
        </Column>
      </SLayout>

      <CreateModal isCreateOpen={isCreateOpen} showCreateModal={showCreateModal} />
    </>
  );
};
export default App;
