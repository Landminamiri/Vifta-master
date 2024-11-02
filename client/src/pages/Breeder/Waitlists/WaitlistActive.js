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

const WaitlistActive = () => {
    const { waitlist_id } = useParams()
    const [ waitlist, setWaitlist ] = useState({})
    const [ buyers, setBuyers ] = useState([])
    const { api } = useAppContext()

    useEffect(() => {
        fetchWaitlist()
    }, [])

    useEffect(() => {
        
        if(Object.keys(waitlist).length > 0){
            const newBuyers = waitlist.buyers
            console.log(newBuyers)
            setBuyers(newBuyers)
        }

    }, [waitlist])


    const fetchWaitlist = async () => {
        await axios.get(api+`/controller/waitlist/getWaitlistById/${waitlist_id}`).then( (response) => {
            setWaitlist(response.data)
        })
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { buyers.length > 0 && (
            buyers.map( (buyer, index) => (
                <div key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={buyer.user_name}
                            secondary={
                                <React.Fragment>

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {buyer.city}, {buyer.province}
                                    </Typography>
                                    
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

export default WaitlistActive;