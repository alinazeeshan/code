// function App(){
//   return(
//     <h1>Hello</h1>
//   )
// }
// export default App;
//  we can not use Appe in small letter as app because all thee tags of html start with small  so all the component should strat with capitl letter so react can understand.

import { Fragment, startTransition, useActionState, useEffect, useState } from "react";
import AddUser from "./AddUser";
import DisplayUser from "./DisplayUser";
import useToggle from "./useToggle";
import College from "./College";

// import { useState } from "react";

// function App(){
//   return(
//     <div>
//       <h1>hello react</h1>
//       <h1>learning react step by step</h1>
//     </div>
//   )
// }
// export default App;

//  to use multiple tags in a componenet use div as a wrapper if write without div it will sho error 

//  interview question: difference between liberary and framework: liberary k flow ko hum apne hisab se change krr sakte h ya chala sakte h whereas framework ka apna flow hota h jiske hisab se c halna hota h ex: angular is a framework and react is a liberary

// import Header from "./Header";
// function App(){
//   return(
//     <div>
//       <Header />
//       <h1>HELLO</h1>
//       <h1>react</h1>

//     </div>
//   )
// }
// export default App;
// ____________________________________________________________________________________________________________

// import React,{useState} from "react";
// function App(){
//   const [counter,SetCounter]=useState(0)
// return(
//   <>
// <h1>Counter val:{counter}</h1>
//  <button onClick={()=>SetCounter(counter+1)}>increase counter val</button> 
//  </>
// )

// }
// export default App;
// ____________________________________________________________________________________________________________
//  components: 

// building block of react which are independent , reusable piece of ui, they are block each does one job

// function App(){
//   return(
//     <div>
//       <h1>First Component</h1>
//       <Fruits></Fruits>
//       <Colour />
//     </div>
//   )
// }
// function Fruits(){
//   return(
//     <div>
//     <h1>Apple</h1>
//     </div>
//   )
// }
// function Colour(){
//   return(
//     <div>
//     <h1>Red</h1>
//     </div>
//   )
// }
// export default App;


// interview question: difference between component and function: jb bhi hum koi function bnate h to expectation hoti h k usme kuch na kuch javascript ka code hi hoga jsx or react me whereas a component is a special type of function that returen a jsx(ui) instead of reguilar data
// import and export components:jb hum ek component bna k dusri file me bhejte h to use export bolte h or dusri file me use krte h to use import bolte h

// import {Login,Profile, UserKey} from './UserComponent'
//     // import {Profile} from './UserComponent'
// function App(){
//   return(
//     <div>
//       <h1>importing component</h1>
//       <Login />
//       <Profile />
//       <h1>{UserKey}</h1>
//     </div>

//   )
// }

// export default App;
// ___________________________________________________________________________________________________________

//  jsx in react:it is a syntax extention for javascript that let you write html like marrkup inside a javascript file.i.e hum javascript ki fil k ander hi html ka code likh sakte h.

// function App(){
//   const UserName="Alina Zeeshan"
//   let x= 20;
//   let y= 35;
//   return(
// <>
//   <h1>jsx in React {UserName}</h1>
//   <h1>{x+y}</h1>
//   <h1>{x*y}</h1>
//   <button onClick={()=>alert("hello")}></button>
// </>
//   )
// }
// export default App;

//  work in react without jsx:
// import { createElement } from "react";
// function App(){
//   return createElement("div",{id:"rootDiv"},"Hello div")
// }
// export default App;
//  interview question:what is jsx and its full form:its full form has some confusion some say its javascript xml and some say its javascript syntax extension but in documentation dono me sse kuch nhi likha hua.
// ____________________________________________________________________________________________________________

// using html code in react:

// import {ToDo} from './UserComponent'
// function App(){
//   return(
//     <div>
//       <ToDo />
//     </div>
//   )
// }
// export default App;
// ____________________________________________________________________________________________________________

//  using variable,conditions ,functions, operations,eic with jsx:

// function App(){
//   const name="Anil";
//   let x=12;
//   let y= 13;
//   function sum(a,b) {
//     return a+b
//   }
//   return(
//     <div>
//       <h1>this is react file</h1>
//       <h1>{name}</h1>
//       {x+y}<br />
//       {sum(23,45)}
//     </div>
//   )
// }
// export default App;
// _______________________________________________________________________________________________________________________________________

// click event and function call:in javascript the onclick event is written as onclick but in react the c is written in capital as onClick
// and on click in react does not need calling of function but need the defination of function
// jb bhi function call krna ho parameter k saath to phle arrow function bna lo

// function App(){
// function callFun(){
//   alert("function called")
// }

// const fruit=()=>{
//   alert("Apple")
// }
// const fruits=(name)=>{
//   alert(name)
// }

