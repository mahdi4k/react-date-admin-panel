import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";

class Loader extends Component {
    render() {

        return (
            <Spinner animation='border' variant="primary" role='status' style={
                {
                    width:'50px' , height:'50px' , margin : 'auto',display:'block'
                }
            }>
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }
}

export default Loader;
