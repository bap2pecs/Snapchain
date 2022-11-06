import React from "react";
import ConnectButton from "./ConnectButton";
import { Card } from "antd";
import texture from "../assets/texture.png";

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
};

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

function Row(props: {
  left: JSX.Element | string;
  right: JSX.Element | string;
}) {
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

function ChainCard(props: {
  chainId: string;
  currencySymbol: string;
  ttl: string;
  rpcUrl: string;
  timeLeft: string;
  status: Status;
}) {
  return (
    <Card
      title="Ethereum Mainnet"
      headStyle={{ ...cardStyle(props.status), ...headStyle }}
      bodyStyle={{ ...cardStyle(props.status), ...bodyStyle }}
      bordered={false}
    >
      <Card.Grid hoverable={false} style={{ width: "100%", padding: 0 }} />
      <Row left="Chain ID" right={props.chainId} />
      <Row left="Currency Symbol" right={props.currencySymbol} />
      <Row left="Time-To-Live (TTL)" right={props.ttl} />
      <Card.Grid
        hoverable={false}
        style={{ width: "100%", boxShadow: "none", padding: 12 }}
      />
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

export default function ChainList(props: { chains: any[] }) {
  return (
    <div style={cardContainer}>
      {props.chains.length >= 1 &&
        props.chains.map((chain) => (
          <ChainCard
            key={chain.id}
            chainId={chain.chainId}
            currencySymbol={chain.currencySymbol}
            ttl={chain.ttl}
            rpcUrl={chain.rpcUrl}
            status={chain.status}
            timeLeft={chain.timeLeft}
          />
        ))}
    </div>
  );
}
