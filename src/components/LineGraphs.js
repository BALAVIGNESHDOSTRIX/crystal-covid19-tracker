import React, {useState, useEffect} from 'react'
import {Line} from "react-chartjs-2";
import numeral from "numeral";


const constructChartD = (data, extractype='cases') => {
    const chardata = [];
    let lastDatapoint;

    for(let date in data.cases) {
        if(lastDatapoint){
            const newdatapoint = {
                x : date,
                y : data[extractype][date] - lastDatapoint
            }
            chardata.push(newdatapoint);
        }
        else{
            lastDatapoint = data[extractype][date];
        }
    }

    return chardata;

}

function LineGraphs({extractype="cases", ...props}) {
    const [lineData, setLineData] = useState({});

    //https://disease.sh/v3/covid-19/historical/all?lastdays=150

const graph_optins = {
    legend: {
        display: false
    }, 
    elements: {
        point: {
            radius: 0
        }
    },

    maintainAspectRatio: false,

    tooltips: {
        mode: "index", 
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0");
            }
        }
    },

    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat:"ll",
                }
            }
        ],
        yAxes: [
            {
                gridLines:{
                    display: false,
                },
                ticks: {
                    callback: function(value, index, values){
                        return numeral(value).format("0a");
                    }
                }
            }
        ]
    }
}





useEffect(() => {
    const fetchData = async() => {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=150").then(response => response.json())
        .then((data) => {

            const cons_graph_data = constructChartD(data, extractype=extractype);
            setLineData(cons_graph_data);

        });
    }

    fetchData();
}, [extractype]);


const backgroundoptions = {
    cases: {
        backcolor: "#FF0266",
        borderclr: "#FF0234",
    },
    recovered:{
        backcolor: "#7dd71d",
        borderclr: "#7dd72f",
    },
    deaths: {
        backcolor: "#fb4443",
        borderclr: "#FF0266",
    }
}

    return (
        <div className={props.className}>
            {lineData?.length > 0 && (
            <Line 
                options={graph_optins}
                data={
                    {
                        datasets: [
                            {
                                data: lineData,
                                backgroundColor: `${backgroundoptions[extractype].backcolor}`,
                                borderColor: `${backgroundoptions[extractype].borderclr}`,
                            }
                        ]
                    }
                }
                />
            )}
            
        </div>
    )
}

export default LineGraphs
