/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom"
import {PinData} from "../context/PinContext"
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import { RiEdit2Fill } from "react-icons/ri";

const PinPage = ({user}) => {
    const params = useParams()
    const {loading, fetchPin, pin, updatePin, addComment, deleteComment, deletePin} = PinData();
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [pinValue, setPinValue] = useState("");
    const navigate = useNavigate();
    const editHandler = () => {
        setTitle(pin.title);
        setPinValue(pin.pin);
        setEdit(!edit)
    }
    const updateHandler = async() => {
      updatePin(pin._id, title, pinValue, setEdit)
    }
    const [comment, setComment] = useState("");

    const submitHandler = async(e) => {
      e.preventDefault();
      addComment(pin._id, comment, setComment)
    }
    const deleteCommentHandler = async(id) => {
      if(confirm("Are you sure you want to delete this comment?"))
        deleteComment(pin._id, id)
    }
    const deletePinHandler = async() => {
      if(confirm("Are you sure you want to delete this pin?"))
        deletePin(pin._id, navigate)
    }
    // console.log(pin);
    useEffect(() => {
      fetchPin(params.id)
    },[params.id])
  return (
    <div>
      {
        pin && <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
          {loading ? (<Loading/>): (<div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl">
            <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
            {pin.image &&<img src={pin.image.url} alt="" className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden"/>}
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              {
                edit? <input value={title} onChange={e=>setTitle(e.target.value)} className="outline-none border-b text-2xl font-semibold" style={{width:"200px"}} placeholder="Enter title"/> : (
                  <h1 className="text-2xl font-bold">{pin.title}</h1>
                )
              }
              {
                pin.owner && pin.owner._id === user._id && (<button onClick={editHandler} className="bg-gray-100 text-blue-500 py-1 px-3 rounded"><RiEdit2Fill /></button>)
              }
              {
                pin.owner && pin.owner._id === user._id && (<button onClick={deletePinHandler} className="bg-gray-100 text-red-500 py-1 px-3 rounded"><MdDelete /></button>)
              }
            </div>
            {
              edit ? (
                <input value={pinValue} onChange={e=>setPinValue(e.target.value)} className="outline-none border-b mb-5" placeholder="Enter description"/>
              ) : (
                <p className="mb-6">{pin.pin}</p>
              )
            }
            {
              edit && <button className="bg-gray-100 text-blue-500 font-semibold py-2 px-4 rounded mb-2" onClick={updateHandler}>Save</button> 
            }
            {
              pin.owner && (<div className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center">
                  <Link to={`/user/${pin.owner._id}`}>
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">
                      {pin.owner.name.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                  </Link>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{pin.owner.name}</h2>
                    <p className="text-gray-500">{pin.owner.followers.length} Followers</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center mt-4">
              <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center mr-4">
                <span className="font-bold text-2xl text-blue-500">{pin.owner && pin.owner.name.slice(0, 1).toUpperCase()}</span>
              </div>
              <form action="" onSubmit={submitHandler} className="flex-1 flex">
                <input type="text" placeholder="Add a comment" className="flex-1 border-b rounded-lg p-2 outline-none" value={comment} onChange={e=>setComment(e.target.value)} required/>
                <button type="submit" className="bg-gray-100 text-blue-600 font-semibold py-2 px-4 rounded-lg ml-2 text-xl"><GrSend /></button>
              </form>
            </div>
            <hr className="font-bold text-gray-400 mt-3 mb-3" />
            <div className="overflow-y-auto h-64">
              {pin.comments && pin.comments.length>0 ? pin.comments.map((e,i)=>(
                <div key={i} className="flex items-center justify-between mb-4">
                  <div className="flex items-start mb-4 justify-start gap-3 w-full">  

                    <Link to={`/user/${e.user}`}>
                    <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-700">
                      {e.name.slice(0, 1).toUpperCase()}
                    </span>
                    </div>
                    </Link>

                    <div className="ml-4 flex w-full justify-between">
                    <div>
                    <h2 className="text-lg font-semibold">{e.name}</h2>
                    <p className="text-gray-500">{e.comment}</p>
                    </div>
                    </div>
                    {e.user === user._id && (
                      <button className="bg-gray-100 text-red-500 font-semibold py-2 px-4 rounded ml-4" onClick={() => deleteCommentHandler(e._id)}><MdDelete/></button>
                    )}
                  </div>
                </div>
              )): <p className="text-center text-gray-500">No comments</p>}
            </div>
            </div>
            
            </div>)}
            
        </div>
      }
    </div>
  )
}

export default PinPage