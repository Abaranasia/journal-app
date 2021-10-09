import { useState } from 'react'

export const useForm = (initialState = {}) => {

    /* Custom hook que nos permite almacenar valores cualesquiera desde cualquier formulario */

    const [values, setValues] = useState(initialState);

    const reset = () => { // método para limpiar el formulario
        setValues(initialState)
    }

    const handleInputChange = ({ target }) => { // desestructuramos e.target por comodidad        

        setValues({
            ...values,
            [target.name]: target.value // asi estamos guardando el nombre y el valor del objeto de formulario, tomando como nombre el nombre del objeto del formulario
        })

    }

    return [values, handleInputChange, reset]
}
