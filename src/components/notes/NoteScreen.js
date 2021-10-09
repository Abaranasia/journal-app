import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Título sorprendente"
                    className="notes__title-input"
                />
                <textarea
                    placeholder="Cuénta qué pasó hoy"
                    className="notes__textarea"
                >
                </textarea>
                <div className="notes__image">
                    <img
                        src="https://fotos.hoteles.net/articulos/mejores-puestas-sol-cadiz-6643-1.jpg"
                        alt="día"
                    />
                </div>

            </div>
        </div>
    )
}
