import React from 'react';
import {Link} from "react-router-dom";

const Sidebar = ({homeScreen, UserScreen, UserSubscriptionScreen, packageScreen}) => {
    return (
        <div className='sidebar d-flex align-items-center flex-column'>
            <img className='logo-panel' src="./logo.svg" alt=""/>
            <div className='sidebar-icons'>
                <Link className='w-100' to={'/'}>
                <span className={homeScreen && 'active'}>
                      <svg viewBox="0 0 100 100" className="icon shape-codepen">
                        <use xlinkHref="/img/sidebar/sprite.svg#fr-app"/>
                     </svg>
                </span>
                </Link>
                <Link className='w-100' to={'/users'}>
                    <span className={UserScreen && 'active'}>
                         <svg viewBox="0 0 100 100" className="icon shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-users"/>
                         </svg>
                    </span>
                </Link>
                <Link className='w-100' to={'/subscription'}>
                    <span className={UserSubscriptionScreen && 'active'}>
                        <svg viewBox="0 0 100 100" className="icon shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-userPlus"/>
                        </svg>
                    </span>
                </Link>
                <Link className='w-100' to={'/packages'}>
                    <span className={packageScreen && 'active'}>
                        <svg viewBox="0 0 100 100" className="icon shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-crown"/>
                        </svg>
                    </span>
                </Link>
                <span className='img-profile'>
                    <img src="./img/sidebar/user.png" alt=""/>
                </span>
            </div>
        </div>
    );
};

export default Sidebar;