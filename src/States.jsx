import { useEffect, useState } from 'react';
import './States.css';
export default function States(){

let countryEndPoint = 'https://crio-location-selector.onrender.com/countries';
//let stateEndPoint = 'https://crio-location-selector.onrender.com/country={countryName}/states';
let stateEndPoint = 'https://crio-location-selector.onrender.com/country=';
const [countries,setCountries] = useState([]);
const [states,setStates] = useState([]);
const [cities,setCities] = useState([]);
const [countrySelected,setCountrySelected]=useState("");
const [stateSelected,setStateSelected]=useState("");
const [citySelected,setCitySelected]=useState("");

async function getCountries(){
    try{
        const response = await fetch(countryEndPoint);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
    } catch (error) {
        console.error('Error fetching data: '+error.message);
    }
}

async function getStates(){
    if(countrySelected){
    try{
        const response = await fetch(`${stateEndPoint}${countrySelected}/states`);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setStates(data);
        setStateSelected("");
        setCities([]);
        setCitySelected("");
    } catch (error) {
        console.error('Error fetching data: '+error.message);
    }
}
}

async function getCities(){
    try{
        const response = await fetch(`${stateEndPoint}${countrySelected}/state=${stateSelected}/cities`);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }
        const data = await response.json();
        setCities(data);
        setCitySelected("");

    } catch (error) {
        console.error('Error fetching data: '+error.message);
    }
}

useEffect(()=>{
    getCountries();
},[]);

useEffect(()=>{
    getStates();
},[countrySelected]);

useEffect(()=>{
    getCities();
},[stateSelected]);

function handleCountryChange(e){
    setCountrySelected(e.target.value);
    //setStates();
}

function handleStateChange(e){
    setStateSelected(e.target.value);
}

function handleCityChange(e){
    setCitySelected(e.target.value);
}

    return(
        <>
        <div className="selection">
            
            <select name="country" id="country" onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country)=>{
                    return <option value={country} key={country}>{country}</option>
                })}
            </select>

            <select name='state' id='state' onChange={handleStateChange} disabled={!countrySelected}>
                <option value="">Select State</option>
                {states.map((state)=>{
                    return <option value={state} key={state}>{state}</option>
                })}
            </select>

            <select name='city' id='city' onChange={handleCityChange} disabled={!stateSelected}>
                <option value="">Select City</option>
                {cities.map((city)=>{
                    return <option value={city} key={city}>{city}</option>
                })}
            </select>
        </div>
        <div>
            {citySelected?
            (<h2>You selected {citySelected}, {stateSelected}, {countrySelected}</h2>) : (<h2></h2>)
        }
        </div>
    
        </>
    );
};