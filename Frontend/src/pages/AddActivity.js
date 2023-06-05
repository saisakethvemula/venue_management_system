import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionSummary, Checkbox, Radio, RadioGroup, AccordionDetails, List, ListItem, ListItemText, FormControlLabel } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import 'moment-timezone';

export default function AddActivity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availability, setavailability] = useState('');
  const [activityName, setActivityName] = useState('');
  const [activityInfo, setActivityInfo] = useState('');
  const [timing, setTiming] = useState('');
  const [chargeable, setChargeable] = useState(false)
  const selectTimeslots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM','01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  const formattedTimeslots = selectTimeslots.map(timeslot => moment(timeslot, 'hh:mm A').format('hh:mm A'));

  const handleActivityNameChange = (event) => {
    setActivityName(event.target.value);
  };

  const handleActivityInfoChange = (event) => {
    setActivityInfo(event.target.value);
  };

  const handleavailabilityNameChange = (event) => {
    setavailability(event.target.value);
  };

  const handleTimingChange = (event) => {
    setTiming(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/venues/${id}/activities/addActivity`,{
        name: activityName,
        venueid: id,
        info:activityInfo,
        timeslot: timing,
        availability: availability,
        chargeable:chargeable
    }).then(res => {
        console.log(res)
        if (res.data.error){
            alert(res.data.error)
        } else {
            navigate(`/venues/${id}/activities`)
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Add Activity</h1>
      <form onSubmit={handleSubmit} className="w-2/3 flex flex-col items-center">
        <div className="mb-6">
          <label htmlFor='activity-name' className="block text-gray-700 font-bold mb-2">Activity Name:</label>
          <input
            id='activity-name'
            type='text'
            value={activityName}
            onChange={handleActivityNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor='activity-info' className="block text-gray-700 font-bold mb-2">Activity Info:</label>
          <input
            id='activity-info'
            type='text'
            value={activityInfo}
            onChange={handleActivityInfoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Venue:</label>
          <input
            id='venue' 
            type='text' 
            value={venue} 
            onChange={handleVenueChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          />
        </div> */}
        {/* <div className="mb-6">
          <label className='block text-gray-700 font-bold mb-2'>Timing:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='timing'
            type="text"
            value={timing}
            onChange={handleTimingChange}
          />
        </div> */}
		<Accordion>
			<AccordionSummary className='m-6' expandIcon={<ExpandMoreIcon />}><b>Time Slot</b></AccordionSummary>
			<AccordionDetails>
			<RadioGroup
				aria-labelledby="demo-controlled-radio-buttons-group"
				name="controlled-radio-buttons-group"
				value={timing}
				onChange={handleTimingChange}
			>
				<List>
					{formattedTimeslots.map(value => {
						return (
							<ListItem key={value} className='p-0'>
								<FormControlLabel value={value} control={<Radio />} label={value} />
								{/* <ListItemText primary={value}/> */}
							</ListItem>
						);
					})}
				</List>
			</RadioGroup>
			</AccordionDetails>
		</Accordion>
        <div className="mb-6">
          <label className='block text-gray-700 font-bold mb-2'>Capacity:</label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='availability'
            type="text"
            value={availability}
            onChange={handleavailabilityNameChange}
          />
        </div>
        <FormControlLabel control={<Checkbox className='bg-purple-600 hover:bg-purple-700' color='primary' checked={chargeable} onChange={(e) => setChargeable(e.target.checked)}/>} label="Chargable" />
        <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type='submit'>Submit</button>
      </form>
    </div>
  );
}