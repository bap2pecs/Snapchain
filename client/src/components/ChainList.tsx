import React from "react";
import ConnectButton from "./ConnectButton";

export default function ChainList({ connected, onConnect }: { connected: boolean; onConnect: () => void }) {
  return (
    <div>
      <h1>ChainList</h1>
      {!connected && <ConnectButton onClick={onConnect} />}
    </div>
  );
}
