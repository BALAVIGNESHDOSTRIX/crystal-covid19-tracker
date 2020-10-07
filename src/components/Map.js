import React from 'react';
import {Map as LeafletMap, TileLayer} from "react-leaflet";
import "../css/Map.css";
import {showMapData} from "../utils/tools.js";


function Map({casesType, countries, center, zoom}) {
    // console.log("google", casesType);
    console.log(countries, "feature")
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreeMap</a> contributions'/>
            
            {/* Loop through the countries to create the circle */}
            
            {showMapData(countries, casesType=casesType)}
            </LeafletMap>

        </div>
    )
}

export default Map
