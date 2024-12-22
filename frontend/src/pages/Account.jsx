/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import PinCard from "../components/PinCard";
import { PinData } from "../context/PinContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";


const Account = ({user}) => {
    const navigate = useNavigate();
    const {setIsAuth, setUser} = UserData();
    const logoutHandler = async () => {
        try {
            const {data} = await axios.get("/api/user/logout");
            toast.success(data.message);
            navigate("/login")
            setIsAuth(false);
            setUser([]);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const {pins} = PinData();
    let userPins;
    if(pins){
        userPins = pins.filter((pin) => pin.owner === user._id);
    }
    console.log(userPins);
  return (
    <div>
        <div className="flex flex-col items-center justify-center">
            <div className="p-6 w-full">
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-4xl text-gray-700">{user.name.slice(0, 1).toUpperCase()}</span>
                    </div>
                </div>
                <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
                <p className="text-center text-gray-600 mt-2">{user.email}</p>
                <div className="flex justify-center mt-4 space-x-2">
                    <button onClick={logoutHandler} className="bg-gray-200 px-4 py-2 rounded-full text-red-500">Logout</button>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {
                        userPins && userPins.length > 0 ? (
                            userPins.map((pin) => <PinCard key={pin._id} pin={pin}/>)
                        ) : (
                            <p className="text-center w-full text-3xl font-semibold text-gray-400 mt-5">No pins yet :(</p>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Account