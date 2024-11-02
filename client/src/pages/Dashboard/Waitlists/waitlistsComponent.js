import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WaitlistsComponent = ({ waitlists }) => {
    return (
        <div>
            { waitlists.length > 0 && (
                waitlists.map( (waitlist, index) => (
                    <div key={index}>
                        <div>
                            <h2>Breed Type: {waitlist.breed_type}</h2>
                            <h3>Province: {waitlist.location}</h3>
                            <h3>Price: {waitlist.price}</h3>
                            <h3>Estimated Date: {waitlist.estimated_date}</h3>
                        </div>
                        <Link to={"/waitlist/"+waitlist._id}>Open Waitlist</Link>
                        <br></br>
                        <br></br>
                    </div>
                ))
            )}
        </div>
    );
};

export default WaitlistsComponent;