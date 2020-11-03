import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const MainWrapper = styled.div`
  text-align: center;
`;
const Table = styled.table`
  font-size: 15px;
  border-collapse: collapse;
  margin-left:auto; 
  margin-right:auto;
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
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: purple;
  margin: 50px;
`;

const Main = () => {
  const history = useHistory();

  const [allCases, setAllCases] = useState([]);

  useEffect(() => {
    const getAllCases = () => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_HOST}/cases`)
        .then((res) => {
            setAllCases(res.data);
        })
        .catch((error) => {
        });
    }

    getAllCases();
  },[])

  const goToCase = (caseNo) => {
    history.push({
      pathname: `/case/${caseNo}`,
    });
  };

  return (
    <MainWrapper>
      <Title>Case data</Title>
      <Table>
        <Th>Case Number</Th>
        <Th>Date Confirmed</Th>
        <Th>Local or Imported</Th>
        <Th>Patient Name</Th>
        <Th>Identity Document Number</Th>
        <Th>Date of Birth</Th>
        <Th>Virus Name</Th>
        <Th>Disease</Th>
        <Th>Max. Infectious Period (days)</Th>
        {allCases.map((item, index) => (
        <Tr onClick={() => goToCase(item.case_number)} key={index}>
          <Td>{item.case_number}</Td>
          <Td>{item.date_confirmed}</Td>
          <Td>{item.local_or_imported}</Td>
          <Td>{item.patient_name}</Td>
          <Td>{item.patient_id_number}</Td>
          <Td>{item.patient_birth}</Td>
          <Td>{item.virus_name}</Td>
          <Td>{item.disease}</Td>
          <Td>{item.max_infectious_period}</Td>
        </Tr>))}
      </Table>
    </MainWrapper>
  );
};

export default Main;
