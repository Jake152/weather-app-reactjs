import React, { useEffect, useState } from "react";
import Input from "../../Common/Input/Input";

import './LocationInput.css';

export default function LocationInput({ city, setCity, state, setState }) {
    return (
        <div id='location-input-container'>
            <Input id='location-city-input' type='text' placeholder='City...' inputValue={city} setInputValue={setCity} />
            <Input id='location-state-input' type='text' placeholder='State...' inputValue={state} setInputValue={setState} />
        </div>
    )
}