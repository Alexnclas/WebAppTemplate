import {getMediaFileUrl} from "../services/mediaService";
import { useState, useEffect } from "react";

export default function MediaItem({ media }) {
  const { title, description, tags, storageKey } = media;

  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await getMediaFileUrl(media._id);
      setUrl(res.data.url);
    };
    fetchUrl();
  }, [media._id]);


  const isVideo = storageKey.endsWith(".mp4") || storageKey.endsWith(".mov");
  const isAudio = storageKey.endsWith(".mp3") || storageKey.endsWith(".wav");
  const isImage = storageKey.match(/\.(jpg|jpeg|png|gif)$/);

  return (
    <>
      {media && (<div className="p-3 border rounded mb-3">
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Tags: {tags}</small>
        {isVideo && <video src={url} controls width="300" />}
        {isAudio && <audio src={url} controls />}
        {isImage && <img src={url} alt={title} width="300" />}
      </div>)}
    </>
  );
}
