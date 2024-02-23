import React from "react";
import NoteContext from "./noteContext"
import { useState } from "react";

const NoteState=(props)=>{

    const host= 'http://192.168.1.11:5000'

    // const s1={
    //    "name":"Harry",
    //    "class":"5b"
    // }
    // const [state,setState]=useState(s1)
    // const update=()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name":"Larry",
    //              "class":"10b"
    //         })
    //     }, 1000);
    // }

    const notesInitial=[
        
        
      ]

const [notes,setNotes]=useState(notesInitial)

//Get all Notes
const getNotes=async ()=>{
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{"Content-Type":"application/json","auth-token":localStorage.getItem('token')}
       
    })

    const json=await response.json();
    setNotes(json);

}

const addNote=async (title,description,tag)=>{
//API call
const response=await fetch(`${host}/api/notes/addnote`,{
    method:"POST",
    headers:{"Content-Type":"application/json",
    "auth-token":localStorage.getItem('token')},
    body:JSON.stringify({title,description,tag}),
    
})

const note=await  response.json();
setNotes(notes.concat(note));


   
    

}


//Delete a Note
const deleteNote=async (id)=>{
      //API Call
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json","auth-token":localStorage.getItem('token')},
        
    })

    const json= await response.json();
   
   const  newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
}


//Edit a Note
const editNote=async (id,title,description,tag)=>{
     //API Call
    const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json","auth-token":localStorage.getItem('token')},
        body:JSON.stringify({title,description,tag}),
        
    })

    const json= await response.json();
    
     //Logic to edit in client

     let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
            newNotes[index].title=title
            newNotes[index].description=description
            newNotes[index].tag=tag
            break;
        }
        
    }
    setNotes(newNotes)
    
}


    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
            </NoteContext.Provider>
            )
    
}

export default NoteState;