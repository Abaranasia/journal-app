import React from 'react';
import moment from "moment";
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

export const JournayEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeNote(id, { //Envía al state del store la nota seleccionada y la define como activa
            date, title, body, url
        }))
    }

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>
            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVkkZjXvk82ffyCBUJOEtt8fNbVpLUh2mpw&usqp=CAU)'
                    //backgroundImage: `url(${url})`
                }}
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h5>{noteDate.format('D')} - {noteDate.format('MMM')}</h5>
            </div>
        </div>
    )
}
