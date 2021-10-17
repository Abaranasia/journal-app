import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active: activeNote } = useSelector(state => state.notes); //para saber desde el reducer si la nota está o no activa

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">
            <Sidebar />

            <main>
                {
                    (activeNote)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }

            </main>
        </div>
    )
}
