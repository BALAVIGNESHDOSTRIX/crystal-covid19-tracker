import React from 'react'
import {Card, CardContent, Typography } from '@material-ui/core';
import "../css/Info.css";

function InfoBoxes({active, isRed, title, cases, total, ...props}) {
    return (
        <Card className={`infoboxes ${active && "infoboxes--selected"} ${isRed && "infoboxes--red"}`}
           onClick={props.onClick}>
            <CardContent>
                {/* Title */}
                <Typography color="textSecondary" className="infoboxes__title" gutterBottom>
                    {title}
                </Typography>

                {/* Number of Cases */}
                <h1 className={`infoboxes__no_cases ${!isRed && "infoboxes__no_cases--green"}`}>{cases}</h1>
                {/* 1.2M Total */}
                <Typography color="textSecondary" className="infoboxes__total">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBoxes
