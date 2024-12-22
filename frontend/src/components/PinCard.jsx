/* eslint-disable react/prop-types */
import { FaCircleNotch } from "react-icons/fa6";
import { Link } from "react-router-dom"

const PinCard = ({pin}) => {
  return (
    <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer">
            <img className="w-full h-full" src={pin.image.url} alt="" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Link to={`/pin/${pin._id}`} className="bg-white font-medium hover:bg-gray-200 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex gap-2 items-center">View<span className="text-red-500"><FaCircleNotch /></span></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PinCard