// return(
//   <div>
//     <button onClick={function callFun(){alert("function called")}}></button>
//     <button onClick={fruit} />
//     <button onClick={()=>fruits("banana")} />

//   </div>
// )
// }
//  export default App;
// ________________________________________________________________________________________________


//  states in react: state is a container that stor data like variable and it re render component automatically so that data can be vesible on ui.
// value ko re render krane k liye variable kaa use na krke state ka use kre.
// state ko phle import krna hota h
// hooks: they are the special feature for functional component. 

// import { useState } from "react";
// import  UserComponent  from './UserComponent'
// function App(){
//  const [fruit,setFruit]= useState("apple") //yha phle initial value rhegu phir uodated vale ie fruit and setfruit
//  const handleFruit=()=>{
//   setFruit("banana")
//  }
//   return(
//     <div>
//       <h1>States in React</h1>
//       <h1>{fruit}</h1>
//       <button onClick={handleFruit}>change fruit name</button>
//       <UserComponent />
//       </div>
//   )
// }
// export default App;
// _________________________________________________________________________________________________


// toggle or hide and show in react:

// import { useState } from "react";
// function App(){
//   const [display,setDisplay]= useState(false)

//   return(
//     <div>
//       <h1>Toggle In React JS</h1>
//       {
//         display?<h1>jack</h1>:<h1>no user name</h1>
//       }
//       <button onClick={()=>setDisplay(!display)}>Toggle</button>

//     </div>
//   )
// }
// export default App;
// _______________________________________________________________________________________________
// using multiple condition in react:

// import { useState } from "react";
// function App(){
//   const [count,setCount]=useState(0)
//   return(
//     <div>
//       <h1>{count}</h1>
//       <button on onClick={()=> setCount(count+1)}>Counter</button>
//       {
//         count==0?<h1>count is zero</h1>
//         :count==1?<h1>count is 1</h1>
//         :count==2?<h1>count is 2</h1>
//         :count==3?<h1>count is 3</h1>
//         :count==4?<h1>count is 4</h1>
//         :count==5?<h1>count is 5</h1>
//         :<h1>count is {(count)}</h1>
//       }
//     </div>
//   )
// }
// export default App;

// _________________________________________________________________________________________________


//  props in react js:jb bhi hum logo ko react me ek component se doosre component me data pass krna hota h tb props ka use krte h


// import User from "./User"

// import Wrapper from "./Wrapper"

// function App(){
//   return (
//     <div>
//       <h1>props in react</h1>
//       <User name="sonu" />
//           <User name="sam" />
//           <User />

//           <Wrapper color="orange"><h1>Wrapper component1</h1>
//           <h2 style={{color:"red"}}>hello</h2>
//           </Wrapper>
//           <Wrapper><h1>Wrapper component2</h1>
//           <h2 style={{color:"red"}}>hii, you can log in</h2>
//           </Wrapper>
//     </div>

//   )
// }
// export default App;
// _______________________________________________________________________________________________

//  GET INPUT FIELD //very important

// import { useState } from "react";
// function App(){
//   const [val,setVal]=useState("sami")
//   return(
//     <div>
//       <h1>Get input field</h1>
//       <input type="text" value={val}onChange={(event)=>setVal(event.target.value)} placeholder="Enter User Name" />
//       <h1>{val}</h1>
//       <button onClick={()=>setVal("")}>clear value</button>
//     </div>
//   )
// }
// export default App;
// _________________________________________________________________________________________________

// CONTROLLED COMPONENTS:
// a controlled component is a form whose input field value is controlled by react's state. in simple koi bhi component jiski input field ki value ko react state se controll kre.

// import { useState } from "react";
// function App(){
//   const [name,setName]=useState("")
//   const [email,setEmail]=useState("")
//   const [phone,setPhone]=useState("")
//   return(
//     <div>
//       <h1>controlled component</h1>
//       <form action="" method="get">
//         <input type="text" value={name} onChange={(event)=>setName(event.target.value)} placeholder="Enter Your Name" />
//         <br /> <br />
//          <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Enter Your Email" />
//         <br /> <br />
//          <input type="number" value={phone} onChange={(event)=>setPhone(event.target.value)} placeholder="Enter Your Phone no." />
//         <br /><br />
//         <button>submit</button>
//         <button onClick={()=>{setEmail("")}}>clear</button>
//         <h3>{name}</h3>
//         <h3>{email}</h3>
//         <h3>{phone}</h3>
//       </form>
//     </div>
//   )
// }
// export default App;

// HANDLE CHECKBOX:

// ________________________________________________________________________________________________________________

// HANDLE RADIO BUTTONS AND DROPDOWN:

// function App(){
//   const [gender,setGender]=useState('');
//    const [city,setCity]=useState('');

