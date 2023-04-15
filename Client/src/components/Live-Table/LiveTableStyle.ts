import styled from "styled-components";

export const TableWrapper = styled.div`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  width: 70%;
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1a1e23;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: #25292f;
    border-radius: 5px;
  }
`;

export const TableHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #242830;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableRow = styled.tr`
  background: #2b2f37;
  border: 1px solid #282936;
  :nth-child(even) {
    background: #242830;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 15px 10px;
  font-weight: bold;
  background: #242830;
  color: #666666;

  &:nth-child(1) {
    width: 20%;
  }
  &:nth-child(2) {
    width: 30%;
  }
  &:nth-child(3) {
    width: 20%;
  }
  &:nth-last-child(2) {
    width: 15%;
  }
  &:last-child {
    width: 15%;
  }
  vertical-align: top;
`;

export const TableCell = styled.td`
  padding: 25px 10px;
  height: 100%;
  text-align: left;
  vertical-align: top;
  color: #ffff;
  &:nth-child(1) {
    width: 20%;
  }
  &:nth-child(2) {
    width: 30%;
  }
  &:nth-child(3) {
    width: 20%;
  }
  &:nth-last-child(2) {
    width: 15%;
  }
  &:last-child {
    width: 15%;
  }
  vertical-align: top;
  span {
    color: #55595f;
    cursor: pointer;
  }
`;

export const GameCell = styled(TableCell)`
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  gap: 2px;
  font-size: 15px;
  span {
    color: #666666;
  }
`;

const GetLiveColor = (liveStatus: string) => {
  switch (liveStatus) {
    case "Currently Live":
      return "#01bc79";
    case "Waiting To Start":
      return "#fde06d";
    case "Finished":
      return "#c66a60";

    default:
      return "white";
  }
};

export const Label = styled.label<{ isLive: string }>`
  color: ${({ isLive }) => GetLiveColor(isLive)};
`;

export const Leaderlabel = styled.label`
  color: white !important;
`;

export const JoinLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: #666666;
  cursor: pointer;

  &:hover {
    color: #ffff;
  }
`;

export const Image = styled.img`
  width: 80%;
  height: 100px;
`;
