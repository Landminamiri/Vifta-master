import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import axios from 'axios';

const BreederProtectedRoute = ({children}) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const navigate = useNavigate()
    const { api } = useAppContext()
    
    useEffect(() => {
        const tokenInStorage = localStorage.getItem('token')

        if(!tokenInStorage){
            console.log("No token")
            navigate('/breederLogin')
        } else {
            verifyToken(tokenInStorage)

        }

    }, [])

    const verifyToken = async (token) => {
        console.log("Verify Token ran")

        try {
            
            const request = await axios.post(api+'/controller/auth/verifyToken', {'token': token})
            console.log(request)
            if(request.status == 200){
                setIsLoading(false)
            }else{
                navigate('/breederLogin')
            }

        }catch (error) {
            console.log(error)
            navigate('/login')
        }
    }

    if(isLoading){
        return <div>Loading... </div>;
    }else{
        return <Outlet/>

    }
}

export default BreederProtectedRoute;