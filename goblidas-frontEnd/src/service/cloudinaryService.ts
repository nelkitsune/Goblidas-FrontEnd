import api from '../components/api/axios';

// Sube una imagen al backend, que la sube a Cloudinary y devuelve la URL
export const uploadImageToCloudinary = async (file: File, detailId?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    // Si tu backend lo espera como form-data:
    if (detailId !== undefined) {
        formData.append('detailId', String(detailId));
    }
    // Si tu backend lo espera como query param:
    const url = detailId !== undefined ? `/image?detailId=${detailId}` : '/image';

    const response = await api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data; // La URL de la imagen subida
};