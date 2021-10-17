import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);


    const handleSave = () => { // guarda una nota
        dispatch(startSaveNote(active))
    }

    const handlePictureClick = () => { //redirige el evento del envío de imagen
        document.querySelector('#fileSelector').click()
    }


    const handleFileChange = (e) => { //gestiona el envío de la imagen
        const file = (e.target.files[0]);
        console.log('FILE: ', file)
        if (file) { dispatch(startUploading(file)) }

    }
    return (
        <div className="notes__appbar">
            <span> 25 de septiembre de 2021</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>

        </div>
    )
}
