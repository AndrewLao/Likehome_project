import React from "react";
import "./SearchResult.css";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function SearchResult({
  img,
  location,
  title,
  description,
  price,
  rating,
  facilities,
  amenities,
  startDate,
  endDate,
  noOfGuests,
  setReserveData,
}) {
  const [expanded, setExpanded] = React.useState(false);

  // expand more button
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  // activate expand more button
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const history = useHistory();

  const reserving = () => {
    setReserveData({
      img: img,
      location: location,
      title: title,
      description: description,
      price: price,
      rating: rating,
      facilities: facilities,
      amenities: amenities,
      startDate: startDate,
      endDate: endDate,
      noOfGuests: noOfGuests,
    });
    history.push({
      pathname: "/reservation",
    });
  };

  return (
    <div className="searchResult">
      <img src={img} alt="" />
      <div className="searchResult__info">
        <div className="searchResult__infoLeft">
          <p>{location}</p>
          <h3>{title}</h3>
          <p>____</p>
          <p>{description}</p>
          {/* add expand more for facilities and ammenities */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "grey",
            }}
          >
            {facilities === "" ? <></> : <p>{"Facilities: " + facilities}</p>}
            <br />
            {amenities === "" ? <></> : <p>{"Amenities: " + amenities}</p>}
          </Collapse>
        </div>
      </div>

      {/* Right portion of info card */}
      <div>
        <div className="searchResult__reserve">
          <Button variant="contained" onClick={reserving}>
            Reserve
          </Button>
        </div>

        <div className="searchResult__price">
          <h3>{"$" + price + "/night"}</h3>
          <p>{"Rating: " + rating + "/10"}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
