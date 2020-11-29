import React, {useLayoutEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const HeaderWrapper = styled.div`
  max-width: 1080px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 120px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  background-color: thistle;
  border: 2px solid black;
  color: purple;
  margin-bottom: 20px;
`;

const Main = () => {
  const history = useHistory();

  const [allCases, setAllCases] = useState([]);

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/cases`, {
        headers: {
          "Authorization": "Token " + localStorage.getItem("Authorization")
        }
      })
      .then((res) => {
        setAllCases(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("your token expired :(\nplease login again!");
          history.push("/login");
        } else {
          alert("There is something wrong with the server :(\nplease try again later!");
        }
      });
  }, [history])

  const goToCase = (caseNo) => {
    history.push({
      pathname: `/case/${caseNo}`,
    });
  };

  const logout = () => {
    console.log(localStorage.getItem("Authorization"));
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}/staff/logout`, null, {
        headers: {"Authorization": "Token " + localStorage.getItem("Authorization")}
      })
      .then((res) => {
        localStorage.removeItem("Authorization");
        history.push("/login");
      })
      .catch((error) => {
        alert("There is something wrong with the server :(\nplease try again later!");
      });
  }

  const goToCluster = () => {
    history.push("/cluster");
  };

  return (
    <MainWrapper>

      <HeaderWrapper>
        <Button onClick={goToCluster}>Cluster</Button>
        <Title>Case data</Title>
        <Button onClick={logout}>Logout</Button>
      </HeaderWrapper>

      <Table>
        <thead>
        <tr>
          <Th>Case Number</Th>
          <Th>Date Confirmed</Th>
          <Th>Local or Imported</Th>
          <Th>Patient Name</Th>
          <Th>Identity Document Number</Th>
          <Th>Date of Birth</Th>
          <Th>Virus Name</Th>
          <Th>Disease</Th>
          <Th>Max. Infectious Period (days)</Th>
        </tr>
        </thead>
        <tbody>
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
        </tbody>
      </Table>
    </MainWrapper>
  );
};

export default Main;