// return(
//   <>
//   <h1>Handle radio and dropdown</h1>
//   <h3>Select Gender</h3>
//   <input type="radio" onChange={(event)=>setGender(event.target.value)} name="gender" value={"male"} id="male" /> 
//   <label htmlFor="male">Male</label>
//    <input type="radio"  onChange={(event)=>setGender(event.target.value)}  name="gender" value={"female"} id="female" />
//    <label htmlFor="female">Female</label>
//    <h2>Selected Gender: {gender}</h2>

//    <h2>Select City</h2>
//    <select onChange={(event)=>setCity(event.target.value)}>
//     <option value="Delhi" >Delhi</option>
//     <option value="Noida" >Noida</option>
//     <option value="Deheradun" >Deheradun</option>
//     <option value="Pune">Pune</option>
//    </select>
//      <h2>Selected City: {city} </h2>

//   </>
// )
// }
// export default App;

//_________________________________________________________________________________________________________________

// LOOPS IN JSX WITH MAP FUNCTION:multiple information k liye array of object na sakte h
// function App(){
//   const userName=["anil","sam","ravi"];
//   const userData=[
//             {
//               name:"anil",
//               age:"23",
//               email:"anil@23.com",
//               id:1
//             },
//             {
//               name:"sam",
//               age:"25",
//               email:"sam@23.com",
//               id:2
//             },
//             {
//               name:"ravi",
//               age:"26",
//               email:"ravi@23.com",
//               id:3
//             }
//   ]
//   return(
//     <>
//     <h1>Loops in jsx with map function</h1>
//     <h2>Dummy Data</h2>
//     <table border={1}>
//       <thead>
//         <tr>
//        <td>name</td>
//        <td>age</td>
//        <td>email</td>
//        <td>id</td>
//       </tr>
//       </thead>
//       <tbody>
//         {
//           userData.map((user)=>
//           <tr  key={user.id}>
//        <td>{user.name}</td>
//        <td>{user.age}</td>
//        <td>{user.email}</td>
//        <td>{user.id}</td>
//       </tr>)
//         }
//       </tbody>
//       </table>

//     <br />
//     <table border={1}>
//       <thead>
//         <tr>
//        <td>id</td>
//        <td>name</td>
//        <td>email</td>
//        <td>age</td>
//       </tr>
//       </thead>
//       <tbody>
//          <tr>
//        <td>1</td>
//        <td>anil</td>
//        <td>anil@23.com</td>
//        <td>23</td>
//       </tr>
//       </tbody>
//     </table>
//     </>
//   )
// }
// export default App;
// ________________________________________________________________________________________________________________

//  REUSE COMPONENT IN LOOP:

// import User from "./User.jsx"
// function App(){
//   const userName=["anil","sam","ravi"];
//   const userData=[
//             {
//               name:"anil",
//               age:"23",
//               email:"anil@23.com",
//               id:1
//             },
//             {
//               name:"sam",
//               age:"25",
//               email:"sam@23.com",
//               id:2
//             },
//             {
//               name:"ravi",
//               age:"26",
//               email:"ravi@23.com",
//               id:3
//             }
//   ]
//   return(
//     <>
//     <h1>reuse component in loop</h1>
//     {
//       userData.map((user)=>(
//        <div key={user.id}>
//         <User data={user} />
//        </div>
//       ))
//     }
//     </>
//   )
// }
// export default App;
// _______________________________________________________________________________________________________________
// CLOCK COMPONENT IMPORT AND EXPORT:

// import Clock from "./Clock.jsx"
// function App(){
//   const [color,setColor]=useState("pink");

//   return(
//     <div>
//       <h1>Clock Component Import and Export</h1>
//       <select onChange={(event)=>setColor(event.target.value)}>


//         <option value={"yellow"} >yellow</option>
//         <option value={"orange"} >orange</option>
//         <option value={"blue"} >blue</option>
//         <option value={"pink"} >pink</option>
//         </select>    
//         <Clock color={color} />
//     </div>
//   )
// }
// export default App;
// _______________________________________________________________________________________________________________

// NESTING LOOPING:

