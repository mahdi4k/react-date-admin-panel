import React from 'react';

const UserList = ({premium, blocked, setUserDetail}) => {

    const userClicked = () => {
        setUserDetail(true)
    }
    return (
        <div>
            <div onClick={userClicked} className=' users-list d-flex mt-4 flex-wrap flex-column flex-xl-row'>
                <div className='pl-3 col-12 col-xxl-4  flex-column flex-xl-row
                    pr-md-3 pr-lg-5 py-md-4 user-detail text-center text-xl-left'>
                    <img src="./img/user.jpg" alt=""/>
                    <div className='ml-3'>
                        <p className='name'>Isabella Clark</p>
                        <p className='email'>isabella789ck@gmail.com</p>
                    </div>
                </div>
                {premium ?
                    <div
                        className='Account-status col-12 col-xxl-3 justify-content-xxl-center
                        justify-content-center justify-content-lg-end premium '>
                        <svg viewBox="0 0 100 100" className="icon mr-3 shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-crown"/>
                        </svg>
                        <p>premium</p>
                    </div>
                    :
                    <div
                        className='Account-status col-12 col-xxl-3 justify-content-xxl-center
                        justify-content-center justify-content-lg-end  '>
                        <i className="fal fa-user"></i>
                        <p>Normal User</p>
                    </div>
                }

                <div className='user-setting col-xxl-5 col-12 flex-column flex-lg-row'>
                    <div className='d-flex align-items-center'>
                        <i className="fal fa-clock"></i>
                        <p>2/16/2021</p>
                    </div>
                    {blocked ?
                        <div className='d-flex align-items-center'>
                        <span className='block'>
                             <i className="fal fa-ban"> </i>
                            <p>Unlock</p>
                        </span>

                        </div>
                        :
                        <div className='d-flex align-items-center'>
                        <span className='ban'>
                             <i className="far fa-unlock"></i>
                        </span>
                            <span className='delete ml-2'>
                                    <i className="fal fa-times"> </i>
                            </span>
                        </div>
                    }


                </div>
            </div>
        </div>
    );
};

export default UserList;