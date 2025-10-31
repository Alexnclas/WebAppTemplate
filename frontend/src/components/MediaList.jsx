import MediaItem from "./MediaItem";

export default function MediaList({ medias }) {
    return(
    <>
        {Array.isArray(medias) && medias.map(media => (
            <MediaItem key={media._id} media={media}></MediaItem>
        ))}
    </>
    );
}