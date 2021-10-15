import { db } from "../firebase/firebaseConfig";


export const loadNotes = async (uid) => {

    const notesSnap = await db.collection(`${uid}/journal/notes`).get(); // referencia a la colección de notas
    const notes = [];

    /** Aunque los datos de noteSnap no tengan apariencia clara de datos, estos están ahí, 
     * pero para acceder a ellos Firebase provee una función específica llamada data() a la que debemos acceder recorriendo sus subelementos*/

    notesSnap.forEach(snapHijo => {
        //console.log("NOTE: ", snapHijo.data());

        notes.push({
            id: snapHijo.id, // el id lo obtenemos directamente desde el snap
            ...snapHijo.data() // los datos de cada elemento los obtenemos mediante la función data() de firebase
        })

        //console.log("NOTES: ", notes) 
    });

    return notes;
}
