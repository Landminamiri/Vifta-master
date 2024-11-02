import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Button } from '@mui/material';
import axios from 'axios';
import { useAppContext } from '../../../context/appContext';


const BreederRequest = () => {
    const { request_id } = useParams()
    const { waitlist_id } = useParams()
    const [ request, setRequest ] = useState({})
    const { api } = useAppContext()
    
    useEffect(() => {
        fetchRequest()
    }, [])

    const fetchRequest = async () => {
        await axios.get(api+`/controller/request/getRequestByID/${request_id}`).then( (response) => {
            setRequest(response.data)
        })
    }

    const rejectRequest = async () => {
        await axios.put(api+`/controller/request/rejectRequest/${request_id}`).then( (response) => {
            console.log("Request Rejected")
            console.log(response)
        })
    }


    return (
        <>
            { Object.keys(request).length > 0 && (
                <div>
                    <ListItem alignItems="flex-start" sx={{bgcolor:'background.paper'}}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                            primary={request.user_name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {request.city}, {request.province}
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Contact: {request.contact}
                                    </Typography>
                                </React.Fragment>
                            }
                        />                        
                    </ListItem>
                    
                    <div>
                        <h3>Questionnaire: </h3>
                        { Object.keys(request.questionnaire_answers).map ((key) => {
                            return (
                                <p key={key}>{key}: {request.questionnaire_answers[key]}</p>
                            )
                        })}
                    </div>

                    <div>
                        <h3>Other breeder comments: </h3>
                        { Object.keys(request.questionnaire_answers).map ((key) => {
                            return (
                                <p key={key}>{key}: {request.questionnaire_answers[key]}</p>
                            )
                        })}
                    </div>

                    <Button type='danger' style={{backgroundColor:"red", color:"white"}} onClick={()=>{rejectRequest()}}>Reject</Button>
                    <Link to={"/breeder/waitlistRequests/"+waitlist_id}>
                        <Button type='danger' style={{backgroundColor:"green", color:"white", marginLeft:"5px"}}>Return</Button>
                    </Link>

                </div>   
            )} 
        </>
    );
}

export default BreederRequest;