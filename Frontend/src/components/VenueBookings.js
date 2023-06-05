import React, { useEffect, useState } from 'react'
import axios from "axios";
import HistoryCard from "./HistoryCard";

function VenueBookings({bookings}) {

    const [name,setName] = useState("");
    const [mail,setEmail] = useState("");
    useEffect(()=>{
        axios.get(`/userdetails/${bookings[0]?.uid}/`).then(res => {
            if (res.data.error) {
                alert(res.data.error)
            }
            else{
              setEmail(res.data.user[0]?.email);
              setName(res.data.user[0]?.name);
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
        {bookings.map((data)=>{
            return(
                <HistoryCard userName={name} userEmail={mail} venueName={data.venueName} activityName={data.activityName} bookedDate={data.bookingDate?.slice(0,10)} />
            )
        })}
    </div>
  )
}

export default VenueBookings