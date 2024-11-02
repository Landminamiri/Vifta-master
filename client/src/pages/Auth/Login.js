import { Box, Button, Grid, Input, InputLabel, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Title from "../Homepage/Title"
import { useAppContext } from "../../context/appContext"
import { Link, useNavigate } from 'react-router-dom';

const apiLink = "https://vifta-mvp-9818ad49d787.herokuapp.com"
const local = "http://localhost:5000"
const api = apiLink

const Login = () => {
    const {user, loginUser} = useAppContext();
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    const handleInput = (event, key) => {
        const value = event.target.value
        const updateFormData = {...formData}

        updateFormData[key] = value
        
        setFormData(updateFormData)
    }

    useEffect(() => {
        const tokenInStorage = localStorage.getItem('token')
    
        if(tokenInStorage){
            verifyToken(tokenInStorage)
        }
        

    }, [user])

    const verifyToken = async (tokenInStorage) => {
        try{
            const request = await axios.post(api+'/controller/auth/verifyToken', {'token': tokenInStorage})
            if(request.status == 200){
                navigate("/homepage")
            }
        } catch(error) {
            // console.log(error)
            console.log("Token unauthorized.")
            localStorage.removeItem('token')
            localStorage.removeItem('users')
        }
       

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        const currentUser = {email, password}
        console.log(currentUser)
        
        loginUser(currentUser);
    }

    return (
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                }}
                >

                    <React.Fragment>
                        <Title>Login</Title>
                        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <InputLabel >Email</InputLabel>
                                <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                    <Input type="text" placeholder="Email" value={formData.email || ''} onInput={(e) => {handleInput(e, 'email')}}></Input>
                                </div>

                                <br></br>
                                <InputLabel >Password</InputLabel>
                                <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                    <Input type="password" placeholder="Password" value={formData.password || ''} onInput={(e) => {handleInput(e, 'password')}}></Input>
                                </div>

                                <Button

                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </div>
                    </React.Fragment>

                </Paper>
            </Grid>
 
        </Grid>
    )
}

export default Login;