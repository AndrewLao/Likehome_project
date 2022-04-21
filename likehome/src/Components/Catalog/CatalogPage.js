import React from 'react';
import './CatalogPage.css';
import SearchResult from './SearchResult';
import { Button } from '@mui/material';

function CatalogPage(props) {
  return (
    <div className='catalogPage'>
        <div className='catalogPage__info'>
        <p> {props.hotels.length} Stays · {new Date().toLocaleDateString()} · Many Guests :)</p>
        <h1>Stays nearby</h1>
        <Button variant="outlined">Cancellation Flexibility</Button>
        <Button variant="outlined">Type of Place</Button>
        <Button variant="outlined">Price</Button>
        <Button variant="outlined">Rooms and Beds</Button>
        <Button variant="outlined">More Filters</Button>
        </div>
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
            />)
        })}
    </div>
  )
}

export default CatalogPage