// function App() {
//   const collegeData= [
//     {
//       name:"abc colg",
//       city:"delhi",
//       website:"abc.com",
//       student:[
//         {
//           name:"anil",
//           age:"20",
//           email:"anil@gmail.com"
//         },
//          {
//           name:"ravi",
//           age:"22",
//           email:"ravi@gmail.com"
//         },
//          {
//           name:"sam",
//           age:"24",
//           email:"sam@gmail.com"
//         }
//       ]
//     },
//     {
//       name:"iit",
//       city:"roorkee",
//       website:"iit.com",
//       student:[
//         {
//           name:"anil",
//           age:"20",
//           email:"anil@gmail.com"
//         },
//          {
//           name:"ravi",
//           age:"22",
//           email:"ravi@gmail.com"
//         },
//          {
//           name:"sam",
//           age:"24",
//           email:"sam@gmail.com"
//          }]
//         },
//     {
//       name:"coer",
//       city:"deheradun",
//       website:"coer.com",
//       student:[
//         {
//           name:"anil",
//           age:"20",
//           email:"anil@gmail.com"
//         },
//          {
//           name:"ravi",
//           age:"22",
//           email:"ravi@gmail.com"
//         },
//          {
//           name:"sam",
//           age:"24",
//           email:"sam@gmail.com"
//          }]
//     }
//   ]
//   return(
//     <div>
//       <h1>Nested looping with component</h1>
//       {
//         collegeData.map(( college,index)=>(
//           <div key={index}>
//             <h1>Name: { college.name}</h1>
//             <ul>
//               <li>
//                 <h3>City: {college.city}</h3>
//               </li>
//               <li>
//                 <h3>Website: {college.website}</h3>
//               </li>
//               <li>
//                 {
//                   college.student.map((student)=>(
//                    <ul>
//                     <li>
//                       <h4>Name: {student.name}</h4>
//                     </li>
//                    </ul>
//                   ))




//                 }
//               </li>
//             </ul>
//           </div>
//         ))
//       }
//     </div>
//   )

// }
// export default App;
// _________________________________________________________________________________________________________________
// HOOKS IN REACT:
//  hooks are the function that let tounto use state , lifecycle and other feature in functional component.some popular hooks are : useState,useEffect,useRef,useReducer,useContext

// useEffect HOOKS:they are used to remove the side effect inside the component or outside the component, to fetch data,as a life cyle method and use for dom ,anipulation and much more
// import { useState } from "react";
// function App(){
//   const [counter,setCounter]=useState(0);
//    const [data,setData]=useState(0)

//   useEffect(()=>{
// callOnce();
//   },[counter])

//   function callOnce(){
//     console.log("callOnce function is called");

//   }

//   return(
//     <div>
//       <h1>useEffect</h1>
//       <button onClick={()=>setCounter(counter+1)}>Counter {counter}</button>
//       <button onClick={()=>setData(data+1)}>Data {data}</button>
//     </div>
//   )
// }
// export default App;

// HANDLE PROPS SIDE EFFECT WITH useEffect
// import Counter from "./Counter";
// function App(){
//   const [count,setCount]= useState(0)

//   return(
//     <div>
//       <h1>HANDLE PROPS SIDE EFFECT WITH useEffect</h1>
//       <Counter count={count} />
//        <button onClick={()=>setCount(count+1)}>counter{count}</button>
//     </div>
//   )
// }
// export default App;
// ____________________________________________________________________________________________________________

//  COMPONENT LIFE CYCLE:
//  it has three phases mounting,updating, unmounting. hum use effec ki help se unmount vala phase bhi dekh sakte h ya sirf update vala ya phir sirf mounting phase prr hi dikhe ya call ho .

// /____________________________________________________________________________________________________________

// STYLING REACT USING CSS: inline style,external style,css modules, styled component,external css liberary/framework,etc

//  function App(){
//   return(
//  <div>
//    <div>
//     <h1 style={{color:'red', backgroundColor:'pink'}}> inline style in react</h1>
//     <div style={{border:'1px solid black', width:'200px',boxShadow:'1px 2px 3px grey'}}>
//      <img style={{width:'200px', height:'200px',backgroundColor:'yellow'}} src="C:\Users\Subiya Zeeshan\Downloads\zon book4.jpg" alt="" />
//       <div >
//         <h4>anil</h4>
//         <p>software developer</p>
//       </div>
//     </div>
//   </div>
//  </div>
//   )
//  }

// _________________________________________________________________________________________________________________

// DYNAMIC AND CONDITIONAL INLINE STYLE:

// function App(){

//   const [cardStyle,setCardStyle]=useState(
//  {
//   border:"1px solid black",
//   width:"200px",
//   boxShadow:'1px 2px 3px grey',
//   margin:"10px"
//  })


//  const [textColor,setTextColor]=useState("black")
//  const [grid,setGrid]=useState('true')

//  const updateTheme=(bgColor,textColor)=>{
// setCardStyle({...cardStyle,backgroundColor:bgColor})

// setTextColor(textColor)
//  }
//   return(
//      <div>
//      <div>
//       <h1 style={{color:'red', backgroundColor:'pink'}}> Dynamic And Conditional Style</h1>
//       <button onClick={()=>updateTheme('#ccc','green')}>grey theme</button>
//       <button  onClick={()=>updateTheme('white','black')}>default theme</button>
//       <button onClick={()=>setGrid(!grid)}>grid toggle</button>
//       <div style={{display: grid?"flex":"block",flexWrap:"wrap"}}>
//       <div style={cardStyle}>
//        <img style={{width:'200px', height:'200px'}} src="C:\Users\Subiya Zeeshan\Downloads\zon book4.jpg" alt="" />
//         <div style={{color:textColor}}>
//           <h4>anil</h4>
//           <p>software developer</p>
//         </div>
//         </div>



