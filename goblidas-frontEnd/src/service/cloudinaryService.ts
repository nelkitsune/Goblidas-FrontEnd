import api from '../components/api/axios';

// Sube una imagen al backend, que la sube a Cloudinary y devuelve la URL
export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data; // La URL de la imagen subida
};