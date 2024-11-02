import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
import { Button } from '@mui/material';

const ListView = ({waitlists, onWaitlistSelection}) => {

  const onViewMoreClicked = (event, waitlist) => {
    event.preventDefault()
    onWaitlistSelection(waitlist)
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      { waitlists.length > 0 && (
          waitlists.map( (waitlist, index) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <PetsIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={waitlist.breed_type}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {waitlist.location.city}, {waitlist.province}
                      </Typography>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body3"
                        color="text.secondary"
                      >
                        Price: ${waitlist.price}
                      </Typography>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body3"
                        color="text.secondary"
                      >
                        Waitlist: {waitlist.availability} years
                      </Typography>

                      <Button onClick={(e) => {onViewMoreClicked(e, waitlist)}}>
                        <Link style={{textDecoration:"none", color:"inherit"}} to={"/waitlist/"+waitlist._id}>View More</Link>
                      </Button>
                    </React.Fragment>
                  }
                />
                
              </ListItem>

              <Divider variant="inset" component="li" />
                
            </>   
          ))
      )}
      
    </List>
  );
}

export default ListView;