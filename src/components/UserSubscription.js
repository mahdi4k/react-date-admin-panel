import React from 'react';
import {Col} from "react-bootstrap";
import moment from "moment";

const UserSubscription = ({subscribeData}) => {
    console.log(subscribeData)
    return (

        <Col xl={3} md={4} className='mb-4'>
            <div className='user-sub-box'>
                <img src={`${process.env.REACT_APP_BASE_URL}${subscribeData.image.url}`} alt=""/>
                <p className='userName pt-4 font-weight-bold'>{subscribeData.username}</p>
                <p className='userEmail pt-2 pb-4'>{subscribeData.email}</p>
                <div>
                    <button className='btn premium mr-2'>PREMIUM</button>
                    <button className='btn lightBlue'>£55/MONTH</button>
                </div>
                <div className='footer w-100'>
                    <div className='align-items-center d-flex position-relative justify-content-center w-100'>
                        <i className="fal fa-clock"></i>
                        <p>{moment(subscribeData.premiumFrom).format('YYYY-MM-DD')}</p>
                    </div>
                    <div className='align-items-center d-flex justify-content-center w-100'>
                        <i className="fal fa-clock"></i>
                        <p>{moment(subscribeData.premiumUntil).format('YYYY-MM-DD')}</p>
                    </div>
                </div>
            </div>
        </Col>

    );
};

export default UserSubscription;
