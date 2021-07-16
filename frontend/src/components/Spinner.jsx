import React from 'react'

function Spinner() {
    return (
        <div className="w-100 d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
