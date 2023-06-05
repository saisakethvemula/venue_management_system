import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button} from '@material-ui/core';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
export default function ActivityCard(props) {
    const venueId = props.venueId
    const venueName = props.venueName;
    const id = props.id
    const name = props.name;
    const access = props.access;
    const availability = props.availability;
    const timeslot = props.timeslot;
    const info = props.info;
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const navigate = useNavigate();

    const handleRemove=(e)=>{
        e.preventDefault();
        axios.delete(`/venues/${venueId}/activities/delete/${id}`)
        .then(response => {
            // handle success
            props.reload()
        })
        .catch(error => {
            // handle error
            console.log(error.response.data.error);
        });
    }

    const handleBooking = (e) =>{
        e.preventDefault();
        console.log(userId)
        axios.post(`/bookings/booknow`,{
            venueId:venueId,
            venueName:venueName,
            activityName:name,
            activityid:id,
            userId:userId
        })
        .then(response => {
            console.log(response.data)
            const bookingstatus = response.data
            if ('error' in bookingstatus){
                console.log('booking already exists')
            }
            else{
                const current_url = window.location.protocol + "//" + window.location.hostname + "/user-profile"
                console.log(current_url)
                axios.post("/stripe/payment-checkout",{venueName:venueName,venueId:venueId,
                    activityName:name,activityId:id,uid:userId, current_url:current_url})
                .then((res)=>{
                    if(res.data.url){
                      window.location.href = res.data.url;
                    }
                })
                .catch((err)=>console.log(err.message))
            }
        })
        .catch(error => {
            // handle error
            console.log(error.response.data.error);
        });
    }

    return (
        <Card className='m-2 hover:cursor-pointer'>
            {access === "owner" ? (
                <button onClick={handleRemove} className=' m-2 bg-red-500 flex hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto'>
                Remove
                </button>
            ) : (
                <></>
            )}
            <CardContent>
                <Typography>Name: {name}</Typography>
                <Typography>Info: {info}</Typography>
                <Typography className='mt-1'>Timeslot: {timeslot}</Typography>
                <Typography className='mt-1'>Availability: {availability}</Typography>
                <Typography>
                {access === "user" && (
                    // <button
                    // className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                    // onClick={e =>
                    //     navigate(
                    //     `/uservenues/${venueId}/useractivities/bookslot/${id}`
                    //     )
                    // }>
                    // Book Slot
                    // </button>
                    <button
                    className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                    onClick={handleBooking}
                    >
                        Book Now
                    </button>
                )}
                </Typography>
            </CardContent>
</Card>

    );
}