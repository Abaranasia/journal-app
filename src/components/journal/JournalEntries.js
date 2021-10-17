import React from 'react'
import { useSelector } from 'react-redux';
import { JournayEntry } from './JournayEntry';

export const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes); // obtenemos del store el listado de notes del usuario

    //console.log(notes);

    //const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="journal__entries ">

            {
                notes.map(note => (
                    <JournayEntry
                        key={note.id}
                        {...note}
                    />
                ))
            }

        </div>
    )
}
