import { useState } from "react";

function AddUser({setUser}){
   
    return(
        <div>
            <h1>Add user</h1>
            <input type="text" onChange={(event)=>setUser(event.target.value)} placeholder="enter user name" />
            <hr />
        </div>
    )
}
export default AddUser;