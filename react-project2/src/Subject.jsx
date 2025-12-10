import { useContext } from "react";
import Student from "./Student";
import {SubjectContext} from "./contextData";
function Subject(){
    const subject=useContext(SubjectContext);
    return(
       
       <div style={{backgroundColor:'lightgreen',padding:10}}>
         <h1>Subject component subject is: {SubjectContext}</h1>
         
       </div>
   
    )
    
}
export default Subject;
