import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, InputLabel, Paper, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, checkboxClasses } from "@mui/material"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Title from "../Homepage/Title"
import { useAppContext } from "../../context/appContext"
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { user, api } = useAppContext();
    const [ formData, setFormData ] = useState({})
    const [ pageTwo, setPageTwo]  = useState(false)
    
    const [ trainingCheckbox, setTrainingCheckbox ] = useState({
        family: false,
        obedience: false,
        agility: false,
        search: false,
        truffling: false,
        breeding: false,
        therapy: false,
        hunting: false,
        other: false,
    });

    const [ individualsCheckbox, setIndividualsCheckbox ] = useState({
        adults: false,
        children: false,
        dogs: false,
        cats: false,
        other: false,
    });

    const handleInput = (event, key) => {
        const value = event.target.value
        const updateFormData = {...formData}
        
        updateFormData[key] = value
        console.log(key)
        setFormData(updateFormData)
    }

    const nextClicked = () => {
        setPageTwo(true)
    }

    const previousClicked = () => {
        setPageTwo(false)
    }

    const handleRadioChange = (event, key) => {
        const updatedFormData = {...formData}
        const value = event.target.value
        
        updatedFormData[key] = value
        setFormData(updatedFormData)
        
    }
    
    const handleTrainingCheckboxChange = (event, key) => {
        const updatedFormData = {...trainingCheckbox}
        const checked = event.target.checked

        updatedFormData[key] = checked
        setTrainingCheckbox(updatedFormData)
    }

    const handleIndividualsCheckboxChange = (event, key) => {
        const updatedFormData = {...individualsCheckbox}
        const checked = event.target.checked

        updatedFormData[key] = checked
        setIndividualsCheckbox(updatedFormData)
    }

    const registerBuyer = async () => {
        
        const objectToRegister = {
            ...formData,
        }

        if(formData.dog_type == "other"){
            const dog_type_value = document.getElementById("dog_type_input").value
            formData.dog_type = dog_type_value
        }
        
        if(formData.housing == "other"){
            const housing_value = document.getElementById("housing_input").value
            formData.housing = housing_value
        }

        if(trainingCheckbox.other){
            
            const training_other_value = document.getElementById("training_other_input").value
            trainingCheckbox.other = training_other_value
        }

        if(individualsCheckbox.other){
            const individuals_other_value = document.getElementById("individuals_other_input").value
            individualsCheckbox.other = individuals_other_value
        }

        objectToRegister.individuals = individualsCheckbox
        objectToRegister.training = trainingCheckbox

        await axios.post(api+"/controller/auth/register", objectToRegister).then( (response) => {
            console.log(response)
        })
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
                        <Title>Register</Title>
                        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                            { !pageTwo ? (
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
                            ) : (
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    <FormControl>
                                        <label>Have you filed any applications or submitted a deposit with any other breeders?</label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.other_apps_deposits || 'yes'}
                                            onChange={(e) => {handleRadioChange(e, "other_apps_deposits")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                    
                                    <br></br>
                                    <br></br>

                                    <label>How did you hear about us?</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.heard_about || ''} onInput={(e) => {handleInput(e, 'heard_about')}}/>

                                    <br></br>
                                    <br></br>
                                    
                                    <FormControl>
                                        <label>Would you like a male or female dog?</label>
                                        <RadioGroup
                                            defaultValue="either"
                                            name="radio-buttons-group"
                                            value={formData.dog_sex || 'either'}
                                            onChange={(e) => {handleRadioChange(e, "dog_sex")}}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="either" control={<Radio />} label="Either" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>
                                    
                                    <FormControl>
                                        <label>Would you like a specific colour? (NOTE: colours can change as the dog matures)</label>
                                        <RadioGroup
                                            defaultValue="yes"
                                            name="radio-buttons-group"
                                            value={formData.dog_colour || 'yes'}
                                            onChange={(e) => {handleRadioChange(e, "dog_colour")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <FormControl>
                                        <label>What type of puppy are you seeking? </label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.dog_type || 'pet'}
                                            onChange={(e) => {handleRadioChange(e, "dog_type")}}
                                        >
                                            <FormControlLabel value="pet" control={<Radio />} label="Pet Only" />
                                            <FormControlLabel value="show" control={<Radio />} label="Show" />
                                            <FormControlLabel value="show_breeding" control={<Radio />} label="Show/Breeding" />
                                            <FormControlLabel value="breeding" control={<Radio />} label="Breeding" />
                                            <FormControlLabel value="other" control={<Radio/>} label={<input type="text" placeholder="Other" id="dog_type_input"></input>} />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <FormGroup>
                                        <label>What areas are you interested in training your dog in? Check all that apply.</label>

                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.family} onChange={(e) => handleTrainingCheckboxChange(e, "family")} />} label="Family Pet" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.obedience} onChange={(e) => handleTrainingCheckboxChange(e, "obedience")} />} label="Obedience" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.agility} onChange={(e) => handleTrainingCheckboxChange(e, "agility")} />} label="Agility" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.search} onChange={(e) => handleTrainingCheckboxChange(e, "search")} />} label="Search and Rescue" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.truffling} onChange={(e) => handleTrainingCheckboxChange(e, "truffling")} />} label="Truffling" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.breeding} onChange={(e) => handleTrainingCheckboxChange(e, "breeding")} />} label="Breeding" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.therapy} onChange={(e) => handleTrainingCheckboxChange(e, "therapy")} />} label="Therapy" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.hunting} onChange={(e) => handleTrainingCheckboxChange(e, "hunting")} />} label="Hunting" />
                                        <FormControlLabel control={<Checkbox checked={trainingCheckbox.other} onChange={(e) => handleTrainingCheckboxChange(e, "other")} />} label={<input type="text" placeholder="Other" id="training_other_input"></input>} />
                                    </FormGroup>

                                    <br></br>
                                    <br></br>


                                    <FormControl>
                                        <label>In what type of housing do you reside?</label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.housing || ''}
                                            onChange={(e) => {handleRadioChange(e, "housing")}}
                                        >
                                            <FormControlLabel value="apt" control={<Radio />} label="Apt/Condo" />
                                            <FormControlLabel value="townhouse" control={<Radio />} label="Townhouse" />
                                            <FormControlLabel value="single_family" control={<Radio />} label="Single Family" />
                                            <FormControlLabel value="other" control={<Radio />} label={<input type="text" placeholder="Other" id="housing_input"></input>} />

                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <FormControl>
                                        <label>Do you have a fenced yard suitable for dogs?</label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.housing || 'pet'}
                                            onChange={(e) => {handleRadioChange(e, "housing")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <FormGroup>
                                        <label>Please indicate the individuals and pets in your household. (Select all that apply)</label>

                                        <FormControlLabel value="adults" control={<Checkbox checked={individualsCheckbox.adults} onChange={(e) => handleIndividualsCheckboxChange(e, "adults")} />} label="Adults" />
                                        <FormControlLabel value="children" control={<Checkbox checked={individualsCheckbox.children} onChange={(e) => handleIndividualsCheckboxChange(e, "children")} />} label="Children" />
                                        <FormControlLabel value="dogs" control={<Checkbox checked={individualsCheckbox.dogs} onChange={(e) => handleIndividualsCheckboxChange(e, "dogs")} />} label="Dogs" />
                                        <FormControlLabel value="cats" control={<Checkbox checked={individualsCheckbox.cats} onChange={(e) => handleIndividualsCheckboxChange(e, "cats")} />} label="Cats" />
                                        <FormControlLabel value="other" control={<Checkbox checked={individualsCheckbox.other} onChange={(e) => handleIndividualsCheckboxChange(e, "other")} />} label={<input type="text" placeholder="Other" id="individuals_other_input"></input>} />
                                    </FormGroup>

                                    <br></br>
                                    <br></br>

                                    <label>Are there family members in your home with special needs? If so, please describe.</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.special_needs || ''} onInput={(e) => {handleInput(e, 'special_needs')}}/>

                                    <br></br>
                                    <br></br>

                                    <FormControl>
                                        <label>Do you currently have any dogs living in your home?</label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.current_dogs || 'yes'}
                                            onChange={(e) => {handleRadioChange(e, "current_dogs")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <label>If yes, please list the breed(s)?</label>
                                    <br></br>
                                    <input type="text" value={formData.list_breeds || ''} onInput={(e) => {handleInput(e, 'list_breeds')}} />

                                    <br></br>
                                    <br></br>


                                    <FormControl>
                                        <label>Does anyone in the household have allergies to dander?</label>
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.allergic_dander || 'yes'}
                                            onChange={(e) => {handleRadioChange(e, "allergic_dander")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

                                    <label>What temperament do you expect from your dog?</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.temperament || ''} onInput={(e) => {handleInput(e, 'temperament')}} />

                                    <br></br>
                                    <br></br>

                                    <label>Who in the household will have the major responsibility for the dog?</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.responsibility || ''} onInput={(e) => {handleInput(e, 'responsibility')}} />

                                    <br></br>
                                    <br></br>

                                    <label>How many hours a day would the dog normally be left alone?</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.hours_alone || ''} onInput={(e) => {handleInput(e, 'hours_alone')}} />

                                    <br></br>
                                    <br></br>

                                    <label>
                                        Although we prefer you to come and pick up your puppy, we realize that may not be possible. Please
                                        let us know (if shipping your pup), which airports are closest to you:
                                    </label>
                                    
                                    <br></br>
                                    <input type="text" value={formData.airports || ''} onInput={(e) => {handleInput(e, 'airports')}} />

                                    <br></br>
                                    <br></br>

                                    <label>Additional information: List any other specifics with regards to what you are looking for in a dog.</label>
                                    <br></br>
                                    <textarea cols={70} value={formData.additional_information || ''} onInput={(e) => {handleInput(e, 'additional_information')}} />

                                    <br></br>
                                    <br></br>

                                    <FormControl>
                                        <label>Do you agree to return your dog to us if you are unable to keep it?</label>
                                        
                                        <RadioGroup
                                            name="radio-buttons-group"
                                            value={formData.return_agreement || 'yes'}
                                            onChange={(e) => {handleRadioChange(e, "return_agreement")}}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                                    <br></br>
                                    <br></br>

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
                                        onClick={registerBuyer}
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            )}


                            
                        </div>
                    </React.Fragment>

                </Paper>
            </Grid>
 
        </Grid>
    )
}

export default Register;