import React, {useState, useEffect} from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import "../css/App.css";
import "leaflet/dist/leaflet.css";
import InfoBoxes from '../components/InfoBoxes.js';
import Table from  "../components/Table.js";
import {sortData, prettyPrintStat} from "../utils/tools.js";
import LineGraphs from "../components/LineGraphs";
import Map from "../components/Map.js";

//https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState(['USA', 'UK', 'INDIA']);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [CasesType,setCasesType] = useState("cases");
  // Here all Varibale Declaration is state


  useEffect(() => {

    console.log("Google")

    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });

  }, []);


  //UseEffect is used for run the method based on the condition
  useEffect(() => {
    //Runs When component is loads. Only one time 
    const getAllCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ));
          
          const sorted_d = sortData(data);
          setCountries(countries);
          setTableData(sorted_d);
          setmapCountries(data);
      });
    }

    getAllCountries();
  }, []);


  //Listen the Selection Value 
  const Onchange = async (event) =>{
    const countrycode = event.target.value;
    // https://disease.sh/v3/covid-19/v3/covid-19/countries/{COUNTRY_CODE}
    // https://disease.sh/v3/covid-19/all

    const url = countrycode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url).then(response => response.json()).then(data => {
      setCountryInfo(data);
      setCountry(countrycode);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  }
  return (
    <div className="app">
      <div className="app__left">

      {/* Header */}
      {/** Title + Selector Input Boxes */}
      <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={Onchange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {
                countries.map((country) => (<MenuItem value={country.value}>{country.name}</MenuItem>))
              }
            </Select>
          </FormControl>
      </div>

      {/* InfoBoxes */}      
      <div className="app__infoboxes">
      <InfoBoxes casesType={CasesType === "cases"} isRed onClick={(e) => setCasesType("cases")} title="CornoVirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/> 
      <InfoBoxes active={CasesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="CornoVirus Recovered" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
      <InfoBoxes active={CasesType === "deaths"} isRed onClick={(e) => setCasesType("deaths")} title="CornoVirus Deaths" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
      </div>

      {/* Maps */}
      <Map casesType={CasesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>

      <Card className="app__right">
          {/* Tbales */}
          <CardContent>
            <h1>Live Cases by Country</h1>
            <Table countries={tableData}/>
          </CardContent>
          {/* Graphs */}
          <h3 className="graph__title">Worldwide New {CasesType}</h3>
          <LineGraphs extractype={CasesType} className="app__graphs"/>
      </Card>
    </div>
  );
}

export default App;
