import { Grid, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import Filter from "./Filter"
import Map from "../Map/Map"
import ListView from "./ListView"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAppContext } from '../../context/appContext';

const FilterPage = () => {
  const [ waitlists, setWaitlists ] = useState([])
  const [ selectedWaitlist, setSelectedWaitlist ] = useState({})
  const [view, setView ] = useState("map")
  const [open, setOpen] = useState(true);
  const { api } = useAppContext()
    
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    useEffect(() => {
      fetchWaitlists()
    }, [])
  
    const fetchWaitlists = async () => {
      await axios.get(api+`/controller/waitlist/getWaitlists`).then( (response) => {
          console.log(response.data)
          setWaitlists(response.data)
      })
    }
  
    const onFilterSubmit = async (formData) => {
      console.log(formData)
  
      await axios.post(api+'/controller/waitlist/filterWaitlist', formData).then( (response) => {
        console.log(response.data)
        setWaitlists(response.data)
      })
    }
  
    const updateSelectedWaitlist = (waitlistSelected) => {
      console.log(waitlistSelected)
      setSelectedWaitlist(waitlistSelected)
      console.log(Object.keys(selectedWaitlist).length)
    }

    const changeView = (event) => {
      setView(event.target.value)
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
                <Filter onFilterSubmit={onFilterSubmit}/>

                </Paper>
            </Grid>
            
            
           

            <div style={{margin:"auto", marginTop:"50px"}}>
              <ToggleButtonGroup
                color="primary"
                value={view}
                exclusive
                onChange={(e) => {changeView(e)}}
                aria-label="Platform"
              >
                <ToggleButton value="map">Map</ToggleButton>
                <ToggleButton value="list">List</ToggleButton>
              </ToggleButtonGroup>
            </div>

            {
              view == "map" ? (
                <Grid item xs={12} style={{height:"500px", width:"500px"}}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Map waitlists={waitlists} />
                  </Paper>

                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </Grid>
              ) : (
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ListView waitlists={waitlists} onWaitlistSelection={updateSelectedWaitlist}/>
                    </Paper>
                </Grid>
              )
            }

            
            {/* Map */}
            
        </Grid>
    )
}

export default FilterPage;