import React from 'react';
import {Alert} from "react-bootstrap";

const Message = ({ErrorsMessage}) => {
    const errors = Object.values(ErrorsMessage)
    return (
        <>
            {errors.map((error , row ) =>(
                <Alert key={row} variant='danger'>{error}</Alert>
            ))}
        </>
    );
};

export default Message;