//       <div style={cardStyle}>
//        <img style={{width:'200px', height:'200px'}} src="C:\Users\Subiya Zeeshan\Downloads\zon book4.jpg" alt="" />
//         <div style={{color:textColor}}>
//           <h4>anil</h4>
//           <p>software developer</p>
//         </div>
//         </div>


//       <div style={cardStyle}>
//        <img style={{width:'200px', height:'200px'}} src="C:\Users\Subiya Zeeshan\Downloads\zon book4.jpg" alt="" />
//         <div style={{color:textColor}}>
//           <h4>anil</h4>
//           <p>software developer</p>
//         </div>
//         </div>



//       <div style={cardStyle}>
//        <img style={{width:'200px', height:'200px'}} src="C:\Users\Subiya Zeeshan\Downloads\zon book4.jpg" alt="" />
//         <div style={{color:textColor}}>
//           <h4>anil</h4>
//           <p>software developer</p>
//         </div>
//         </div>

//       </div>
//     </div>
//    </div>


//   )
// }
// export default App;
// ____________________________________________________________________________________________________________

// External style in react:
//  external me direct class ki jgh claseName dena pdta h kyuki class js ka ek keyword h
// import './css/stle.css'
// function App(){
//   return(
//     <div>
//       <h1 className="heading">External Style</h1>
//      <div>
//       <div>
//         <p className="para">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum consequatur dolores, rerum pariatur voluptatibus laudantium hic odio ratione officiis perspiciatis facere explicabo animi cum expedita nemo obcaecati deleniti eaque?
//         </p>
//       </div>
//       <div>
//         <h2>anil</h2>
//         <p>software engineer</p>
//       </div>
//      </div>
//     </div>
//   )
// }
// export default App;

// _____________________________________________________________________________________________________________

// style with css modules :
//  css ki esi file jo limited component me kaam kre na ki pure project me tb css modules use hote h isme class ko  className={style.xyz} krke dena hoga . or import krne k liye import style from./foldername/filename.module.css krke krna hota h
// ______________________________________________________________________________________________________________

//  STYLED COMPONENT: ye react k feture nhi h iske liye hume alg se install krna pdta h ise install krne k liye chrome prr style component.npm likho or vha se copy krr lo.
// _______________________________________________________________________________________________________________

// react Bootstrap:
// ______________________________________________________________________________________________________________

// useRef HOOK IN REACT:
// jb bhi hum koi input field ko useRef ki saath use krege hum uss input field ko useRef ki help se manupulate   krr payege

// import { useRef } from "react";
// function App(){

// const inputRef= useRef(null)
// const inputHandler=()=>{
//   console.log(inputRef);
//   inputRef.current.focus();
//   inputRef.current.placeholder="enter password"

// }
// const toggleHandler=()=>{
//   if(inputRef.current.style.display!="none"){
//     inputRef.current.style.display="none"
//   }
//   else{
// inputRef.current.style.display="inline"
//   }
// }
//   return(
//     <div>
//       <h1>useRef</h1>

//       <input ref={inputRef} type="text" placeholder="enter user name" />
//       <button onClick={inputHandler}>input field</button>
//       <button onClick={toggleHandler}>toggle</button>
//     </div>
//   )
// }
// export default App;
// _______________________________________________________________________________________________________________

// UNCONTROLLED COMPONENT:directly dom object se input field ki value control krte h
// import { useRef } from "react";
// function App(){

// const userRef=useRef();
// const passwordRef=useRef();


//   const handleForm=(event)=>{
//     event.preventDefault();
//   const user= document.querySelector("#user").value;
//   console.log(user);

//   const password= document.querySelector("#password").value;
//   console.log(password);

//   }
// const handleFormRef=(event)=>{
//     event.preventDefault();
// const user= userRef.current.value
// console.log(user);

// const password= passwordRef.current.value
//     console.log(password);


// }
//   return(
//     <>
//     <h1>uncontrolled component</h1>
//     <form action="" method="post" onSubmit={handleForm}>
//       <input type="text" ref={userRef} id="user" placeholder="enter name" />
//       <br />
//       <br />
//       <input type="password" ref={passwordRef} id="password" placeholder="enter password" />
//       <br />
//       <br />
//       <button>Submit</button>
//     </form>
//     <hr />


//     <h1>uncontrolled component with useRef</h1>
//     <form action="" method="post" onSubmit={handleFormRef}>
//       <input type="text" id="userRef" placeholder="enter name" />
//       <br />
//       <br />
//       <input type="password" id="passwordRef" placeholder="enter password" />
//       <br />
//       <br />
//       <button>Submit with ref</button>
//     </form>
//     </>
//   )
// }
// export default App;
// ___________________________________________________________________________________________________________

