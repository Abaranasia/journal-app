import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';


export const Sidebar = () => {


    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth) // Esto nos permite extrar desde el state el nombre del usuario conectado

    const handleLogout = () => {
        dispatch(startLogout()) //invoca al action de logout en auth.js

    }

    const handleAddNew = () => {
        dispatch(startNewNote());

    }


    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    {name}
                </h3>
                <button className="btn" onClick={handleLogout}>Lougout</button>
            </div>

            <div className="journal__new-entry" onClick={handleAddNew}>
                <i className="far fa-calendar-plus fa-3x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
