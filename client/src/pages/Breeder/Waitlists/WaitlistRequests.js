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

const WaitlistRequests = () => {
    const { waitlist_id } = useParams()
    const [ waitlist, setWaitlist ] = useState({})
    const [ requests, setRequests ] = useState({})
    const { api } = useAppContext()
    

     useEffect(() => {
        fetchWaitlist()
        fetchRequests()
    }, [])

    const fetchWaitlist = async () => {
        await axios.get(api+`/controller/waitlist/getWaitlistById/${waitlist_id}`).then( (response) => {
            setWaitlist(response.data)
        })
    }

    const fetchRequests = async () => {
        await axios.get(api+`/controller/request/getPendingRequestsByWaitlistID/${waitlist_id}`).then( (response) => {
            console.log(response.data)
            setRequests(response.data)
        })
    }

    const approveRequest = async (request_id, index) => {
        const request = requests[index]
        const user_id = request.user_id
        console.log(request)

        await axios.put(api+`/controller/request/approveRequest/${request_id}/${waitlist_id}`).then( (response) => {
            console.log("Request Approved")
            
            // what should happen
            // const updatedRequests = {...requests}
            
            // delete updatedRequests.request_id

            // setRequests(updatedRequests)
            fetchRequests()
        })

        await axios.put(api+`/controller/user/approveRequest/${user_id}/${waitlist_id}/${request_id}`).then( (response) => {
            console.log("Request Approved")
        })

        await axios.put(api+`/controller/waitlist/addUserToWaitlist/${waitlist_id}/${user_id}`).then( (response) => {
            console.log(response.data)
        })
        
    }

    const rejectRequest = async (request_id, index) => {
        const request = requests[index]
        const user_id = request.user_id
        console.log(request)

        await axios.put(api+`/controller/request/rejectRequest/${request_id}/${waitlist_id}`).then( (response) => {
            console.log("Request Approved")
            // const updatedRequests = {...requests}
            
            // console.log(updatedRequests)
            // delete updatedRequests.request_id

            // setRequests(updatedRequests)

            fetchRequests()
        })

        await axios.put(api+`/controller/user/rejectRequest/${user_id}/${waitlist_id}/${request_id}`).then( (response) => {
            console.log("Request Rejected")
        })

    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { requests.length > 0 && (
            requests.map( (request, index) => (
                <div key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Link to={"/breeder/waitlistRequests/"+waitlist_id+"/"+request._id}><Avatar /></Link>
                            
                        </ListItemAvatar>
                        <ListItemText
                            primary={request.user_name}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {request.city}, {request.province}
                                </Typography>
                                <Typography
                                    sx={{ display: 'block' }}
                                    component="span"
                                    variant="body3"
                                    color="text.secondary"
                                >
                                    Message: {request.message}
                                </Typography>

                                <Button onClick={() => {approveRequest(request._id, index)}}>
                                    Accept Buyer
                                </Button>
                                <Button onClick={() => {rejectRequest(request._id, index)}}>
                                    Reject Buyer
                                </Button>
                                </React.Fragment>
                            }
                        />
                        
                    </ListItem>

                    <Divider variant="inset" component="li" />
                        
                </div>   
            ))
        )}
        
        </List>
    );
}

export default WaitlistRequests;