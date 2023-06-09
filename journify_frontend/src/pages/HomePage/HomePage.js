import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePageNavbar from "./HomePageNavbar";
import "./HomePage.scss";
import axios from "axios";
import background_photo from "../../images/maldives-background-photo.jpg";
import madrid_destination_photo from "../../images/madrid-destination-photo.jpeg";
import hiking_outdoors from "../../images/hiking-outdoors.jpeg";
import beach_couple from "../../images/beach-couple.jpeg";
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';



function SearchBar({ onSearch }) {

  //"Give me some ideas of where to travel to for vacation in the format 'city, country' based on these parameters: {location}. Don't number the list."
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      onSearch(searchValue);
      // alert(searchValue);
      setSearchValue("Loading your travel destinations...");
      setIsLoading(true);


      try {
        const response = await axios.post("http://127.0.0.1:5000/data", {
          location: searchValue,
        });
        const searchResults = response.data;
        setSearchResult(searchResults);
  
        console.log(searchResults);
        navigate("/destinations-results", { state: { searchResults } });
        // history.push('/destinations-result', { data: searchResults });
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
      setIsLoading(false);
    };
  }

  const handleSearchClick = async () => {
    onSearch(searchValue);
    // alert(searchValue);
    setSearchValue("Loading your travel destinations...");
    setIsLoading(true);
    // const searchQuery = document.querySelector("#searchInput")?.value;

    try {
      const response = await axios.post("http://127.0.0.1:5000/data", {
        location: searchValue,
      });
      const searchResults = response.data;
      setSearchResult(searchResults);

      console.log(searchResults);
      navigate("/destinations-results", { state: { searchResults } });
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="search-bar-container">
      <form></form>
      <input
        type="text"
        placeholder="What's your next destination? Search now"
        className="search-bar"
        id="searchValue"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
        {isLoading && (
          <div className="loading-container">
            <CircularProgress 
              size={48}
              sx={{
                color: blue[200],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          </div>
        )}
    </div>
  );
}

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // axios
    //   .post("http://127.0.0.1:5000/data", { location: searchQuery })
    //   .then((response) => {
    //     // Handle the response data here
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error(error);
    //   });
  };

  const handleSearch = (term) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <div className="background-image-container">
        <HomePageNavbar />
        <h1 className="main-heading">Your journey starts here</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="info-container one">
        <img
          src={madrid_destination_photo}
          alt="madrid"
          className="destination-photo one"
        />
        <p className="description-text one">
          Looking to plan your next adventure but feeling overwhelmed by the
          countless travel options available? Let our website take the hassle
          out of your trip planning with our easy search and click platform.
        </p>
      </div>
      <div className="info-container two">
        <p className="description-text two">
          Let us do the heavy lifting and plan your perfect adventure without
          breaking a sweat. With our <b>advanced AI technology,</b> we'll cater
          to what <b>you</b> want. Whether you're looking for a scenic mountain
          trail, a serene fishing spot, or a rustic camping experience, we've
          got you covered.
        </p>
        <img
          src={hiking_outdoors}
          alt="hiking"
          className="destination-photo two"
        />
      </div>
      <div className="info-container three">
        <img
          src={beach_couple}
          alt="couple at beach"
          className="destination-photo three"
        />
        <p className="description-text three">
          No matter where you want to go or what you want to do, we'll handle it
          all so you can spend time focusing on what really matters
        </p>
      </div>
    </>
  );
}

export default HomePage;
