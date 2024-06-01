import states from './States.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const States = () =>
{
    const [ countriesList, setCountriesList ] = useState([]);
    const [ selectCountry, setSelectCountry ] = useState('');
    const [ statesList, setStatesList ] = useState([]);
    const [ selectState, setSelectState ] = useState('');
    const [ citiesList, setCitiesList ] = useState([]);
    const [ selectCity, setSelectCity ] = useState('');

    const [ disableStates, setDisableStates ] = useState(true);
    const [ disableCities, setDisableCities ] = useState(true);


    const getCountries = async () =>
    {
        try
        {
            let url = 'https://crio-location-selector.onrender.com/countries';
            const response = await axios(url);
            setCountriesList(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const getStates = async () =>
    {
        try
        {
            let url = `https://crio-location-selector.onrender.com/country=${selectCountry}/states`;
            const response = await axios(url);
            setStatesList(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const getCities = async () =>
    {
        try
        {
            let url = `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
            const response = await axios(url);
            setCitiesList(response.data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        getCountries();
    },[]);

    useEffect(()=>
    {
        getStates();
    },[selectCountry]);

    useEffect(()=>
    {
        getCities();
    },[selectCountry, selectState])


    return(
        <div className={states.container}>
            <h1>Select Location</h1>
            <div className={states.dropdown}>
                <select onChange={(e)=>
                    {
                        setSelectCountry(e.target.value);
                        setSelectState('');
                        setCitiesList([]);
                        setSelectCity('');
                        setDisableStates(false);
                        setDisableCities(true);
                    }}>
                    <option value="">Select Country</option>
                    {countriesList.map((country)=>
                    (
                        <option value={country}>{country}</option>
                    ))}
                </select>

                <select className={disableStates && states.disable} onChange={(e)=>
                    {
                        setSelectState(e.target.value);
                        setSelectCity('');
                        setDisableCities(false);
                    }}>
                    <option value="">Select State</option>
                    {statesList.map((state)=>
                    (
                        <option value={state}>{state}</option>
                    ))}
                </select>

                <select className={disableCities && states.disable} onChange={(e)=>setSelectCity(e.target.value)}>
                    <option value="">Select City</option>
                    {citiesList.map((city)=>
                    (
                        <option value={city}>{city}</option>
                    ))}
                </select>

            </div>

            {selectCity!== '' && 
                <p className={states.content}>
                    You selected 
                    <span> {selectCity},</span> 
                    <span> {selectState}, {selectCountry}</span>
                </p>}
        </div>
    )
}

export default States;