import React from 'react'
import AddNote from './AddNote'

function Home({showAlert}) {

    return (
        <div>
            <AddNote showAlert={showAlert} />
        </div>
    )
}

export default Home