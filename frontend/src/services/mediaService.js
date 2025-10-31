import axios from 'axios';
const BASE_URL = "/api/medias";

const api = axios.create({
  baseURL: BASE_URL
});

export const fetchMedias = async (page = 1, limit = 20) => {
  const response = await axios.get(BASE_URL, {
    params: { page, limit },
  });
  return response.data;
};

export const fetchMediaById = (id) => api.get(`/${id}`);

export const getMediaFileUrl = (id) => api.get(`/${id}/presigned-url`);

export const createMedia = async (file, metadata) => {
  try {
    const { data } = await axios.post(BASE_URL, {
      filename: file.name,
      contentType: file.type,
      ...metadata
    });

    const { uploadUrl, mediaId } = data;

    await fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type }
    });

    return mediaId; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};



export default api;

