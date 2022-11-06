import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import texture from "../assets/texture.png";
import styled from "styled-components";

const value: React.CSSProperties = {
  fontFamily: "Martian Mono",
  fontWeight: 700,
};
const gridSpace: React.CSSProperties = {
  padding: "5px 0",
};
const leftColumn: React.CSSProperties = {
  width: "60%",
  textAlign: "left",
  boxShadow: "none",
  ...gridSpace,
};
const rightColumn: React.CSSProperties = {
  width: "40%",
  textAlign: "right",
  boxShadow: "none",
  alignSelf: "end",
  ...gridSpace,
  ...value,
};
const textureBG: React.CSSProperties = {
  backgroundImage: `url(${texture})`,
  backgroundColor: "rgba(45, 45, 45, .9)",
  WebkitBackdropFilter: "blur(10px)",
  borderBottom: "none",
};
const cardStyle = (status: Status): React.CSSProperties => ({
  ...textureBG,
  color: status === Status.Destroyed ? "#5f5f5f" : "#FEFEFE",
  width: 308,
});
const headStyle: React.CSSProperties = {
  borderRadius: "8px 8px 0 0",
  fontSize: 24,
  fontWeight: 700,
};
const bodyStyle: React.CSSProperties = {
  borderRadius: "0 0 8px 8px",
  fontSize: 14,
  fontWeight: 300,
  padding: "0 24px 24px",
};
const rpcUrl: React.CSSProperties = {
  ...value,
  overflowWrap: "break-word",
  width: 250,
};
const statusDot = (status: Status): React.CSSProperties => ({
  backgroundColor: StatusColor[status],
  borderRadius: "50%",
  display: "inline-block",
  width: 4,
  height: 4,
  marginRight: 8,
  marginBottom: 4,
});
const cardContainer: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 24,
  flexWrap: "wrap",
  paddingBottom: 40,
};

const STrashButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;

  width: 40px;
  height: 40px;

  /* On Secondary */

  background: rgba(26, 26, 27, 0.4);
  /* Grey */

  border: 1px solid rgba(192, 192, 192, 0.2);
  border-radius: 8px;
`;

enum Status {
  Alive = "Alive",
  Stopped = "Stopped",
  Destroyed = "Destroyed",
}

const TimeLeftTitle = {
  [Status.Alive]: "Remaining Life Time",
  [Status.Stopped]: "Time Until Destruction",
  [Status.Destroyed]: "Time Until Destruction",
};

const StatusColor = {
  [Status.Alive]: "#B5FF3B",
  [Status.Stopped]: "#FFB800",
  [Status.Destroyed]: "#F44141",
};

function Row(props: { left: JSX.Element | string; right: JSX.Element | string }) {
  return (
    <>
      <Card.Grid hoverable={false} style={leftColumn}>
        {props.left}
      </Card.Grid>
      <Card.Grid hoverable={false} style={rightColumn}>
        {props.right}
      </Card.Grid>
    </>
  );
}

function TrashButton(props: { handleDelete: (index: string) => void; chainId: string }) {
  return <STrashButton onClick={() => props.handleDelete(props.chainId)} icon={<DeleteOutlined style={{ color: "white" }} />} />;
}

function ChainCard(props: { chainId: string; currencySymbol: string; ttl: string; rpcUrl: string; timeLeft: string; status: Status; handleDelete: (index: string) => void }) {
  return (
    <Card title="Optimism" headStyle={{ ...cardStyle(props.status), ...headStyle }} bodyStyle={{ ...cardStyle(props.status), ...bodyStyle }} bordered={false} extra={props.status === Status.Alive && <TrashButton chainId={props.chainId} handleDelete={props.handleDelete} />}>
      <Card.Grid hoverable={false} style={{ width: "100%", padding: 0 }} />
      <Row left="Chain ID" right={props.chainId} />
      <Row left="Currency Symbol" right={props.currencySymbol} />
      <Row left="Time-To-Live (TTL)" right={props.ttl} />
      <Card.Grid hoverable={false} style={{ width: "100%", boxShadow: "none", padding: 12 }} />
      <Row
        left={
          <>
            <div>RPC URL</div>
            <div style={rpcUrl}>{props.rpcUrl}</div>
          </>
        }
        right=""
      />
      <Row
        left={
          <>
            <div>{TimeLeftTitle[props.status]}</div>
            <div style={value}>{props.timeLeft}</div>
          </>
        }
        right={
          <>
            <div style={statusDot(props.status)} />
            <div style={{ display: "inline-block" }}>{props.status}</div>
          </>
        }
      />
    </Card>
  );
}

interface IChain {
  id: string;
  chainId: string;
  currencySymbol: string;
  ttl: string;
  rpcUrl: string;
  timeLeft: string;
  status: Status;
}

export default function ChainList(props: { chains: IChain[]; setChains: any }) {
  const handleDelete = (index: string) => {
    // Delete index from props.chains
    const newChain = [...props.chains];
    const chain = newChain.find((chain) => chain.chainId === index)!;
    chain.status = Status.Stopped;
    chain.timeLeft = "7d 23h 59m 59s";
    props.setChains(newChain);
  };
  return <div style={cardContainer}>{props.chains.length >= 1 && props.chains.map((chain) => <ChainCard key={chain.id} chainId={chain.chainId} currencySymbol={chain.currencySymbol} ttl={chain.ttl} rpcUrl={chain.rpcUrl} status={chain.status} timeLeft={chain.timeLeft} handleDelete={handleDelete} />)}</div>;
}
