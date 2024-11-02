import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MapComponent from "../Map/Map";
import WaitlistsComponent from "./Waitlists/waitlistsComponent";
import Navbar from "./Navbar/navbarComponent";
import { useAppContext } from '../../../context/appContext';

const Dashboard = () => {
    const [ waitlists, setWaitlists ] = useState([])
    const [ formData, setFormData ] = useState({})
    const { api } = useAppContext()


    useEffect(() => {
        fetchWaitlists()
    }, [])

    const fetchWaitlists = async () => {
        await axios.get(api+`/controller/waitlist/getWaitlists`).then( (response) => {
            console.log(response.data)
            setWaitlists(response.data)
        })
    }

    const handleStringInputChange = (indexInState, event) => {
        const { value } = event.target;

        const updatedFormData = {
            ...formData,
            [indexInState]: value
        };

        setFormData(updatedFormData);
    }

    const onFormSubmit = async () => {
        console.log(formData)

        await axios.post(api+'/controller/waitlist/filterWaitlist', formData).then( (response) => {
            console.log(response.data)
            setWaitlists(response.data)
        })

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Search Form</h2>
                <div>
                    <label>Province</label>
                    <input type="text" value={formData.location || ''} onChange={(e) => {handleStringInputChange('location', e)} }></input>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={formData.price || ''} onChange={(e) => {handleStringInputChange('price', e)} }></input>
                </div>
                <div>
                    <label>Availability in months</label>
                    <input type="number" value={formData.availability || ''} onChange={(e) => {handleStringInputChange('availability', e)} }></input>
                </div>
                <div>
                    <label>Breed Type</label>
                    <input type="text" value={formData.breed_type || ''} onChange={(e) => {handleStringInputChange('breed_type', e)} }></input>
                </div>
                <div>
                    <label>Health Details</label>
                    <input type="text" value={formData.health || ''} onChange={(e) => {handleStringInputChange('health', e)} }></input>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <button type="submit" onClick={onFormSubmit}>Search</button>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <WaitlistsComponent waitlists={waitlists} />

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div style={{height: "600px" , width: "600px"}}>
                <MapComponent waitlists={waitlists}/>
            </div>

            
            <br></br>
            <br></br>
            <br></br>

            <Navbar />

        </div>
    );
};

export default Dashboard;