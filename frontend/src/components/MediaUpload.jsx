import { useState, useEffect } from "react";
import { createMedia } from "../services/mediaService"; // useMedias

export default function MediaUpload({ handleMediaUpload }) {

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    
    useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert('Please select a file');

        const metadata = {
            title,
            description,
            tags: tags.split(',').map(t => t.trim()),
        };

        try {
            await createMedia(file, metadata);
            setFile(null);
            setTitle('');
            setDescription('');
            setTags('');
            handleMediaUpload()
        } catch (err) {
            console.error('Upload error', err);
            alert('Upload failed');
        }
    };

    const renderPreview = () => {
        if (!file) return null;

        const type = file.type.split('/')[0];

        if (type === 'image') return <img src={preview} alt="preview" width="300" />;
        if (type === 'video') return <video src={preview} controls width="300" />;
        if (type === 'audio') return <audio src={preview} controls />;
        return <p>Cannot preview this file type</p>;
    };

    
    return(
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <input type="file" accept="image/*,video/*,audio/*" onChange={e => setFile(e.target.files[0])} />
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="text" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
            <div className="my-3">{renderPreview()}</div>
            <button type="submit">Upload</button>
        </form>
    );

}
