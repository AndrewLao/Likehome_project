import React, { useState } from "react";
import "./CatalogPage.css";
import SearchResult from "./SearchResult";
import Filters from "./Filters";
function CatalogPage(props) {
  return (
    <div className="catalogPage">
      {/* Catalog Page Info Start */}
      <div className="catalogPage__info">
        <p>
          {" "}
          {props.hotels.length} Stays ·{" "}
          {props.range.startDate.toLocaleDateString() +
            " to " +
            props.range.endDate.toLocaleDateString()}{" "}
          · {props.range.guests} Guests
        </p>
        <h1>Stays nearby</h1>
      </div>
      {/* Catalog Page Info End */}

      <Filters
        setHotels={props.setFiltered}
        setIsFiltered={props.setIsFiltered}
      />

      {props.hotels.map((tile) => {
        return (
          <SearchResult
            img={tile.imglink}
            location={tile.addr}
            title={tile.hotelname}
            description={tile.details}
            facilities={tile.facilities}
            amenities={tile.amenities}
            price={tile.price}
            rating={tile.ratingVal}
            startDate={props.range.startDate}
            endDate={props.range.endDate}
            noOfGuests={props.range.guests}
            setReserveData={props.setReserveData}
          />
        );
      })}
    </div>
  );
}

export default CatalogPage;
