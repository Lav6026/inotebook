import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom';


const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();
 
     const handleSubmit=async (e)=>{
        
            e.preventDefault();
           
            const {name,email,password}=credentials
            console.log(credentials)
            const response=await fetch(`${props.host}/api/auth/createuser`,{
                
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify({name,email,password}),
 
             
         })
 
         const json=await response.json();
         console.log(json);
 
         if(json.success){
             //Sve the authtoken and Redirect
             localStorage.setItem('token',json.authtoken)
             history("/");
             props.showAlert("Account created successfully","success")}
             else{
                props.showAlert("Invalid credentials","danger")
             }
         
      
     
     }
 
     const onChange=(e)=>{
         setCredentials({...credentials,[e.target.name]:e.target.value})
        }
        
  return (
    <div className='container mt-2'> 
    
        <h2 className="my-3">Create an account to use iNotebook</h2>
    <form onSubmit={handleSubmit}>
         <div className="my-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email" onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" onChange={onChange} minLength={5} required name="password"/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" onChange={onChange}  name="cpassword" minLength={5} required/>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default Signup