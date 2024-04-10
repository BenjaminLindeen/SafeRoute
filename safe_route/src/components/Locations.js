import React from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import classes from "./Locations.module.css";
import { useState, useEffect } from "react";

function Locations() {
  const [locations, setLocations] = useState([]);
  const user = "admin"; // Placeholder for when we get user auth working
  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    let response = await fetch("/api/getLocations/?user=" + user);

    const data = await response.json();
    setLocations(data);
  }
  return (
    <div className={classes.outerContainer}>
      <div className={classes.mainContainer}>
        <div className={classes.savedLocations}>
          <h2>Saved Locations</h2>
          <div className={classes.locationItem}>
            <div className={classes.locationName}>Location 1</div>
            <div className={classes.icons}>
              <FaEdit className={classes.editIcon} />
              <FaTrash className={classes.deleteIcon} />
            </div>
          </div>
        </div>
        <div className={classes.createLocation}>
          <h2>Create New Location</h2>
          <input type="text" placeholder="Type in address" />
          <br />
          <br />
          <input type="text" placeholder="Add Custom Name" />
          <br />
          <br />
          <button>Save Location</button>
        </div>
      </div>
    </div>
  );
}

export default Locations;
