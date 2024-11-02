import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import ListView from "../Homepage/ListView";
import PetsIcon from '@mui/icons-material/Pets';
import { useAppContext } from "../../context/appContext"

const Waitlists = () => {
    const { user, token, api } = useAppContext()
    const [ waitlists, setWaitlists ] = useState({})
    const navigate = useNavigate()
    
    useEffect(() => {
        if(user){
            getWaitlists()
        }else{
            navigate('/login')
        }

    }, [])

    useEffect(()=>{
        console.log(waitlists)
    }, [waitlists])

    const getWaitlists = async () => {
        const user_id = user._id
        await axios.get(api+`/controller/user/getUserWaitlists/${user_id}`).then( (response) => {
            console.log(response.data)
            setWaitlists(response.data)
        })
    }

    const removeUserWaitlist = async (waitlist_id, request_id) => {
        const user_id = user._id
        
        await axios.put(api+`/controller/user/removeWaitlist/${user_id}/${waitlist_id}/${request_id}`).then( (response) => {})
        
        const updatedWaitlist = {...waitlists}
        delete updatedWaitlist[waitlist_id][request_id]
        setWaitlists(updatedWaitlist)
    }


 
    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {
                Object.keys(waitlists).length > 0 ? (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {(
                            Object.entries(waitlists).map( ([waitlist_id, waitlist]) => (
                                <div key={waitlist_id}>
                                    {
                                        Object.keys(waitlist).map( (request_id) => (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <PetsIcon />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={waitlist[request_id].breed_type}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    sx={{ display: 'inline' }}
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="text.primary"
                                                                >
                                                                    {waitlist[request_id].city}, {waitlist[request_id].province}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{ display: 'block' }}
                                                                    component="span"
                                                                    variant="body3"
                                                                    color="text.primary"
                                                                >
                                                                    Status: {waitlist[request_id].status}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{ display: 'block' }}
                                                                    component="span"
                                                                    variant="body3"
                                                                    color="text.secondary"
                                                                >
                                                                    Price: ${waitlist[request_id].price_at_join}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{ display: 'block' }}
                                                                    component="span"
                                                                    variant="body3"
                                                                    color="text.secondary"
                                                                >
                                                                    Waitlist: {waitlist[request_id].availability} years
                                                                </Typography>
                                                                

                                                                <Button variant="contained" color="error" onClick={()=>{removeUserWaitlist(waitlist_id, request_id)}}>
                                                                    Delete Waitlist
                                                                </Button>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                    
                                                    
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        )
                                    

                                    )}
                                </div>
                            ))
                        )}
        
                    </List>
                ) : <></>
            }
            </Paper>
        </Grid>
    );
};

export default Waitlists;