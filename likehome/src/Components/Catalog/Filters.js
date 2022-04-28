import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Axios from "axios";

const Filters = (props) => {
  //Sorting stuff
  const [sort, setSort] = useState(10);
  //   const handleChange = (event) => {
  //     setSort(event.target.value);
  //     handleFilter();
  //   };

  useEffect(() => {
    handleFilter();
  }, [sort]);

  // Price Filter Functions Start
  function valuetext(value) {
    return `${value}°C`;
  }
  const [value, setValue] = useState([0, 30]);

  const marks = [
    { value: 0, label: "$0" },
    { value: 30, label: "$3000" },
  ];
  // Price Filter Functions End
  // Ratings Filter Functions Start
  function valuetext2(value) {
    return `{value2}°C`;
  }
  const [value2, setValue2] = useState([0, 10]);

  const marks2 = [
    { value: 0, label: "0" },
    { value: 10, label: "10" },
  ];

  const handleFilter = () => {
    //The main issue is that the sorting from the search bar and the sorting from here is independent
    //Sorting from search resets the sorted array to the original hotels array if searchbar is empty
    //it also filters the original hotel array!! not the sorted array from filter
    //This will be setting the sorted array, then we need to somehow signal to the header or something that we are filtering and
    //the searchbar should filter the sorted array not original hotel array. Maybe pass in a boolean from app.js to both header and catalogpage
    //then catalogpage to Filters.js?
    let sqlWhere = "";
    let callDB = false;
    if (value[0] != 0 || value[1] != 30) {
      sqlWhere +=
        "price >= " +
        value[0] * 100 +
        " AND price <= " +
        value[1] * 100 +
        " AND ";
      callDB = true;
    }
    if (value2[0] != 0 || value2[1] != 10) {
      sqlWhere +=
        "ratingVal >= " +
        value2[0] +
        " AND ratingVal <= " +
        value2[1] +
        " AND ";
      callDB = true;
    }

    switch (sort) {
      case 20: // A to Z
        sqlWhere += "hotelname IS NOT NULL ORDER BY hotelname ASC";
        callDB = true;
        break;
      case 30: // Z to A
        sqlWhere += "hotelname IS NOT NULL ORDER BY hotelname DESC";
        callDB = true;
        break;
      case 40: // Price High to Low
        sqlWhere += "price > 0 ORDER BY price DESC";
        callDB = true;
        break;
      case 50: // Price Low to High
        sqlWhere += "price > 0 ORDER BY price ASC";
        callDB = true;
        break;
      case 60: //Ratings High to Low
        sqlWhere += "ratingVal IS NOT NULL ORDER BY ratingVal DESC";
        callDB = true;
        break;
      case 70: //Ratings Low to High
        sqlWhere += "ratingVal IS NOT NULL ORDER BY ratingVal ASC";
        callDB = true;
        break;
      default: //No Filters
        sqlWhere += "price > -1";
        break;
    }

    //Make call to DB and get filtered arr
    if (callDB) {
      props.setIsFiltered(true);
      //console.log(sqlWhere);
      Axios.get("http://localhost:3001/get-hotels-filtered", {
        params: { where: sqlWhere },
      }).then((res) => {
        props.setHotels(res.data);
      });
    } else {
      props.setIsFiltered(false);
    }

    //props.setFiltered(); //After calling sql to filter everything, use props.setFiltered() to assign the new sorted hotels array
  };
  // Ratings Filter Functions End
  return (
    <>
      {/* Sort and Filter Div Start */}
      <div className="catalogPage__sortFilter">
        {/* Sort Box Start */}
        <Box
          component="div"
          sx={{ display: "inline-block", paddingRight: 5, minWidth: 200 }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort by"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value={10}>Recommended</MenuItem>
              <MenuItem value={20}>Hotels: A to Z</MenuItem>
              <MenuItem value={30}>Hotels: Z to A</MenuItem>
              <MenuItem value={40}>Price: High to Low</MenuItem>
              <MenuItem value={50}>Price: Low to High</MenuItem>
              <MenuItem value={60}>Ratings: High to Low</MenuItem>
              <MenuItem value={70}>Ratings: Low to High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Sort Box End */}

        <p>Price:</p>

        {/* Price Filter Start */}
        <Box
          component="div"
          sx={{
            display: "inline-block",
            width: 250,
            paddingLeft: 2,
            paddingRight: 6,
            paddingUp: 10,
          }}
        >
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onChangeCommitted={handleFilter}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={30}
            step={1}
            scale={(x) => x * 100}
            marks={marks}
            valueLabelFormat={(x) => "$" + x}
          />
        </Box>
        {/* Price Filter End */}

        <p>Ratings:</p>

        {/* Ratings Filter Start */}
        <Box
          component="div"
          sx={{
            display: "inline-block",
            width: 150,
            paddingLeft: 2,
            paddingRight: 4,
            paddingUp: 10,
          }}
        >
          <Slider
            getAriaLabel={() => "Ratings"}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            onChangeCommitted={handleFilter}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext2}
            max={10}
            step={0.1}
            marks={marks2}
            valueLabelFormat={(x) => "" + x}
          />
        </Box>
        {/* Ratings Filter End */}
      </div>
      {/* Sort and Filter Div End */}
    </>
  );
};

export default Filters;
