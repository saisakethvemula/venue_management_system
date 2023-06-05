import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ActivityCard from '../components/ActivityCard';

export default function VenueCustomerDetails() {
    const { id }= useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState([])
    const [venueid,setVenueId] = useState([])
    const [address, setAddress]=useState([])
    const [info, setInfo] = useState("")
    const [sports, setSports] = useState("")
    const [timeslots, setTimeslots] = useState("")
    const [activities, setActivities] = useState([])
    const [rating, setRating] = useState(0);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get("/user").then((res) => {
          setUserId(res.data.id);
        }).catch((error) => {
          console.log(error);
        });
      
        axios.get(`/uservenues/${id}`).then(res => {
          setVenue(res.data['venue'][0]['name'])
          setVenueId(id)
          setAddress(res.data['venue'][0]['address'])
          setInfo(res.data['venue'][0]['info'])
          setSports(res.data['venue'][0]['sports'].join(', '))
          setTimeslots(res.data['venue'][0]['timeslots'].join(', '))
          setRating(res.data['venue'][0]['rating'])
          if (res.data.error) {
            alert(res.data.error)
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      
        axios.get(`/uservenues/${id}/useractivities`, {
          venueid: id
        }).then(res => {
          // console.log(res.data['activities'])
          setActivities(res.data['activities'])
          if (res.data.error) {
            alert(res.data.error)
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      }, []);

      const handleRating = (value) => {
        axios.post(`/uservenues/${id}/rating`, {
          userId: userId,
          rating: value
        }).then(res => {
          setRating(res.data.rating)
          if (res.data.error) {
            alert(res.data.error)
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      };
      
      
    
      return (
        <div>
          
          <Header />
          <div className='m-4'>
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
            <button
                className='text-white font-bold py-2 px-4 rounded bg-purple-600 hover:bg-purple-700 '
                onClick={(e) =>
                  navigate(
                    `/uservenues/${venueid}/useractivities/bookslot/${id}`
                  )
                }
              >
                Book Slot
              </button>
          </div>
          <div className='m-4'>
            <strong>Venue Rating: </strong>
            <span>{rating}</span>
            <div>
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`} onClick={() => setRating(star)}>★</button>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
            {   
              activities.map(value => {
                return (
                  <ActivityCard access="user" venueId={venueid} venueName={venue} key={value._id} id={value._id}  activityId={value._id} name={value.name} timeslot={value.timeslot} info={value.info} availability={value.availability}/>
                )
              })
            }
          </div>
      
          
        </div>
      );      
}