// PASS function in component as prop:

// import Users from "./Users";
// function App() {
//   const displayName = (name) => {
//     alert(name)
//   }
//   return (
//     <div>
//       <h1>Call parent componenet from child </h1>
//       <Users displayName={displayName} name="sam" />
//       <Users displayName={displayName} name="ravi" />
//       <Users displayName={displayName} name="abhishek" />

//     </div>
//   )
// }
// export default App;
// _________________________________________________________________________________________________________________

// FORWARDRef in REACT: bhot baar refrence jo hota h vo alg component me pda hota h pr input field kisi orcomponent me hota to jb ek component se dusre component me refrence bhejna hota h tb forwardRef use hota h parent se child component me refrence dete h.

// import { useRef } from "react";
// import UserInput from "./userInput";
// function App(){
//     const inputRef=useRef(null)
//     const updateInput=()=>{
//        inputRef.current.value=1000
//          inputRef.current.focus();
//          inputRef.current.style.color='red'
//     }
//     return(
//         <div>
//             <h1>FORWARD REF</h1>
//           <UserInput ref={inputRef}/>
//             <button onClick={updateInput}>update input field</button>
//         </div>
//     )
// }
// export default App;

// _______________________________________________________________________________________________________________

// useFormStatus  HOOK IN REACT JS:only available in the latest version of react

// import { useFormStatus } from "react-dom";
// function App() {
//     const handleSubmit=async()=>{
//        await new Promise(res=>setTimeout(res,2000));
//         console.log("submit");

//     }
//     function CustomerForm(){
//         const {pending} = useFormStatus();

//         return(
//             <div>
//                 <input type="text" placeholder="enter your name"/>
//             <br />
//             <br />
//             <input type="text" placeholder="enter password" />
//             <br />
//             <br />
//             <button disabled={pending}>{pending?"submitting...":"submit"}</button>
//             </div>
//         )
//     }
//     return (
//         <div>
//             <h1>useFormStatus HOOK IN REACT JS</h1>
//             <form action={handleSubmit}>
//             <CustomerForm />
//             </form>
//         </div>
//     )
// }

// export default App;
// _______________________________________________________________________________________________________________

// useTransition HOOK IN REACT JS: it is used to handle the state update that can be interrupted.it helps to keep the app responsive during large state updates.

//  import { useTransition} from "react";
//     function App() {

// const [input,startTransition] =useTransition() ; 
//         const handleButton=()=>{
//          startTransition(async()=>{
//             await new Promise(res=>setTimeout(res,2000))
//          })



//         }
//        return (
//         <div>
//             <h1>useTransition HOOK IN REACT JS</h1>
//             <button disabled={input} onClick={handleButton}>Click</button>

//             <h2>{input}</h2>
//         </div>
//          )
//     }
//     export default App;

// ________________________________________________________________________________________________________________

// pure function and component in react: pure function vo hote h jo input k base prr tumke output dete h unka o/p kbhi change nhi hoga agr aapka i/p same rhega.
// pure component ese component hote h jo apki bhr vali cheez ko impact nhi krte. 
// ___________________________________________________________________________________________________________________

// derived state in react: jb hum ek variabe k and state ki koi calculation rakh lete h to usko bolte h derived state

// function App(){
//     const [users,setUsers]= useState([]);
//      const [user,setUser]= useState('');
//     const handleAddUsers=()=>{
//         setUsers([...users,user])
//     }
//     const total=users.length;
//     const last=users[users.length-1];
//     const unique=[...new Set(users)].length;
//     return(
//         <div>
//             <h1>derived state</h1>
//             <br />
//             <h2>Total Users: {total}</h2>
//             <h2>Last User: {last}</h2>
//             <h1>Unique User: {unique}</h1>
//             <input type="text" onChange={(event)=>setUser(event.target.value)} placeholder="add new user"/>
//             <button onClick={handleAddUsers}>add user</button>
//             {
//                 users.map((item,index)=>(
//                     <h3 key={index}>{item}</h3>
//                 ))
//             }
//         </div>
//     )
// }
// export default App;
// _____________________________________________________________________________________________________________

// LIFTING STATE UP IN REACT JS:jb state ki help se ek component se doosre me data transfer krna chate ho to tb lifting state up ka use krte h.


// import AddUser from "./AddUser";
// import DisplayUser from "./DisplayUser";
// function App(){
//      const[user,setUser]=useState('')
//     return(
//         <div>
//             <AddUser setUser={setUser}/>
//             <DisplayUser user={user}/>
//         </div>
//     )
// }
// export default App;
// _____________________________________________________________________________________________________________

