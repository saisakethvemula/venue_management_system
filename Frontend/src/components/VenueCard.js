import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';

export default function VenueCard(props) {
    const name = props.name;
    const description = props.description;
    const address = props.address;
    const sports = props?.sports?.join(', ');
    const timeslots = props.timeslots === undefined ? [] : props.timeslots.join(', ');


    return (
        <Card className='m-1.5 hover:cursor-pointer flex flex-col w-full' onClick={props.onClick}>
            <CardContent>
                <Typography><b>{name}</b></Typography>
                <Typography>{description}</Typography>
                {/* <Typography className='mt-1'>Address:</Typography> */}
                <Typography>{address}</Typography>
                <Typography className='mt-1'>Sports Offered:</Typography>
                <Typography>{sports}</Typography>
                {/* <Typography className='mt-1'>Available:</Typography>
                <Typography>{timeslots}</Typography> */}
            </CardContent>
</Card>
    );
}