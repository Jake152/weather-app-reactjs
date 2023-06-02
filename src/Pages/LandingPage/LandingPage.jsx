import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import LocationInput from "../../Components/LocationInput/LocationInput";
import Button from "../../Common/Button/Button";

import './LandingPage.css';

export default function LandingPage({ setOnLandingPage, city, setCity, state, setState }) {
    const [btnDisabled, setBtnDisabled] = useState(true);
    const navigate = useNavigate();

    const handleLocationChange = () => {
        if (city && state) {
            setOnLandingPage(false);
            navigate('/home');
        }
    };

    const renderTitleInformation = () => (
        <div id='title-info-container'>
            <div>
                Weather App
            </div>
        </div>
    );

    const renderGithubInformation = () => (
        <div id='github-information'>
            <span id='github-label'>Creator GitHub: </span>
            <a className='github-link' href="https://github.com/Jake152" target="_blank" rel="noopener noreferrer">
                github.com/Jake152
            </a>
        </div>
    );

    const renderInstructions = () => (
        <div id='instructions-container'>
            Enter City and State to continue
        </div>
    );

    const renderLocationInput = () => (
        <LocationInput city={city} setCity={setCity} state={state} setState={setState} />
    );

    const renderLocationBtn = () => (
        <div id='location-btn-container'>
            <Button id='btn' label='Continue' onClick={() => handleLocationChange()} disabled={btnDisabled} />
        </div>
    );

    useEffect(() => {
        if (city && state) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [city, state]);

    return (
        <div id='landing-page-container'>
            {renderTitleInformation()}
            {renderGithubInformation()}
            {renderInstructions()}
            {renderLocationInput()}
            {renderLocationBtn()}
        </div>
    )
}