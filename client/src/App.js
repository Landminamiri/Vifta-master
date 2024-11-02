import React from "react";
import {DashboardLayout, BreederTemplate, BreederWaitlists, WaitlistRequests, BreederRequest, FilterPage, Waitlists, Waitlist, MapComponent, Login, Error, WaitlistActive, Register, RegisterBreeder, LoginBreeder } from './pages'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import ProtectedRoute from "./pages/ProtectedRoute";
import BreederProtectedRoute from "./pages/BreederProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        
{/* 
        <Route element={ <ProtectedRoute/> }>

        </Route> */}

        <Route element={<BreederProtectedRoute/>}>
          <Route path="/breeder" element={<BreederTemplate><BreederWaitlists/></BreederTemplate>}/>
          <Route path="/breeder/waitlistRequests/:waitlist_id" element={<BreederTemplate><WaitlistRequests/></BreederTemplate>}/>
          <Route path="/breeder/waitlistRequests/:waitlist_id/:request_id" element={<BreederTemplate><BreederRequest/></BreederTemplate>}/>
          <Route path="/breeder/activeWaitlist/:waitlist_id" element={<BreederTemplate><WaitlistActive/></BreederTemplate>}/>
        </Route>
        
        <Route path="/homepage" element={<DashboardLayout><FilterPage/></DashboardLayout>}/>
        <Route path="/mywaitlists/" element={<DashboardLayout><Waitlists/></DashboardLayout>}/>

        <Route path="/waitlists" element={<Waitlists />}/>
        <Route path="/waitlist/:waitlist_id" element={<DashboardLayout><Waitlist/></DashboardLayout>}/>
        <Route path="/map" element={<MapComponent />}/>

        <Route path="/login" element={<DashboardLayout><Login /></DashboardLayout>}/>
        <Route path="/register" element={<DashboardLayout><Register /></DashboardLayout>}/>

        <Route path="/breederLogin" element={<BreederTemplate><LoginBreeder /></BreederTemplate>}/>
        <Route path="/registerBreeder" element={<BreederTemplate><RegisterBreeder /></BreederTemplate>}/>
        
        {/* <Route path="*" element={<Error />}/> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;