import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBowlFood } from '@fortawesome/free-solid-svg-icons';
import { faBowlRice } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'; 

export const Sidebar = () => {

    const [activeTab, setActiveTab] = useState(window.location.pathname);

    const navigate = useNavigate();

    const handleRouting = (route) => {
        navigate(route);
        setActiveTab(route);
    };

    function isActiveTab(tab) {
        return tab === activeTab;
    }

    return (
        <nav className='sidebar' id="sidebar">
            <ul>
                <li className={isActiveTab("/profile") ? "sidebar-btn active-tab" : "sidebar-btn"} onClick={() => handleRouting("/profile")}>
                    <div className="sidebar-btn-wrapper">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="sidebar-btn-label">Profile</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
                <li className={isActiveTab("/home") ? "sidebar-btn active-tab" : "sidebar-btn"} onClick={() => handleRouting("/home")}>
                    <div className="sidebar-btn-wrapper">
                        <FontAwesomeIcon icon={faHouse} />
                        <p className="sidebar-btn-label">Home</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
                <li className={isActiveTab("/foodlist") ? "sidebar-btn active-tab" : "sidebar-btn"} onClick={() => handleRouting("/foodlist")}>
                    <div className="sidebar-btn-wrapper">
                        <FontAwesomeIcon icon={faBowlRice} />
                        <p className="sidebar-btn-label">Food List</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
                <li className={isActiveTab("/mealplan") ? "sidebar-btn active-tab" : "sidebar-btn"} onClick={() => handleRouting("/mealplan")}>
                    <div className="sidebar-btn-wrapper">
                        <FontAwesomeIcon icon={faBowlFood} />
                        <p className="sidebar-btn-label">Meal Plan</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
                <li className={isActiveTab("/settings") ? "sidebar-btn active-tab" : "sidebar-btn"} onClick={() => handleRouting("/settings")}>
                    <div className="sidebar-btn-wrapper">
                        <FontAwesomeIcon icon={faGear} />
                        <p className="sidebar-btn-label">Settings</p>
                    </div>
                    <FontAwesomeIcon icon={faAngleRight} />
                </li>
            </ul>
        </nav>
    )
}
