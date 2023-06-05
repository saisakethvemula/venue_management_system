import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import VenueCard from '../components/VenueCard';
import { Backdrop } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function OwnerView() {
    const navigate = useNavigate();
    const [venues, setVenues] = useState([])
    const auth = getAuth();

    useEffect(() => {
        if(auth?.currentUser?.uid){
            
        }else{
            alert("Sign In to Continue")
            navigate("/signin")
        }
        axios.get(`/venues/owner/${auth?.currentUser?.uid}`).then(res => {
            setVenues(res.data['venues'])
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    }, [auth])
    return (
    <div>
        <Header />
        <div className='flex flex-col items-center justify-center m-4'>
            <div className='flex w-full justify-around'>
                <div className='w-1/12'></div>
                <h4 className='w-1/8'><b>Venue Owner View</b></h4>
                <button
                    className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-1/12' 
                    onClick={e => navigate("./addVenue")}>Add Venue</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' style={{width: '95vw'}}>
                {
                    venues?.map(value => {
                        return (
                            <VenueCard 
                            owner={true}
                            key={value._id} 
                            id={value._id} 
                            name={value.name} 
                            description={value.info} 
                            address={value.address} 
                            sports={value.sports} 
                            timeslots={value.timeslots}
                            onClick={e => navigate(`/venues/${value._id}/activities`)}/>
                        )
                    })
                }
            </div>
        </div>
    </div>
    )
}