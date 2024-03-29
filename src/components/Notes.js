import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    
    
    const context = useContext(noteContext);
    let history=useNavigate()
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if(localStorage.getItem("token"))
        getNotes();
//eslint-disable-next-line
        
else{
    history("/login")
}
    }, []);

    const ref = useRef(null);
    const refClose=useRef(null)
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    };
    const handleClick=(e)=>{
       // e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click()
        props.showAlert("Updated successfully","success");
    //addNote(note.title,note.description,note.tag);
    }

    const onChange=(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
    }
    
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button
                type="button"
                className="btn btn-primary d-none"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                
            >
                Launch demo modal
            </button >

            <div 
                className="modal fade modal-lg"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                        value={note.etitle}
                                        minLength={5} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        rows="8"
                                        
                                        className="form-control w-80"
                                        id="edescription"
                                        name="edescription"
                                        onChange={onChange}
                                        value={note.edescription}
                                        minLength={5} required>
                                        </textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        onChange={onChange}
                                        value={note.etag}
                                    />
                                </div>

                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button disabled={note.etitle.length<5||note.edescription.length<5}type="button" onClick={handleClick} className="btn btn-primary">
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-1">{notes.length===0&&"No notes to display"}</div>
                
                {notes.map((note) => {
                     
                      return  <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
                    ;
                })}
            </div>
        </>
    );
};

export default Notes;
