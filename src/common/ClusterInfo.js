import React from "react";
import styled from "styled-components";

const ClusterWrapper = styled.div`
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  margin-bottom: 20px;
  max-width: 1080px;
  width: 100%;
  background-color: aliceblue;
  font-size: 1rem;
  font-weight: bold;
`;

const ValueDisplay = styled.div`
  margin: 5px 0;
`;

const Table = styled.table`
  font-size: 15px;
  border-collapse: collapse;
  margin-left:auto; 
  margin-right:auto;
  width: 100%;
`;
const Th = styled.th`
  border: 2px solid black;
  background-color: thistle;
  color: purple;
  font-weight: bold;
  padding: 10px;
`;
const Td = styled.td`
  border: 2px solid black;
  padding: 10px;
`;
const Tr = styled.tr`
  cursor: pointer;
  :hover {
      color: plum;
  }
`;

const ClusterInfo = (props) => {
  return (
    <ClusterWrapper>
      <ValueDisplay>
        Cluster ID: {props.clusterId}
      </ValueDisplay>
      <ValueDisplay>
        Cluster size: {props.clusterSize}
      </ValueDisplay>
      <br/>

      <ValueDisplay>Related visits</ValueDisplay>

      <Table>
        <thead>
        <tr>
          <Th>Location Name</Th>
          <Th>X Coordinate</Th>
          <Th>Y Coordinate</Th>
          <Th>visited Date</Th>
          <Th>case Id</Th>
        </tr>
        </thead>
        <tbody>
        {props?.locations?.map((item, index) => (
          <Tr key={index}>
            <Td>{item.location}</Td>
            <Td>{item.x_coord}</Td>
            <Td>{item.y_coord}</Td>
            <Td>{item.date_from}</Td>
            <Td>{item.case_number}</Td>
          </Tr>))}
        </tbody>
      </Table>
    </ClusterWrapper>

  )
}

export default ClusterInfo;