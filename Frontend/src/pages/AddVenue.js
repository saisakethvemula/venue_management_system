import React, {useEffect, useState} from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, Checkbox, AccordionDetails, List, ListItem, ListItemText } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import 'moment-timezone';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function AddVenue() {
    const navigate = useNavigate();
    const [user,setUser] = useState('');
    const [venueName, setVenueName] = useState('')
    const [venueDesc, setVenueDesc] = useState('')
    const [venueAddress, setVenueAddress] = useState('')
    const [sports, setSports] = useState([])
    const [timeslots, setTimeslots] = useState([])
    const selectTimeslots = ['09:00 AM', '10:00 AM', '11:00 AM','12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
    const formattedTimeslots = selectTimeslots.map(timeslot => moment(timeslot, 'hh:mm A').format('hh:mm A'));

    const auth = getAuth();
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
          });
        if(!auth?.currentUser?.uid){
            alert("SignIn to Continue")
            navigate("/signin")
        }
        return () => unsubscribe();
    },[user])
    
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("/venues/addVenue",{
            ownerId: user,
            name: venueName,
            info: venueDesc,
            address: venueAddress,
            sports: sports,
            timeslots: timeslots,
        }).then(res => {
            // console.log(res)
            if (res.data.error){
                alert(res.data.error)
            } else {
                navigate("/venues")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    return (
        <div>
            <Header />
            <div className='flex flex-col items-center justify-center m-10'>
                <h4 className='m-1'><b>Add a venue!</b></h4>
                <form className='bg-white shadow-md rounded-lg p-8 w-1/3'>                                                                                            
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueName"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}  
                            required                                    
                            placeholder="Enter Venue Name"
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Description</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueDesc"
                            value={venueDesc}
                            onChange={(e) => setVenueDesc(e.target.value)}  
                            required                                    
                            placeholder="Enter Venue Description"                                
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 font-bold mb-2'>Venue Address</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text"
                            label="VenueAddress"
                            value={venueAddress}
                            onChange={(e) => setVenueAddress(e.target.value)} 
                            required                                 
                            placeholder="Enter Venue Address"              
                        />
                    </div>
                    <Accordion>
                        <AccordionSummary className='m-0' expandIcon={<ExpandMoreIcon />}><b>Sports</b></AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {["Soccer", "Tennis", "Football", "Baseball"].map(value => {
                                    return (
                                        <ListItem key={value} className='p-0'>
                                            <Checkbox color='primary' onClick={e => {
                                                if (e.target.checked) {
                                                    setSports([...sports, value])
                                                    console.log([...sports, value])
                                                } else {
                                                    setSports(sports.filter(i => i !== value))
                                                    console.log(sports.filter(i => i !== value))
                                                }
                                            }} />
                                            <ListItemText primary={value}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary className='m-0' expandIcon={<ExpandMoreIcon />}><b>Time Slots</b></AccordionSummary>
                        <AccordionDetails>
                            <List>
                                {formattedTimeslots.map(value => {
                                    return (
                                        <ListItem key={value} className='p-0'>
                                            <Checkbox color='primary' onClick={e => {
                                                if (e.target.checked) {
                                                    setTimeslots([...timeslots, value])
                                                    console.log([...timeslots, value])
                                                } else {
                                                    setTimeslots(timeslots.filter(i => i !== value))
                                                    console.log(timeslots.filter(i => i !== value))
                                                }
                                            }} />
                                            <ListItemText primary={value}/>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <div>
                        <button
                            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                            type="submit" 
                            onClick={onSubmit}
                        >Submit</button>
                    </div>      
                </form>
            </div>
        </div>
    )
}