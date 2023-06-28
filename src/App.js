import React, { useState, useEffect } from "react";
import Paginate from "./common/Paginate";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.css";

const planetApi = "https://swapi.dev/api/planets";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "cadetblue"
};

export default function App() {
  // Manage a common state for different purposes.
  const [state, setState] = useState({
    planetList: [],
    selectedPlanet: "",
    planetDetails: {},
    isLoading: false
  });

  useEffect(() => {
    bindPlanets();
  }, []);

  // Function to get the Planets list.
  const getPlanetList = async () => {
    return await fetch(planetApi)
      .then((res) => res.json())
      .then((json) => json);
  };

  // Function to bind the Planet lists to the dropdown.
  const bindPlanets = async () => {
    setState({ ...state, isLoading: true });
    let planetList = await getPlanetList();
    setState({ ...state, isLoading: false, planetList });
  };

  // Function to get the Planet details for the selected Planet.
  const getPlanetDetails = async (url) => {
    return await fetch(url)
      .then((res) => res.json())
      .then((json) => json);
  };

  // Function to get the people details for the given poepole url.
  const getPeopleDetails = async (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((json) => json);
  };

  // Function to handle the change event of the Planets dropdown.
  const handleChangePlanet = async (e) => {
    let { value } = e.target;

    // If user selecte any planet from the dropdown list.
    if (value !== "Select") {
      // Set default values and loading true to show the spinner until the current process will be finished.
      setState({
        ...state,
        isLoading: true,
        selectedPlanet: value,
        planetDetails: {}
      });

      // Get selected planet details of the selected planet.
      let planetDetails = await getPlanetDetails(value);

      // Create an empty array to hold resident people list related to the selected planet.
      let peopleDetailsList = [];

      // Loop through the residents of the selected planet.
      for (let resident of planetDetails.residents) {
        // Get the resident people details.
        let peopleDetails = await getPeopleDetails(resident);

        // Add to the peopleDetailsList object
        peopleDetailsList.push(peopleDetails);
      }

      // Update the state by stopping the spinner loading and the resident peoples list of the selected planet.
      setState({
        ...state,
        isLoading: false,
        selectedPlanet: value,
        planetDetails: { ...planetDetails, peopleDetailsList }
      });
    } else {
      // Set the default state in case of user didnt select any planet.
      setState({
        ...state,
        selectedPlanet: "",
        planetDetails: {}
      });
    }
  };

  const { isLoading, planetList, selectedPlanet, planetDetails } = state;

  return (
    <>
      <center>
        <label>Select Planet: </label>
        <select onChange={handleChangePlanet} value={selectedPlanet}>
          <option key="Select" value="Select">
            Select
          </option>
          {planetList &&
            planetList.results &&
            planetList.results.map((planet, index) => {
              return (
                <option key={index} value={planet.url}>
                  {planet.name}
                </option>
              );
            })}
        </select>
      </center>
      {isLoading ? (
        <ClipLoader
          color="#ffffff"
          loading={isLoading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
        />
      ) : (
        planetDetails &&
        planetDetails.peopleDetailsList && (
          <Paginate data={planetDetails.peopleDetailsList} />
        )
      )}
    </>
  );
}
