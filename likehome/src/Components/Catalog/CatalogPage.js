import React from 'react';
import './CatalogPage.css';
import SearchResult from './SearchResult';
import { Button } from '@mui/material';

function CatalogPage() {
  return (
    <div className='catalogPage'>
        <div className='catalogPage__info'>
        <p> 30 stays · 11 March to 13 March · 2 Guests</p>
        <h1>Stays nearby</h1>
        <Button variant="outlined">Cancellation Flexibility</Button>
        <Button variant="outlined">Type of Place</Button>
        <Button variant="outlined">Price</Button>
        <Button variant="outlined">Rooms and Beds</Button>
        <Button variant="outlined">More Filters</Button>
        </div>
        <SearchResult 
            img="https://images.trvl-media.com/hotels/1000000/30000/25500/25449/39a74c67.jpg?impolicy=resizecrop&rw=1200&ra=fit"
            location="New York City, NY"
            title="Millennium Hotel Broadway Times Square"
            description="4-star hotel with bar/lounge, near Times Square"
            price="$221 per night"
            total="292 total"
        />
        <SearchResult 
            img="https://images.trvl-media.com/hotels/1000000/50000/50000/49985/5fce70f8.jpg?impolicy=resizecrop&rw=1200&ra=fit"
            location="Chicago, Illinois"
            title="The St. Clair Hotel – Magnificent Mile"
            description="Located steps from Northwestern Memorial Hospital"
            price="$132 per night"
            total="$155 total"
        />
        <SearchResult 
            img="https://images.trvl-media.com/hotels/1000000/800000/794600/794528/8a514661.jpg?impolicy=resizecrop&rw=1200&ra=fit"
            location="Dallas, Texas"
            title="La Quinta Inn & Suites by Wyndham Dallas Downtown"
            description="Hotel with bar/lounge, near Reunion Tower"
            price="$199 per night"
            total="$229 total"
        />
        <SearchResult 
            img="https://images.trvl-media.com/hotels/1000000/30000/27000/26978/e26ef53d.jpg?impolicy=resizecrop&rw=1200&ra=fit"
            location="Los Angeles, CA"
            title="The Dixie Hollywood"
            description="3-star hotel with outdoor pool, near Melrose Avenue"
            price="$143 per night"
            total="$165 total"
        />
    </div>
  )
}

export default CatalogPage