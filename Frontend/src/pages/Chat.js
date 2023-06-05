import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Conversation from '../components/Conversation';
import { Typography } from '@mui/material';
import {Input} from '@material-ui/core'

export default function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([])
    const [msgs, setMsgs] = useState([])
    useEffect(() => {
        let conversations = [{
            "id": 1,
            "members": ["John Smith", "Jane Smith", "Thomas Baker", "Samuel Jackson"], 
            "name": undefined, 
            "messages": [{
                "sender": "John Smith", 
                "msg": "Hello everyone, my name is John Smith!", 
                "read-by": ["Jane Smith"]
            }, 
            {
                "sender": "Jane Smith", 
                "msg": "Hello everyone, my name is Jane Smith!", 
                "read-by": ["John Smith"]
            }]
        }];
        setConversations(conversations)
        // axios.get(`/conversations`).then(res => {
        //     console.log(res.data)
        //     if (res.data.error)
        //         alert(res.data.error)
        // }).catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage);
        // });
        if (id !== undefined)
            setMsgs(conversations.find(value => value.id === parseInt(id)).messages);
    }, [])

    const sendMsg = (query) => {
        setMsgs(msgs => [...msgs, {
            "sender": "John Smith", 
            "msg": query, 
            "read-by": ["Jane Smith"]
        }]);
        // axios.post(`/conversations/${id}/addMsg`, {
        //     msg: query
        // }).then(res => {
        //     console.log(res.data)
        //     if (res.data.error)
        //         alert(res.data.error)
        // }).catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorCode, errorMessage);
        // });
    };

    return (
    <div>
        <Header />
        <div className='flex' style={{ height: '90vh'}}>
            <div className='w-1/3'>
                <div className='grid grid-cols-1'>
                    {
                        conversations.map(value => {
                            return (
                                <Conversation details={value} onClick={event => navigate(`/chat/${value.id}`)} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='w-2/3'>
                { id !== undefined ? 
                    <div className='border-solid border-2 rounded m-2' style={{height: '85vh'}}>
                        {
                            msgs.map(value => {
                                return (
                                    <Typography>{value.msg}</Typography>
                                )
                            })
                            
                        }
                    </div> : undefined
                }
                { id !== undefined ? 
                    <Input id='Message' placeholder='Type message' className="w-3/4 border-solid border-2 border-gray rounded h-8 p-2" onKeyDown={e => {
                        if (e.key === 'Enter') {
                            sendMsg(e.target.value);
                            e.target.value = ''
                        }
                    }}/> : undefined
                }
                
            </div>
        </div>
    </div>
    )
}