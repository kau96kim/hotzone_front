import React, {useState, useLayoutEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import {useHistory} from "react-router-dom";
import ClusterInfo from "../common/ClusterInfo";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: purple;
  margin: 50px;
`;

const Cluster = () => {
  const [clusters, setClusters] = useState(null);
  const history = useHistory();

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/cases/clusters`, {
        headers: {
          "Authorization": "Token " + localStorage.getItem("Authorization")
        }
      })
      .then((res) => {
        setClusters(res.data.clusters);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("your token expired :(\nplease login again!");
          history.push("/login");
        } else {
          alert("There is something wrong with the server :(\nplease try again later!");
        }
      });
  }, [history]);

  const goToMain = () => {
    history.push("/");
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

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Button onClick={goToMain}>Main</Button>
        <Title>Hotzone Clusters</Title>
        <Button onClick={logout}>Logout</Button>
      </HeaderWrapper>
      {clusters?.map((item, index) => (
        <ClusterInfo key={index} clusterId={item.cluster} clusterSize={item.size} locations={item.cluster_list}/>
      ))}
    </MainWrapper>
  )
};

export default Cluster;
