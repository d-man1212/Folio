import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { ListComponent } from "./ListComponent";

export const DashBoardHome = () => {
  const [recomm, setRecomm] = useState([]);
  const [loadingRecomm, setLoadingRecomm] = useState(true);
  const { currentUser } = useAuth();
  const [searchCriteria, setSearchCriteria] = useState("bookname");
  const [searchValue, setSearchValue] = useState("");
  const [searchResultsUrl, setSearchResultsUrl] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearchSubmit = () => {
    const searchUrl = `http://localhost/search/${searchCriteria}/${searchValue}`;
    setSearchResultsUrl(searchUrl);
    console.log(`Searching for ${searchCriteria}: ${searchValue}`);
  };

  useEffect(() => {
    const fetchRecomm = async () => {
      try {
        const response = await axios.get(
          `http://localhost/getuserpreference/${currentUser.email}`
        );
        console.log(response.data);
        if (response.data.message) {
          console.log("No preferences found");
          setRecomm([]);
        } else {
          setRecomm(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoadingRecomm(false);
      }
    };

    fetchRecomm();
  }, [currentUser.email]);

  useEffect(() => {
    const fetchRecommBooks = async () => {
      try {
        const recommData = {};
        for (let preference in recomm) {
          const genre = recomm[preference].genre;
          const response = await axios.get(
            `http://localhost/search/booksByGenre/${genre}`
          );
          console.log(response.data);
          recommData[preference] = response.data.items || [];
        }
        setRecomm(recommData);
      } catch (error) {
        console.error("Error fetching recommendation books:", error);
      }
    };

    if (Object.keys(recomm).length < 2) {
      fetchRecommBooks();
    }
  }, []);

  return (
    <div>
      <div className="py-60 font-Poppins">
        <div className="px-60 self-center grid grid-cols-8">
          <div className="col-span-8 grid grid-cols-8 bg-inputfeild py-2 px-5 rounded-full">
            <div className="col-span-2">
              <select
                value={searchCriteria}
                onChange={handleCriteriaChange}
                className="w-full h-12 bg-white self-center rounded-3xl py-2 focus-within:outline-none text-text placeholder:px-10 text-center"
                style={{
                  background: "var(--accent)",
                  color: "var(--text)",
                }}
              >
                <option value="bookname">Book Title</option>
                <option value="bookAuthor">Author</option>
                <option value="booksByGenre">Genre</option>
              </select>
            </div>
            <div className="col-span-4">
              <input
                type="text"
                placeholder={`Search by ${searchCriteria}`}
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full h-12 bg-transparent focus-within:outline-none text-text placeholder:px-10 text-center"
              />
            </div>
            <div className="col-span-2 self-center bg-white py-2 text-center rounded-3xl">
              <button onClick={handleSearchSubmit}>Submit</button>
            </div>
          </div>
        </div>
        {searchResultsUrl && (
          <div className="m-20 border-4 border-secondary p-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <ListComponent url={searchResultsUrl} gener="Search Results" />
          </div>
        )}

        {Object.keys(recomm).length > 0 ? (
          <div className="m-20 border-4 border-secondary p-4 rounded-md">
            <div className="text-text font-semibold p-20 text-5xl text-center">
              Your Preferred Genres
            </div>

            {loadingRecomm ? (
              <p>Loading...</p>
            ) : (
              Object.keys(recomm).map((preference, index, array) => (
                <div key={preference}>
                  <ListComponent
                    url={`http://localhost/search/booksByGenre/${recomm[preference].genre}`}
                    gener={recomm[preference].genre}
                  />
                  {index < array.length - 1 && <div className="my-4"></div>}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="m-20 border-4 border-secondary p-4 rounded-md">
            <div className="text-text font-semibold p-20 text-5xl text-center">
              Explore Some Genres
            </div>
            <ListComponent
              url={"http://localhost/search/booksByGenre/love"}
              gener={"Love"}
            />
            <ListComponent
              url={"http://localhost/search/booksByGenre/crime"}
              gener={"Crime"}
            />
            <ListComponent
              url={"http://localhost/search/booksByGenre/horror"}
              gener={"Horror"}
            />
          </div>
        )}
      </div>
    </div>
  );
};
