import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActivityCard from '../components/ActivityCard';
import VenueActivities from '../components/VenueActivities';
import VenueBookings from '../components/VenueBookings';

export default function VenueDetails() {
    const { id }= useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState([])
    const [address, setAddress]=useState([])
    const [info, setInfo] = useState("")
    const [sports, setSports] = useState("")
    const [timeslots, setTimeslots] = useState("")
    const [activities, setActivities] = useState([])
    const [bookings,setBookings] = useState([]);
    const [activeTab,setActiveTab] = useState("activities");
    const handleRemove=()=>{
        axios.delete(`/venues/delete/${id}`)
        .then(response => {
            // handle success
            navigate("/venues")
            console.log(response.data.message);
        })
        .catch(error => {
            // handle error
            console.log(error.response.data.error);
        });
    }
    const reload=()=>{
        window.location.reload();
    }
    useEffect(() => {
        axios.get(`/bookings/venues/${id}`).then(res=>{
            if (res.data.error) {
                alert(res.data.error)
            }
            else{
              setBookings(res.data.bookings)
              console.log("wde",res.data.bookings);
            }
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
        axios.get(`/venues/${id}/`).then(res => {
            setVenue(res.data['venue'][0]['name'])
            setAddress(res.data['venue'][0]['address'])
            setInfo(res.data['venue'][0]['info'])
            setSports(res.data['venue'][0]['sports'].join(', '))
            setTimeslots(res.data['venue'][0]['timeslots'].join(', '))
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        axios.get(`/venues/${id}/activities`, {
            venueid: id
        }).then(res => {
            console.log(res.data);
            console.log(res.data['activities'])
            setActivities(res.data['activities'])
            if (res.data.error) {
                alert(res.data.error)
            }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }, [])
    
    return (
        <div>
        <Header />
        <div className=''>
            <h1 className='text-xl font-bold mb-2'>{venue.name}</h1>
            <div className='mb-4'>
                <strong>Venue: </strong>
                <span>{venue}</span>
            </div>
            <div className='mb-4'>
                <strong>Description: </strong>
                <span>{info}</span>
            </div>
            <div className='mb-4'>
                <strong>Address: </strong>
                <span>{address}</span>
            </div>
            <div className='mb-4'>
                <strong>Sports Offered: </strong>
                <span>{sports}</span>
            </div>
            {/* <div className='mb-4'>
                <strong>Availability: </strong>
                <span>{timeslots}</span>
            </div> */}
            <div className='flex flex-col items-center'>
            <div className='flex m-2  justify-between'>
                <button onClick={handleRemove} className='bg-red-500 hover:bg-red-700 text-white font-bold  rounded p-2 ml-auto'>Remove</button>
            </div>
            <button 
                className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                onClick={e => navigate(`/venues/${id}/activities/addActivity`)}>Add Activity
            </button>
            </div>
            <div className="h-10 mt-2 w-screen border border-black border-l-0 rounded-t-lg">
                <div className="flex justify-around items-center h-full px-4">
                    <button onClick={()=>{setActiveTab("bookings")}} className="text-gray-700 font-medium hover:text-gray-900">
                    Bookings
                    </button>
                    <button onClick={()=>{setActiveTab("activities")}}  className="text-gray-700 font-medium hover:text-gray-900">
                    Activities
                    </button>
                </div>
            </div>
            </div>
            {
                activeTab=="activities" ? 
                <VenueActivities activities={activities} reload={()=>reload()} id={id} venue={venue}  /> :
                <VenueBookings bookings={bookings} />
            }
        </div>
    );
}