// UPDATING OBJECTS IN STATE: 

// function App(){
//     const [data,setData]=useState({
//         name:'anil',
//        city:"delhi",
//        country:'India'
//     })
//     const handleName=(val)=>{
//       data.name=val;
//         setData({...data})
//     }
//     const handleCity=(val)=>{
//       data.city=val;
//         setData({...data})
//     }
//     const handleCountry=(val)=>{
//       data.country=val;
//         setData({...data})
//     }
//     return(
//         <div>
//             <h1>updating objects</h1>

//             <input type="text" placeholder="update name" onChange={(event)=>handleName(event.target.value)} />
//             <input type="text" placeholder="update city" onChange={(event)=>handleCity(event.target.value)} />
//             <input type="text" placeholder="update country" onChange={(event)=>handleCountry(event.target.value)} />
//             <h2>Name: {data.name}</h2>
//             <h2>city: {data.city}</h2>
//             <h2>country: {data.country}</h2>
//         </div>

//     )
// }
// export default App;
//    ____________________________________________________________________________________________________________

// UPDATING ARRAY IN STATE:
// function App(){
//     const [data,setData]=useState(['sam','peter','anil']);

//     const [dataDetails,setDataDetails]=useState([
//         {name:'anil',age:'23'},
//          {name:'sam',age:'24'},
//           {name:'peter',age:'2'}
//     ])

//     const handleUser=(name)=>{
//         data[data.length-1]=name;
//         setData([...data])
//     }

//     const handleAge=(age)=>{
//         dataDetails[dataDetails.length-1].age=age;
//         dataDetails([...data])
//     }
//     return(
//         <div>
//             <h1>Updating Array</h1>
//             <input type="text" placeholder="enter last user" onChange={(e)=>handleAge(e.target.value)}/>
//            {
//             data.map((item,index)=>(
//                 <h3 kei={index}>{item}</h3>
//             ))
//            }


//            <input type="text" placeholder="enter last user age" onChange={(e)=>handleAge(e.target.value)}/>
//            {
//             dataDetails.map((item,index)=>(
//                 <h3 key={index}>{item.name},{item.age}</h3>
//             ))
//            }

//         </div>
//     )
// }
// export default App;
// _______________________________________________________________________________________________________________

// useActionState HOOK: used to handle form in react js. it updates state based on the result of a form action.
//  import { useActionState } from "react";
// function App(){
//     const handleSubmit=async(previousData,formData)=>{
//     let name= formData.get('name');
//     let password= formData.get('password')
//     await new Promise(res=>setTimeout(res,2000));
//     if(name && password){
//         return{message:'data submited',name,password}
//     }
//     else{
//         return{
//             error:'failed to submit.enter proper data'
//         }
//     }

//     }
//     const [data,action,pending]=useActionState(handleSubmit,undefined)
//     return(
//         <div>
//             <h1>useActionState hooks in react js</h1>
//             <form action={action}>
//                 <input type="text" placeholder="enter name" name="name"/>
//                 <br />
//                 <br />

//                  <input type="text" placeholder="enter password" name="password"/>
//                 <br />
//                 <br />
//                 <button disabled={pending}>submit data</button>
//                 <br />
//             </form>
//             {
//                     data?.error && <span style={{color:'red'}}>{data?.error}</span>
//                 }
//                 {
//                     data?.message && <span style={{color:'green'}}>{data?.message}</span>
//                 }
//             <h3>name: {data?.name}</h3>
//              <h3>password: {data?.password}</h3>
//         </div>
//     )
// }
// export default App;
// _______________________________________________________________________________________________________________

// useId HOOK:used to generate unique ids that can be passed to accessibility attributes.
// import { useId } from "react";
// function App(){
//     const name =useId();
//      const password =useId();
//       const mail =useId();
//        const skills =useId();

//     return(
//         <div>
// <h1>{name}</h1>
// <h1>{password}</h1>
// <h1>{skills}</h1>
// <h1>{mail}</h1>
//         </div>
//     )
// }
// export default App;
// ________________________________________________________________________________________________________________

// FRAGMENTS IN REACT JS:ye react js ka interna featyure hota h ise parent element ki jgh use krr sakte ho or ye koi bhi html ka element generate nhi krega. instead of using div use fragment

// function App(){
//     return(
//         <>
//             <h1>Fragment in react js</h1>
//             <h2>Fragment in react js</h2>
//         </>
//     )
// }
// _______________________________________________________________________________________________________________

// RULES FOR REACT JS HOOKS:
// 1.start with use prefix
// 2.jb bhi hook bnaoge to use component k top level pr rakhna hoga
// 3. do not call hooks inside conditions or loops.
// 4.do not call hooks after a conditional return statement
// 5.do not call hooks in event handlers.
// 6. do not call hooks in class component.
// 7. do not call hooks inside try/catch/finally block. 
// ________________________________________________________________________________________________________________

