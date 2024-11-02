import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../context/appContext"
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Input } from "@mui/material";

const Waitlist = () => {
    const { waitlist_id } = useParams();
    const [ waitlist, setWaitlist ] = useState({})
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [ message, setMessage ] = useState("")
    const { user, token, api } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(waitlist_id)
        fetchWaitlist()
    }, [])

    const fetchWaitlist = async () => {
        await axios.get(api+`/controller/waitlist/getWaitlistById/${waitlist_id}`).then( (response) => {
            console.log(response.data)
            setWaitlist(response.data)
        })
    }

    const createRequestForUser = async () => {
        if(user){
            console.log("User exists")
            const user_id = user._id
            const requestObject = {
                user_id: user_id,
                waitlist_id: waitlist_id,
                user_name: user.email,
                city: waitlist.location.city,
                province: waitlist.province,
                contact:"7091234567",
                questionnaire_answers: {
                    "This is a question": "And this is an answer."
                },
                breeder_comments: {
                    "Breeder 1": "Comment 1"
                },
                message: message
            }

            await axios.post(api+`/controller/request/createRequest`, requestObject).then( (response) => {
                setButtonClicked(true)
                const request_id = response.data._id
            
                addWaitlistToUser(user_id, request_id)
            })
        }else{
            navigate('/login')
        }
    }

    const addWaitlistToUser = async (user_id, request_id) => {
        await axios.put(api+`/controller/user/addWaitlist/${user_id}/${waitlist_id}/${request_id}`).then( (response) => {
            console.log("Waitlist added to user")
        })
    }

    const onRequest = (event) => {
        event.preventDefault()
    }

    const handleInputChange = (event) => {
        const message = event.target.value
        setMessage(message)

    }

    return (
        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
            <Box component="form" onSubmit={onRequest} noValidate sx={{ mt: 1 }}>

                <h1>Waitlist</h1>
                <h3> Breed Type: {waitlist.breed_type} </h3>
                <h3> Price: {waitlist.price} </h3>
                <h3> Province: {waitlist.province} </h3>
                <h3> Waitlist: {waitlist.availability} years </h3>
                <h3> Initial Message: </h3>
                <Input type="text" style={{width: "100%"}} placeholder="Initial message to breeder" value={message} onChange={(e) => {handleInputChange(e)}}/>
        
                {
                    buttonClicked ? (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled
                        >
                            Request sent
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={createRequestForUser}
                        >
                            Request to join waitlist
                        </Button>
                    )
                }
                

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Message Breeder
                </Button>
                
            </Box>
      </div>
    );
};

export default Waitlist