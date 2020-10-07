import {Circle, Popup, Marker} from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

export const sortData = (data) => {
    return [...data].sort((a,b) => (a.cases > b.cases ? -1: 1));
}


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 500
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    }
}


//Draw the Circles on the Map
export const showMapData = (data, casesType="cases") => 
    data.map((country) => (
        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.2}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            <Popup>
                <div className="info-container">
                    <div
                    className="info-flag"
                    style={{backgroundImage: `url(${country.countryInfo.flag})`}} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>

        </Circle>
    ));


export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";