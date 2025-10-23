import MediaList from "./MediaList";
import MediaUpload from "./MediaUpload";
import { useMedias } from "../services/mediaContext";
import { useTranslation } from "react-i18next";

export default function MediaPage() {
    const { medias, isMediasLoading, loadMedias } = useMedias();
    const { t, i18n } = useTranslation();

    return(
    <>
        <h1 class="text-3xl font-bold underline">
            {t("description")}
        </h1>
        <MediaUpload handleMediaUpload={loadMedias}/>
        {
            isMediasLoading ? <p>Loading medias</p> : (
            medias ? (<MediaList medias={medias}></MediaList>) : <p>No medias to show</p>
        )
        }
    </>
    );
}
