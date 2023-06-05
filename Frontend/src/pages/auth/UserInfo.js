import React, { useState } from 'react'
import Header from '../../components/Header';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { sendEmailVerification ,getAuth} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UserInfo() {
  const [username,setUserName] = useState('')
  const auth = getAuth()
  const [phone,setPhone] = useState('')
  const [city,setCity] = useState('')
  const navigate = useNavigate();
  const [isOwner,setIsOwner] = useState(false)
  const myOptions = ['Cricket', 'Tennis', 'Badminton', 'BasketBall', 'football'];
  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectedValuesChange = (event, values) => {
    setSelectedValues(values);
  };
  const handleisOwnerChange=(event)=>{
    setIsOwner(event.target.value)
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.put(`/userupdate/${auth.currentUser.uid}/`,{
      name:username,
      phone,
      city,
      isOwner,
      intrests: selectedValues
    })
    alert('User updated successfully!');
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className='h-screen'>
        <Header />
        <div className='flex flex-col items-center justify-center h-screen'>
          <h4><b>Create your profile here for Better Experience</b></h4>
          <form className='bg-white shadow-md rounded-lg p-8'>
  <div className='mb-6'>
    <label className='block text-gray-700 font-bold mb-2' htmlFor='username'>
      Username
    </label>
    <input 
      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
      id='username'
      type='text'
      value={username}
      onChange={(e) => setUserName(e.target.value)} 
      required                                 
      placeholder='Enter username'              
    />
  </div>
  <div className='mb-6 flex'>
    <div className='mr-4 w-1/2'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='phone'>
        Phone Number
      </label>
      <input 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
        id='phone'
        type='number'
        value={phone}
        onChange={(e)=> setPhone(e.target.value)}
        required
        placeholder='Phone Number'
      />
    </div>
    <div className='w-1/2'>
      <label className='block text-gray-700 font-bold mb-2' htmlFor='city'>
        City
      </label>
      <input 
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
        id='city'
        type='text'
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        required
        placeholder='City'
      />
    </div>
  </div>
  <div className='mb-6'>
    <label className='block text-gray-700 font-bold mb-2' htmlFor='isOwner'>
      Will you add venues to our system?
    </label>
    <select className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
            id='isOwner'
            value={isOwner}
            onChange={handleisOwnerChange}>
      <option value={true}>Yes</option>
      <option value={false}>No</option>
    </select>
  </div>
  <div className='mb-6'>
    <label className='block text-gray-700 font-bold mb-2'>
      Your Favourites
    </label>
    <Autocomplete
      options={myOptions}
      multiple
      defaultValue={[myOptions[3]]}
      getOptionLabel={(option) => option}
      onChange={handleSelectedValuesChange}
      value={selectedValues}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choose Multiple values'
          variant='standard'
          placeholder='Your Favourites'
        />
      )}
    />
  </div>
  <div className='flex justify-between'>
    <button onClick={()=> navigate("/venues")}>
      Skip for now
    </button>
    <button onClick={handleSubmit} className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
      Submit
    </button>
  </div>
</form>


        </div>
    </div>
  )
}

export default UserInfo;