import { Box, Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, MenuItem, Paper, Select, ToggleButton, ToggleButtonGroup } from "@mui/material"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Title from "../Homepage/Title"
import { useAppContext } from "../../context/appContext"
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import WaitlistGrid from "../Breeder/WaitlistGrid/WaitlistGrid"

const RegisterBreeder = () => {
    const { api, breederRegistered } = useAppContext();
    const [formData, setFormData] = useState({})
    const [page, setPage] = useState(1)
    const [dogs, setDogs] = useState([
        {
            dog_breed: "",
            dog_name: "",
            date_of_birth:"",
            dog_sex: "",
            ckc: "",
            for_sale: false,
        }
    ])
    const [waitlists, setWaitlists] = useState([
        []
    ])

    const navigate = useNavigate();

    const dogBreedMap = {
        "poodle": "Poodle",
        "lagotto": "Lagotto Romagnolo",
        "husky": "Husky"
    }

    const handleInput = (event, key) => {
        const value = event.target.value
        const updateFormData = {...formData}
        
        updateFormData[key] = value
        console.log(key)
        setFormData(updateFormData)
    }

    const nextClicked = () => {
        setPage(page+1)
    }

    const previousClicked = () => {
        setPage(page-1)
    }

    const handleDogMenuInput = (event, index) => {
        const dog_breed = event.target.value
        const dogs_updated = [...dogs]
        dogs_updated[index].dog_breed = dog_breed
        setDogs(dogs_updated)
    }

    const dogAdded = () => {
        const dogs_updated = [...dogs]

        const dog_to_add = {
            dog_breed: "",
            dog_name: "",
            date_of_birth:"",
            dog_sex: "",
            ckc: "",
            for_sale: false,
            dog_price: 0,
        }

     
        const updatedWaitlists = [...waitlists]
        updatedWaitlists.push([])
        
        dogs_updated.push(dog_to_add)
        
        setDogs(dogs_updated)
        setWaitlists(updatedWaitlists)
    }

    const handleDogInfoInput = (e, index, key) => {
        const dogs_updated = [...dogs]
        
        dogs_updated[index][key] = e.target.value
        console.log(dogs_updated)
        setDogs(dogs_updated)
    }
    
    const handleDogDateOfBirth = (event, index) => {
        const date = event.$d
        
        const dogs_updated = [...dogs]

        dogs_updated[index].date_of_birth = date

        setDogs(dogs_updated)
    }

    const registerBreeder = async () => {
        const breeder = {
            ...formData,
            dogs: dogs,
        }

        console.log(breeder)
        // await axios.post(api+"/controller/auth/registerBreeder", breeder).then( (response) => {
        //     const { breeder, token } = response.data

        //     breederRegistered(breeder, token)
        //     navigate("/breeder")
            
        // })
    }

    const updateWaitlist = (index, waitlist) => {
        const updatedWaitlists = [...waitlists]
        updatedWaitlists[index] = waitlist
        setWaitlists(updatedWaitlists)
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
                        <Title>Register Breeder</Title>
                        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                            { page == 1 ? (
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="First Name" value={formData.first_name || ''} onInput={(e) => {handleInput(e, 'first_name')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Last Name" value={formData.last_name || ''} onInput={(e) => {handleInput(e, 'last_name')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Phone Number" value={formData.phone_number || ''} onInput={(e) => {handleInput(e, 'phone_number')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Email" value={formData.email || ''} onInput={(e) => {handleInput(e, 'email')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Address" value={formData.address || ''} onInput={(e) => {handleInput(e, 'address')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="City" value={formData.city || ''} onInput={(e) => {handleInput(e, 'city')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Province" value={formData.province || ''} onInput={(e) => {handleInput(e, 'province')}}></Input>
                                    </div>
                                    <br></br>

                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="text" placeholder="Postal Code" value={formData.postal_code || ''} onInput={(e) => {handleInput(e, 'postal_code')}}></Input>
                                    </div>

                                    <br></br>
                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="password" placeholder="Password" value={formData.password || ''} onInput={(e) => {handleInput(e, 'password')}}></Input>
                                    </div>
                                    <br></br>
                                    
                                    <div style={{marginLeft:"15px", marginRight:"15px"}}>
                                        <Input type="password" placeholder="Repeat Password" value={formData.repeat_password || ''} onInput={(e) => {handleInput(e, 'repeat_password')}}></Input>
                                    </div>
                                    
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={nextClicked}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            ) : page == 2 ? (
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <label>What kinds of dogs do you breed?</label>
                                    <br></br>
                                        <div>
                                            { dogs.map((dog, index) => (
                                                <div key={index} style={{marginTop:"1%"}}>
                                                    <FormControl style={{width:"80%"}}>
                                                        <Select
                                                            id="demo-simple-select"
                                                            onChange={(e) => {handleDogMenuInput(e, index)}}
                                                            value={dog.dog_breed}
                                                        >
                                                            <MenuItem value={"poodle"}>Poodle</MenuItem>
                                                            <MenuItem value={"lagotto"}>Lagotto Romagnolo</MenuItem>
                                                            <MenuItem value={"husky"}>Husky</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <IconButton onClick={dogAdded}>
                                                        <AddIcon fontSize="large" style={{verticalAlign:"middle"}}/>
                                                    </IconButton>
                                                </div> 
                                            ))}
                                        </div>

                                        <Button
                                        type="button"
                                        variant="contained"
                                        onClick={previousClicked}
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{marginRight:"15px"}}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={nextClicked}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Next
                                        </Button>   
                                </Box>
                                
                            ) : page == 3 ? (
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <label>Tell us about your dogs:</label>
                                    <br></br>
                                        <div>
                                            { dogs.map((dog, index) => (
                                                <Box component="form" noValidate sx={{ mt: 1 }} style={{marginLeft:"15px"}}>
                                                    <h3>{dogBreedMap[dog.dog_breed]}</h3>
                                                    <div>
                                                        <Input type="text" placeholder="Dog Name" value={dogs[index].dog_name || ''} onInput={(e) => {handleDogInfoInput(e, index, 'dog_name')}}></Input>
                                                    </div>
                                                    <br></br>

                                                    <div>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker label="Date of Birth" onChange={(e)=>{handleDogDateOfBirth(e, index)}}/>
                                                        </LocalizationProvider>
                                                    </div>
                                                    <br></br>

                                                    <div>
                                                        <FormControl style={{width:"80%"}}>
                                                            <InputLabel id="sex-select-label">Male/Female</InputLabel>
                                                            <Select
                                                                labelId="sex-select-label"
                                                                label="Male/Female"
                                                                onChange={(e)=>{handleDogInfoInput(e, index, 'dog_sex')}}
                                                            >
                                                                <MenuItem value={"male"}>Male</MenuItem>
                                                                <MenuItem value={"female"}>Female</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <br></br>
                                                    

                                                    <div>
                                                        <Input type="text" placeholder="CKC #" value={dogs[index].ckc || ''} onInput={(e) => {handleDogInfoInput(e, index, 'ckc')}}></Input>
                                                    </div>
                                                    <br></br>

                                                    <div>
                                                        <FormControl style={{width:"80%"}}>
                                                            <InputLabel id="sale-select-label">For Sale?</InputLabel>
                                                            <Select
                                                                labelId="sale-select-label"
                                                                label="For Sale?"
                                                                onChange={(e)=>{handleDogInfoInput(e, index, 'for_sale')}}
                                                            >
                                                                <MenuItem value={true}>Yes</MenuItem>
                                                                <MenuItem value={false}>No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <br></br>

                                                    { dogs[index].for_sale ? (
                                                        <>
                                                            <div>
                                                                <Input type="text" placeholder="Dog price" value={dogs[index].dog_price || ''} onInput={(e) => {handleDogInfoInput(e, index, 'dog_price')}}></Input>
                                                            </div>
                                                            <br></br> 
                                                            <br></br> 
                                                        </>
                                                    ) : <></>}

                                                    <div>
                                                        <FormControl style={{width:"80%"}}>
                                                            <InputLabel id="waitlist-select-label">Have people on your waitlist paid?</InputLabel>
                                                            <Select
                                                                labelId="waitlist-select-label"
                                                                label="Have people on your waitlist paid?"
                                                                onChange={(e)=>{handleDogInfoInput(e, index, 'waitlist_deposit')}}
                                                            >
                                                                <MenuItem value={true}>Yes</MenuItem>
                                                                <MenuItem value={false}>No</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <br></br>

                                                    { dogs[index].waitlist_deposit ? (
                                                        <>
                                                            <div>
                                                                <Input type="text" placeholder="Deposit Amount" value={dogs[index].deposit_amount || ''} onInput={(e) => {handleDogInfoInput(e, index, 'deposit_amount')}}></Input>
                                                            </div>
                                                            <br></br> 
                                                        </>
                                                    ) : <></>}
                                                    <Divider style={{marginTop:"10px"}}/>
                                                </Box> 
                                            ))}
                                        </div>

                                        <Button
                                        type="button"
                                        variant="contained"
                                        onClick={previousClicked}
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{marginRight:"15px"}}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={nextClicked}
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Next
                                        </Button>   
                                </Box>
                            ) : page == 4 ? (
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <label>Who is on your waitlist?</label>
                                    <br></br>
                                    <div>
                                        { dogs.map((dog, index) => (
                                            <>
                                                <h3>{dogBreedMap[dog.dog_breed]}</h3>
                                                <WaitlistGrid index={index} waitlist={waitlists[index]} updateWaitlist={updateWaitlist}/>
                                                <br></br>
                                            </>
                                        ))}
                                    </div>

                                    <Button
                                    type="button"
                                    variant="contained"
                                    onClick={previousClicked}
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{marginRight:"15px"}}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={registerBreeder}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Complete
                                    </Button>   
                                </Box>
                            ) : (
                                <></>
                            )}

                        </div>
                    </React.Fragment>

                </Paper>
            </Grid>
 
        </Grid>
    )
}

export default RegisterBreeder;