// MAKING CUSTOM HOOKS: 

// function App(){
//     const [value,toggleValue]=useToggle(true);

//     return(
//         <>

//         <button onClick={toggleValue}>toggle heading</button>
//           <button onClick={()=>toggleValue(false)}>hide heading</button>
//             <button onClick={()=>toggleValue(true)}>show heading</button>
//             {
//                value? <h1>custom hook</h1>:null
//             }
//         </>
//     )
// }
// export default App;
// ______________________________________________________________________________________________________________

// CONTEX API: it share data to the component without prop drilling(sharing data from parent to child by sending it to every child it is not a good method as it send data to every child not only the desired one).
// import contexData from "./contextData";

// import {SubjectContext} from "./contextData";

// function App(){
//     const [subject,setSubject]=useState('')

//     return(

//         <div  style={{backgroundColor:'red',padding:10}}>
//             <SubjectContext.Provider value={subject}>
//                 <select value={subject} onChange={(event)=>setSubject(event.target.value)}>
//                     <option value=''>Select subject </option>
//                       <option value='maths'>Maths </option>
//                         <option value='history'>history </option>
//                           <option value='english'>engish </option>
//                            <option value='science'>sciense </option>
//                             <option value='hindi'>hindi </option>
//                 </select>
//                 <h1 >Context api</h1>
//                 <button onClick={()=>setSubject('')}>clear</button>
//         <College />
//         </SubjectContext.Provider>
//         </div>

//     )

// }
// export default App;
// _________________________________________________________________________________________________________
// 
// REACT ROUTER 7 SETUP:


// BASICpages with react router:
// brouser router: it enables client side routing using the brousers history api
// routes:responsible for rendring the aappropriate component based on current url
// routes: each route component defines a path and a corresponding component to render when that path is matched
// link: for navigate from one page to another.

// import {BrowserRouter, Route, Routes, Link} from 'react-router'
// import Home from "./Home";
// import About from "./About";
// import Login from "./Login";
// function App() {
//     return (
//         <>
//             <BrowserRouter>
//             <Link to="/">Home</Link>
//              <Link to="/About">About</Link>
//               <Link to="/Login">Login</Link>
//                 <Routes>
                
//                     <Route path="/" element={<Home /> }/>
//                      <Route path="/About" element={<About />}/>
//                      <Route path="/Login" element={<Login /> }/>
//                 </Routes>
//            </BrowserRouter>
//         </>
//     )
// }
// export default App;
// ________________________________________________________________________________________________________________

// 404 page and redirection: page not found use * in path for this

// import {BrowserRouter, Route, Routes, Link} from 'react-router'
// import Home from "./Home";
// import About from "./About";
// import Login from "./Login";
// function App() {
//     return (
//         <>
//             <BrowserRouter>
//             <Link to="/">Home</Link>
//              <Link to="/About">About</Link>
//               <Link to="/Login">Login</Link>
//                 <Routes>
                
//                     <Route path="/" element={<Home /> }/>
//                      <Route path="/About" element={<About />}/>
//                      <Route path="/Login" element={<Login /> }/>
//                      <Route path="/+" element={<PageNotFound /> }/>
//                      <Route path="/+" element={<Navigate to="Login" /> }/>

//                 </Routes>
//            </BrowserRouter>
//         </>
//     )
// }
// export default App;
// _______________________________________________________________________________________________________________

// ROUTES PREFIX: kisi bhi routes k phle kuch bhi lge to vo prefix hoga
// DYNAMIC ROUTES:jb ek page multiple routes k saath open hota h or uss page ka data uss route pr depend krta h to usko bolte h dynamic routing.
// _________________________________________________________________________________________________

// react router optional segment:
// import {BrowserRouter, Route, Routes, Link} from 'react-router'
// import Home from "./Home";
// import Profile from "./Profile";
// function App() {
//     return (
//         <>
//             <BrowserRouter>
//             <Link to="/">Home</Link>
//              <Link to="/Profile">Profile</Link>
//               <Link to="/Profile/anil">Profile with name</Link>
//                 <Routes>
                
//                     <Route path="/" element={<Home /> }/>
//                      <Route path="/Profile/:name?" element={<Profile />}/>
//                </Routes>
//           </BrowserRouter>
//         </>
//     )
// }
// export default App;
// ________________________________________________________________________________________________________________

// REACT ROUTER NAVLINK AND ACTIVE CLASS:jb hum kisi bhi home page ya about page ya different diffeernt page prr jate h to hume kese pta chalta h k hum kis page prr h .to vha vo thoda highlighted sa dikhta h vo active class ki vjh se dikhta h.
// ________________________________________________________________________________________________________________

//  Tailwind css in react: