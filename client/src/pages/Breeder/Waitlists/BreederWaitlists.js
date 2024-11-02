import { Grid, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import Filter from "./WaitlistForm"
import Map from "../../Map/Map"
import ListView from "../ListView"
import { useEffect, useState } from "react"
import axios from "axios"
import WaitlistForm from "./WaitlistForm"
import { useAppContext } from "../../../context/appContext"



const BreederWaitlists = () => {
  const [ waitlists, setWaitlists ] = useState([])
  const [ selectedWaitlist, setSelectedWaitlist ] = useState({})
  const { breeder, api } = useAppContext()
  
    useEffect(() => {
      fetchWaitlists()
    }, [])
  
    const fetchWaitlists = async () => {
      const breeder_id = breeder.id
      console.log(breeder_id)

      await axios.get(api+`/controller/breeder/getWaitlists/${breeder_id}`).then( (response) => {
          console.log(response.data)
          const waitlist_ids = response.data.waitlist_ids

          if(waitlist_ids.length > 0) {
            loadWaitlists(waitlist_ids)
          }
      })
    }
  
    const loadWaitlists = async (waitlist_ids) => {
      console.log(waitlist_ids)
      await axios.post(api+`/controller/waitlist/getWaitlistsByIds`, waitlist_ids).then( (response) => {
        setWaitlists(response.data)
      })
    }


    const onFormSubmit = async (formData) => {
      formData.breeder_id = breeder.id
  
      await axios.post(api+'/controller/waitlist/createWaitlist', formData).then( async (response) => {
        const waitlist_id = response.data._id
        testFunction(waitlist_id)

      })
    }
  
    const testFunction = async (waitlist_id) => {
      await axios.post(api+`/controller/breeder/addWaitlistID/${breeder.id}/${waitlist_id}`).then( (response) => {
        fetchWaitlists()
      })
    }

    const updateSelectedWaitlist = (waitlistSelected) => {
      console.log(waitlistSelected)
      setSelectedWaitlist(waitlistSelected)
      console.log(Object.keys(selectedWaitlist).length)
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
                {/* <>Filter for waitlists here</> */}
                {/* <Filter onFilterSubmit={onFilterSubmit}/> */}

                <WaitlistForm onFormSubmit={onFormSubmit}/>

                </Paper>
            </Grid>
            
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                { waitlists.length > 0 ? (
                  <ListView waitlists={waitlists} onWaitlistSelection={updateSelectedWaitlist}/>
                ) : (
                  <>No Waitlists</>
                )}
                </Paper>
            </Grid>
          

            
        </Grid>
    )
}

export default BreederWaitlists;