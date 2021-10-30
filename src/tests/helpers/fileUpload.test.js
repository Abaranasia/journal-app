import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config({ //configuración para cloudinary para borrar fotos tras cada test
    cloud_name: 'djtsqm57m',
    api_key: '799727671337273',
    api_secret: 'CiSP-vu9CZ6gHH3GPOkrrA6NWvA',
    // secure: true
});


describe('fileUpload tests', () => {


    /*     test('should load a file and return the URL ', async (done) => {
    
            const resp = await fetch('https://picsum.photos/200/300.jpg');
            //console.log(resp)
            const blob = await resp.blob(); //guardamos el código binario de la foto en crudo
    
            const file = new File([blob], 'foto.jpg'); // creamos un archivo con el contenido raw de la imagen con el nombre foto.jpg
            const url = await fileUpload(file) //esto debería subir la foto a cloudinary y devolver su correspondiente url
    
            console.log(url);
    
            expect(typeof url).toBe('string');
            expect(url).toContain('https://res.cloudinary.com');
    
            const segments = url.split('/'); //separamos los elementos de la url para obtener el id de la foto en cloudinary
            // console.log(segments);
    
            //const imageId = segments[segments.length - 1].replace('.jpg', ''); // obtenemos el último elemento del objeto y reemplazamos la extensión png por vacío
            //cloudinary.v2.api.delete_resources(imageId, {}, () => { done(); })); //con esto podemos borrar cada foto subida
    
        });
     */

    test('should return an error', async () => {

        const file = new File([], 'foto.jpg'); // creamos un archivo con el contenido raw de la imagen con el nombre foto.jpg
        const url = await fileUpload(file) //esto debería subir la foto a cloudinary y devolver su correspondiente url

        //console.log(url);

        expect(url).toBe(undefined);
        expect(typeof url).toBe('undefined');

    });
});