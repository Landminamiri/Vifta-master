import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { Link } from "react-router-dom";

const MapComponent = ({waitlists}) => {
    const [markerOpen, setMarkerOpen] = useState({})
    
    useEffect(()=>{
        const newMarkerOpen = {}

        waitlists.forEach((waitlist) => {
            console.log(waitlist)

            newMarkerOpen[waitlist._id] = false
        });
        
        setMarkerOpen(newMarkerOpen)
    }, [waitlists])

    const toggleMarker = (waitlist_id) => {
        console.log("Test??")
        const updatedMarkerOpen = {...markerOpen}
        updatedMarkerOpen[waitlist_id] = !updatedMarkerOpen[waitlist_id]
        console.log(updatedMarkerOpen)
        setMarkerOpen(updatedMarkerOpen)
    }

    const center_map = {
        lat:  55.109134,
        lng: -92.939367
    }

    return (
        <APIProvider apiKey="AIzaSyCrRF8RGZE5KZjlbthjN8wxgCBfuTI964o">
            <div style={{height: "600px", width: "100%"}}>
                <Map zoom={4} center={center_map} mapId={"ea537f6a8be0b16b "}>
                    { waitlists.length > 0 && (
                        waitlists.map( (waitlist, index) => (
                            <div key={index}>
                                <AdvancedMarker position={waitlist.location} onClick={(e)=>{toggleMarker(waitlist._id)}} >
                                    <Pin background={"red"} borderColor={"black"} glyphColor={"white"}/>
                                </AdvancedMarker>
                                { markerOpen[waitlist._id] && 
                                    <InfoWindow position={waitlist.location} onCloseClick={(e)=>{toggleMarker(waitlist._id)}}>
                                        <h3>{waitlist.breed_type}</h3>
                                        Price: {waitlist.price} <br></br>
                                        Waitlist: {waitlist.availability} years <br></br>

                                        <Link to={"/waitlist/"+waitlist._id}>View More</Link>
                                    </InfoWindow>
                                }
                            </div>
                        ))
                    )}
                </Map>
            </div>

        </APIProvider>
    )
}

export default MapComponent;