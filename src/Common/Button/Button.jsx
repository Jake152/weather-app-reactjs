import React from 'react'

import './Button.css'

export default function Button({ id, label, onClick, disabled }) {
    return (
        <button className='btn' id={id} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}