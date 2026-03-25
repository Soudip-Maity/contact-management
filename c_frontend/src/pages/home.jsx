import React from 'react';
import SearchAppBar from '../components/searchbar';
import Contactlist from '../components/contactlist';
import Addcontact from '../components/addcontact';

export default function Home() {    

  return (
    <div style={{width:"100%",height:"100vh",backgroundColor:"black",boxSizing:"border-box",color:"white",margin:"0",padding:"0"}}>
    <SearchAppBar/>
    <div style={{width:"100%",height:"100vh",backgroundColor:"black",boxSizing:"border-box",color:"white",margin:"0",padding:"0",display:"flex",justifyContent:"space-between",paddingLeft:"10px",paddingRight:"10px"}}>
    
     <Contactlist/>
     <Addcontact/>
    </div>
    </div>
  )
}
