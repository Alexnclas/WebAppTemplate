import MediaItem from "./MediaItem";

export default function MediaList({ medias }) {
    return(
    <>
        {medias.map(media => (
            <MediaItem key={media._id} media={media}></MediaItem>
        ))}
    </>
    );
}