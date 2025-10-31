import { getExternalAPI } from "../services/externalAPIService";
import { useState, useEffect } from "react";

export default function ExternalAPIPage() {

    const [item, setItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleButtonClick = ()=>{
        setCurrentPage(currentPage + 1);
        console.log("Updating currentpage", currentPage);
    }
    
    useEffect(() => {
    const fetchItems = async () => {
        const res = await getExternalAPI(currentPage);
        console.log("external call reesfs", res)
        setItem(res);
    };
    fetchItems();
    }, [currentPage]);


    return(
    <>
        <button onClick={handleButtonClick}>Get next item</button>
        <p>This is an external API Call:</p>
        {item && <p>Current item: {item.title}</p>}

    </>
    );
}