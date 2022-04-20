import React from 'react';
import './SearchResult.css';

function SearchResult(
   { img, location, title, description, price, rating }
) {
  return (
    <div className='searchResult'>
        <img src={img} alt="" />
        <div className='searchResult__info'>
            <div className='searchResult__infoTop'>
                <p>{location}</p>
                <h3>{title}</h3>
                <p>____</p>
                <p>{description}</p>
            </div>
            <div className='searchResult__infoBottom'>
                <div className='searchResult__price'>
                    <h2>{price}</h2>
                    <p>{rating}</p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default SearchResult