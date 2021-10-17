export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/djtsqm57m/image/upload'; //APi para subidas a nuestra carpeta de cloudinary

    const formData = new FormData(); //Clase que permite crear formularios para envío con pares clave: valor

    formData.append('upload_preset', 'journalApp'); // Enviamos el nombre del endpoint en el campo upload_preset
    formData.append('file', file); // Enviamos el archivo en el campo file

    try {
        const resp = await fetch(cloudUrl, { //respuesta del envío del form a nuestra API
            method: 'POST',
            body: formData
        });
        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;

        } else {
            throw await resp.json();
        }
    } catch (error) {
        console.log(error)
    }


    //return url de la foto
}
