import React from 'react'

function Alert({ message, type }) {
    return (
        <div className='d-flex justify-content-center' style={{ marginTop: "5rem" }}>
            {message && <div className={`alert w-75 alert-${type} alert-dismissible fade show text-center`} role="alert">
                <strong className=''>{message}</strong>
            </div>}

        </div>
    )
}

export default Alert