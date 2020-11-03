import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const CaseWrapper = styled.div`
  text-align: center;
`;
const Table = styled.table`
  font-size: 15px;
  border-collapse: collapse;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const SearchListTable = styled(Table)`
  margin-left: 10% auto;
  margin-right: 10% auto;
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
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: purple;
`;
const LocationSearchWrapper = styled.div`
  display: inline-block;
`;
const LocationInputBox = styled.input`
  width: 200px;
  height: 25px;
  margin-right: 5px;
  font-size: 15px;
`;
const Input = styled.input`
  width: 150px;
  height: 18px;
  font-size: 15px;
`;
const ButtonWrapper = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  text-align: left;
`;
const Button = styled.button`
  width: 120px;
  height: 30px;
  font-size: 15px;
  font-weight: bold;
  background-color: thistle;
  border: 2px solid black;
  color: purple;
`;

const Case = () => {
  let { caseId } = useParams();

  const [caseDetail, setCaseDetail] = useState({});
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [locationOutput, setLocationOutput] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getCaseDetail = () => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_HOST}/cases/${caseId}`)
        .then((res) => {
            setCaseDetail(res.data);
        })
        .catch((error) => {
        });
    }
    const getLocations = () => {
        axios
        .get(`${process.env.REACT_APP_BACKEND_HOST}/cases/${caseId}/locations`)
        .then((res) => {
            setLocations(res.data);
        })
        .catch((error) => {
        });
    }
    getCaseDetail();
    getLocations();
  },[])

  const handlelocationInput = (e) => {
    setLocationInput(e.target.value);
  };

  const handleSearchLocation = (e) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}/locations/search`, {
        params: { q: locationInput },
      })
      .then((res) => {
        setLocationOutput(res.data[0]);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("No search result");
        }
      });
  };

  const handleDateFromChange = (e) => {
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e) => {
    setDateTo(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddLocation = (index) => {
    var dataToBeAdded = {
    location: locationOutput.nameEN,
    address: locationOutput.addressEN,
    x_coord: locationOutput.x,
    y_coord: locationOutput.y,
    date_from: dateFrom,
    date_to: dateTo,
    category: category
  }

    console.log(dataToBeAdded);

    axios
    .post(`${process.env.REACT_APP_BACKEND_HOST}/cases/${caseId}/locations`, dataToBeAdded)
    .then((res) => {
        alert("Added Successfully");
        window.location.reload(false);
    })
    .catch((error) => {
    });
  };

  return (
    <CaseWrapper>
      <ButtonWrapper>
        <Link to="/">
          <Button>back</Button>
        </Link>
      </ButtonWrapper>
      <Title>Case Number: {caseDetail.case_number}</Title>
      <Table>
        <Th>Date Confirmed</Th>
        <Th>Local or Imported</Th>
        <Th>Patient Name</Th>
        <Th>ID Number</Th>
        <Th>Date of Birth</Th>
        <Th>Virus Name</Th>
        <Th>Disease</Th>
        <Th>Max Infectious Period</Th>
        <tr>
          <Td>{caseDetail.date_confirmed}</Td>
          <Td>{caseDetail.local_or_imported}</Td>
          <Td>{caseDetail.patient_name}</Td>
          <Td>{caseDetail.patient_id_number}</Td>
          <Td>{caseDetail.patient_birth}</Td>
          <Td>{caseDetail.virus_name}</Td>
          <Td>{caseDetail.disease}</Td>
          <Td>{caseDetail.max_infectious_period}</Td>
        </tr>
      </Table>

      <Table>
        <Th>Location</Th>
        <Th>Address</Th>
        <Th>X Coord</Th>
        <Th>Y Coord</Th>
        <Th>Date From</Th>
        <Th>Date To</Th>
        <Th>Category</Th>
        {locations.map((location, index) => (
        <tr key={index}>
          <Td>{location.location}</Td>
          <Td>{location.address}</Td>
          <Td>{location.x_coord}</Td>
          <Td>{location.y_coord}</Td>
          <Td>{location.date_from}</Td>
          <Td>{location.date_to}</Td>
          <Td>{location.category}</Td>
        </tr>))}
      </Table>

      <LocationSearchWrapper>
        <LocationInputBox
          placeholder="Search for a location"
          onChange={handlelocationInput}
          value={locationInput}
        />
        <Button onClick={handleSearchLocation}>Search</Button>
      </LocationSearchWrapper>
      {locationOutput ? (
        <div>
          <SearchListTable>
            <Th>Location</Th>
            <Th>Address</Th>
            <Th>X Coord</Th>
            <Th>Y Coord</Th>
            <tr>
              <Td>{locationOutput.nameEN}</Td>
              <Td>{locationOutput.addressEN}</Td>
              <Td>{locationOutput.x}</Td>
              <Td>{locationOutput.y}</Td>
            </tr>
          </SearchListTable>
          <Table>
            <Th>Date From</Th>
            <Th>Date To</Th>
            <Th>Category</Th>
            <tr>
              <Td>
                <Input
                  onChange={handleDateFromChange}
                  value={dateFrom}
                  placeholder="****-**-**"
                />
              </Td>
              <Td>
                <Input
                  onChange={handleDateToChange}
                  value={dateTo}
                  placeholder="****-**-**"
                />
              </Td>
              <Td>
                <Input
                  onChange={handleCategoryChange}
                  value={category}
                  placeholder="Visit, Workplace, Residence"
                />
              </Td>
            </tr>
          </Table>

          <Button onClick={handleAddLocation}>Add Location</Button>
        </div>
      ) : null}
    </CaseWrapper>
  );
};

export default Case;
