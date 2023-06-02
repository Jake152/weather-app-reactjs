import React from 'react'

import './Input.css'

export default function Input({ id, type, placeholder, inputValue, setInputValue }) {
    return (
        <input className='input' id={id} type={type} placeholder={placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    )
}