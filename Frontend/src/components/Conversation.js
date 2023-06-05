import React from 'react'
import { Card, CardContent, Typography} from '@material-ui/core';

export default function Conversation(props) {
    const details = props.details;

    return (
        <Card className='m-2 hover:cursor-pointer' onClick={props.onClick}>
            <CardContent>
                <Typography>
                    { details.name !== undefined ? details.name : details.members.join(", ")}
                </Typography>
            </CardContent>
        </Card>
    );
}