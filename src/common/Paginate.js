import React, { useState, useEffect } from "react";

export default function Paginate({ data, pageSize = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [peoples, setPeoples] = useState([]);

  // Create an array to hold the poage number itmes of the pagination section.
  let pageNumberElements = [];

  // Calculate the number of total pages need to show on the pagination section.
  let totalPages = Math.ceil(data.length / pageSize);

  // Loop through the number of the required total pages for the pagination.
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    // Create the page number element and push it to the pageNumberElements array.
    pageNumberElements.push(
      <div
        key={pageNumber}
        className={
          pageNumber === currentPage ? "round-effect active" : "round-effect"
        }
        onClick={() => {
          // Set the selected page number to the state.
          setCurrentPage(pageNumber);

          // Get the people list for the selected page number.
          getPeopleListForGivenPage(pageNumber);
        }}
      >
        {pageNumber}
      </div>
    );
  }

  // Function to get the peoples list for the selected page number.
  const getPeopleListForGivenPage = (pageNumber) => {
    let pageIndex = pageNumber - 1;
    let from = pageIndex * pageSize;
    let to = (pageIndex + 1) * pageSize - 1;

    let filteredPeoples = data.filter((people, index) => {
      return index >= from && index <= to;
    });
    setPeoples(filteredPeoples);
  };

  // Function to get the peoples list for the previous page number.
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getPeopleListForGivenPage(currentPage - 1);
    }
  };

  // Function to get the peoples list for the next page number.
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getPeopleListForGivenPage(currentPage + 1);
    }
  };

  useEffect(() => {
    // Bind the peoples list on loading the component.
    getPeopleListForGivenPage(1);
  }, []);

  // If the people list does not available then show the appropriate text.
  if (!data || !data.length) {
    return (
      <center>
        <h4>No Record found</h4>
      </center>
    );
  }

  return (
    <div className="flex-container">
      {/* People List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the people list and create the table row elements having people details */}
          {peoples && peoples.length
            ? peoples.map((dataRow, index) => (
                <tr key={index}>
                  <td>{dataRow.name}</td>
                  <td>{dataRow.gender}</td>
                  <td>{dataRow.birth_year}</td>
                  <td>{dataRow.height}</td>
                  <td>{dataRow.mass}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {/* Pagination Section */}
      {pageNumberElements && pageNumberElements.length > 1 && (
        <div className="paginate-ctn">
          <div className="round-effect" onClick={prevPage}>
            &lsaquo;
          </div>
          {pageNumberElements}
          <div className="round-effect" onClick={nextPage}>
            &rsaquo;
          </div>
        </div>
      )}
    </div>
  );
}
