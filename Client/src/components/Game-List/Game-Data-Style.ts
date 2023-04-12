import styled from "styled-components";

export const DataTableWrapper = styled.div`
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
  border: 3px solid #2d2d3e;
  border-radius: 8px;
`;

export const DataTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  background-color: #282936;
  border: 1px solid #282936;
`;

export const TableHeader = styled.th`
  text-align: center;
  padding: 10px;
  font-weight: bold;

  color: #666666;
`;

export const TableCell = styled.td`
  text-align: center;
  padding: 10px;
  color: #ffff;
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