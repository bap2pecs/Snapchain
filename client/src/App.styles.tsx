import styled from "styled-components";
import Wrapper from "./components/Wrapper";
import Column from "./components/Column";

export const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  /* background-color: #1a1a1a; */
`;

export const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

export const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  word-break: break-word;
`;

export const SLanding = styled.div`
  height: 600px;
  max-width: 100%;
`;

export const STitle = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 90px;
  line-height: 120px;
  color: #ffffff;
`;

export const SSubHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
