import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useForm } from '../../hooks/useForm';

import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: actvNote } = useSelector(state => state.notes); //obtiene la info de la nota activa
    const [formValues, handleInputChange, reset] = useForm(actvNote);
    const { body, title, id } = formValues;

    const activeId = useRef(actvNote.id); // Almacena una variable mutable que no va a redibujar todo el componente si cambia


    useEffect(() => { //Esto se disparará solo cuando la id de la nota activa cambie

        if (actvNote.id !== activeId.current) { // Si la nota activa es diferente de la actual, necesitamos resetear el form
            reset(actvNote);
            activeId.current = actvNote.id // Actualizamos y ahora la activa será la actual
        }

    }, [actvNote, reset])


    useEffect(() => {
        //console.log(formValues)
        dispatch(activeNote(formValues.id, { ...formValues })); //despachamos la acción (no confundir con actvNote) y le enviamos el contenido del form

    }, [formValues, dispatch])

    const handleDelete = () => { // Borra una nota
        dispatch(startDeleting(id)) //pasamos el id obtenido desde formValues
    }

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Título sorprendente"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="Cuénta qué pasó hoy"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    (actvNote.url) &&
                    (<div className="notes__image">
                    <img
                            src={actvNote.url}
                        alt="día"
                    />
                    </div>)
                }
            </div>

            <button className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}
