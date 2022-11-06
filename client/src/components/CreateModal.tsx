import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import styled from "styled-components";

import { Modal, Input, Card, Row, Col, Button } from "antd";
import { deposit, secondPrice } from "src/tx/Snapchain";

interface ICreateModalProps {
  isCreateOpen: boolean;
  showCreateModal: () => void;
  handleOnSubmit: (days: number, hours: number, minutes: number, seconds: number, networkName: string, currency: string) => void;
}

const InputQuestion = styled.p`
  margin: 8px 0px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* identical to box height, or 114% */

  display: flex;
  align-items: center;

  /* Off White */

  color: #fefefe;
`;

const SPriceLabel = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: white;
  height: 20px;
`;

const SUnitPriceLabel = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  height: 10px;
  color: #c0c0c0;
`;

const SCalculatedPrice = styled.div`
  font-family: "Martian Mono";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  margin-right: auto;
  float: right;

  color: #b5ff3b;
`;

const SConfirmButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const SConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 10px;
  cursor: pointer;

  width: 103px;
  height: 40px;

  /* Grey */
  background: rgba(45, 45, 45, 0.8);
  border: 1px solid rgba(192, 192, 192, 0.2);
  border-radius: 8px;

  color: white;
`;

const CreateModal = (props: ICreateModalProps) => {
  const { isCreateOpen, showCreateModal, handleOnSubmit } = props;

  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(30);
  const [networkName, setNetworkName] = useState("Test");
  const [currency, setCurrency] = useState("GOR");
  const [pricePerSecond, setPricePerSecond] = useState<string | number>("--");
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState<string | number>("--");
  const [TTLSeconds, setTTLSeconds] = useState(0);
  const createChain = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // set loading
      setLoading(true);
      // send tx
      await deposit(TTLSeconds);
      console.log("send tx", days, hours, minutes, seconds);

      // grpc call
      console.log("send grpc", networkName, currency);
      // close modal
      setTimeout(() => {
        setLoading(false);
        showCreateModal();
      }, 2000);
      console.log({
        days,
        hours,
        minutes,
        seconds,
        networkName,
        currency,
        pricePerSecond,
      });
    },
    [days, hours, minutes, seconds, networkName, currency, pricePerSecond, TTLSeconds]
  );
  useEffect(() => {
    (async () => {
      setLoading(true);
      const price = await secondPrice();
      console.log("return price", price);
      // get price per second
      setPricePerSecond(price);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    const ttlSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    setTTLSeconds(ttlSeconds);
    if (loading) {
      return;
    }
    const total = ttlSeconds * (pricePerSecond as number);
    setTotalCost(total);
  }, [days, hours, minutes, seconds, pricePerSecond, loading]);

  return (
    <Modal title="Create Chain" open={isCreateOpen} onOk={showCreateModal} onCancel={showCreateModal} footer={null}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleOnSubmit(days, hours, minutes, seconds, networkName, currency);
        }}
      >
        <InputQuestion>Time-To-Live (TTL)</InputQuestion>
        <Input.Group>
          <Input style={{ width: "20%" }} addonAfter={"d"} placeholder="00" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDays(Number(e.target.value))} value={days} />
          <Input style={{ width: "20%" }} addonAfter={"h"} placeholder="00" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHours(Number(e.target.value))} value={hours} />
          <Input style={{ width: "20%" }} addonAfter={"m"} placeholder="00" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinutes(Number(e.target.value))} value={minutes} />
          <Input style={{ width: "20%" }} addonAfter={"s"} placeholder="00" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSeconds(Number(e.target.value))} value={seconds} />
        </Input.Group>

        <InputQuestion>Network Name</InputQuestion>
        <Input placeholder="---" style={{ width: "400px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetworkName(e.target.value)} value={networkName} />

        <InputQuestion>Currency Symbol</InputQuestion>
        <Input placeholder="---" style={{ width: "400px" }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrency(e.target.value)} value={currency} />
        {/* <Card
        style={{
          width: 400,
          margin: "8px 0px",
          background: "rgba(192, 192, 192, 0.2)",
          border: "1px solid rgba(192, 192, 192, 0.2)",
          borderRadius: "8px",
        }}
      >
        <Row>
          <Col span={12}>
            <SPriceLabel>Total Price</SPriceLabel>
            <SUnitPriceLabel>-- SNAP</SUnitPriceLabel>
          </Col>
          <Col span={12}>
            <SCalculatedPrice>-- SNAP</SCalculatedPrice>
          </Col>
        </Row>
      </Card>
      <SConfirmButtonContainer>
        <SConfirmButton
          type="submit"
          onClick={() =>
            handleOnSubmit(days, hours, minutes, seconds, networkName, currency)
          }
        >
          Confirm
        </SConfirmButton>
      </SConfirmButtonContainer> */}
        <Card
          style={{
            width: 400,
            margin: "8px 0px",
            background: "rgba(192, 192, 192, 0.2)",
            border: "1px solid rgba(192, 192, 192, 0.2)",
            borderRadius: "8px",
          }}
        >
          <Row>
            <Col span={12}>
              <SPriceLabel>Total Price</SPriceLabel>
              <SUnitPriceLabel>Unit Price: {pricePerSecond} SNAP</SUnitPriceLabel>
            </Col>
            <Col span={12}>
              <SCalculatedPrice>{totalCost} SNAP</SCalculatedPrice>
            </Col>
          </Row>
        </Card>
        <SConfirmButtonContainer>
          {loading ? (
            <SConfirmButton disabled type="submit">
              Loading...
            </SConfirmButton>
          ) : (
            <SConfirmButton type="submit">Confirm</SConfirmButton>
          )}
        </SConfirmButtonContainer>
      </form>
    </Modal>
  );
};

export default CreateModal;
