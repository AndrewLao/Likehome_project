import React, {useState} from 'react';
import './CatalogPage.css';
import SearchResult from './SearchResult';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

function CatalogPage(props) {

    //Sorting stuff
    const [sort, setSort] = React.useState(''); 
    const handleChange = (event) => {
      setSort(event.target.value);
    };

    //Filtering Price
    function valuetext(value) {
      return `${value}°C`;
    }
    const [value, setValue] = React.useState([0, 30]);

    const handleChange2 = (event, newValue) => {
      setValue(newValue);
    };

    const marks = [
      { value: 0,
        label: '$0'
      },
      { value: 30,
        label: '$3000'
      },
    ];


  return (
    <div className='catalogPage'>
        <div className='catalogPage__info'>
        <p> {props.hotels.length} Stays · {props.range.startDate + " to " + props.range.endDate} · {props.range.guests} Guests 😀</p>
        <h1>Stays nearby</h1>
        
        <Box component="div" sx={{ minWidth: 10, display: 'inline', marginRight: 5}}>
          <FormControl sx={{width: '15%'}}>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort by"
              onChange={handleChange}
            >
              <MenuItem value={10}>Hotels: A to Z</MenuItem>
              <MenuItem value={20}>Hotels: Z to A</MenuItem>
              <MenuItem value={30}>Price: High to Low</MenuItem>
              <MenuItem value={40}>Price: Low to High</MenuItem>
              <MenuItem value={50}>Ratings: High to Low</MenuItem>
              <MenuItem value={60}>Ratings: Low to High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange2}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={30}
            step={1}
            scale={(x) => x*100}
            marks={marks}
            valueLabelFormat={(x) => "$"+x}
          />
         </Box>


        <div>

    </div>





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

export default CatalogPage;