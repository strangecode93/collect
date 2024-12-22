import { useRef, useState } from "react"
import { FaPlus, FaRegFileImage } from "react-icons/fa6"
import { RiCircleFill } from "react-icons/ri";
import { PinData } from "../context/PinContext";
import { useNavigate } from "react-router-dom";


const Create = () => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  }
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [pin, setPin] = useState("");
  const {addPin} = PinData();
  const navigate = useNavigate();
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(file);
      setFilePreview(reader.result);
    }
  }
  const addPinHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pin", pin);
    formData.append("file", file);
    addPin(formData, setFilePreview, setFile, setTitle, setPin, navigate);
  }
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-80 h-auto p-6 bg-white rounded-lg shadow-lg">
              {filePreview && <img src={filePreview} alt="Pin" className="w-full h-40 object-cover rounded-lg mb-4"/>}
                <div className="flex flex-col items-center justify-center h-full cursor-pointer" onClick={handleClick}>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={changeFileHandler}/>
                    <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-200 rounded-full font-bold"><FaPlus/></div>
                    <p className="text-gray-500 inline-flex items-center gap-1">choose a file<FaRegFileImage /></p>
                </div>
                <p className="mt-4 text-sm text-center text-gray-400">we recommend using high quality .jpg file but less than 10mb</p>
            </div>
        </div>
        <div>
          <div className="flex items-center justify-center bg-gray-100">
            <form action="" onSubmit={addPinHandler} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
              <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" className="common-input" value={title} onChange={(e) => setTitle(e.target.value)} required/>
              </div>
              <div className="mb-4">
                    <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" id="pin" className="common-input" value={pin} onChange={(e) => setPin(e.target.value)} required/>
              </div>
              <button className="common-btn inline-flex items-center justify-between gap-2">Create<span><RiCircleFill /></span></button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Create