import React from 'react'
import ActivityCard from './ActivityCard'

function VenueActivities({activities,reload,id,venue}) {
    console.log("venueacticard",activities);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-screen'>
    {
        activities?.map(value => {
            return (
                <ActivityCard access="owner" reload={()=>reload()} venueId={id} venueName={venue} key={value._id} id={value._id} name={value.name} info={value.info} timeslot={value.timeslot} availability={value.availability}/>
            )
        })
    }
</div>
  )
}

export default VenueActivities