function Users({displayName,name}){
   
    return(
        <div>
            <button onClick={()=>displayName(name)}>display name</button>
        </div>
    )
}
export default Users;