import { useState, useEffect } from 'react';
import { fetchMedias } from './mediaService';

export function useMedias() {
    const [medias, setMedias] = useState([]);
    const [isMediasLoading, setIsMediasLoading] = useState(false);
    const loadMedias = async () => {
            try {
                setIsMediasLoading(true);
                const res =  await fetchMedias();
                setMedias(res); 
            }
            catch (err) {
                console.log('Error fetching medias', err);
            }
            finally {
                setIsMediasLoading(false);
            }
        };
        
    useEffect(() => {
        loadMedias();
    }, []);

    return { medias, isMediasLoading, loadMedias };
}