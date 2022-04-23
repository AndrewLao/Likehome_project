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

    // Filter Price
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

    // Filter Ratings
    function valuetext2(value) {
      return `{value2}°C`;
    }
    const [value2, setValue2] = React.useState([0, 10]);
    
    const handleChange3 = (event, newValue2) => {
      setValue2(newValue2);
    };

    const marks2 = [
      { value: 0,
        label: '0'
      },
      { value: 10,
        label: '10'
      },
    ];

  return (
    <div className='catalogPage'>
      <div className='catalogPage__info'>
      <p> {props.hotels.length} Stays · {props.range.startDate + " to " + props.range.endDate} · {props.range.guests} Guests 😀</p>
      <h1>Stays nearby</h1>
      </div>
    
      <div className='catalogPage__sortFilter'>
          <Box component="div" sx={{display: 'inline-block', paddingRight: 5, minWidth: 200}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort by"
                onChange={handleChange}
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
        
          <p>Price:</p>

          <Box component="div" sx={{ display: 'inline-block', width: 250, paddingLeft: 2, paddingRight: 6, paddingUp: 10}}>
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

          <p>Ratings:</p>

          <Box component="div" sx={{ display: 'inline-block', width: 150, paddingLeft: 2, paddingRight: 4, paddingUp: 10}}>
            <Slider
              getAriaLabel={() => 'Ratings'}
              value={value2}
              onChange={handleChange3}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext2}
              max={10}
              step={0.1}
              marks={marks2}
              valueLabelFormat={(x) => ""+x}
            />
          </Box>
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