/* eslint-disable react/prop-types */
import { RiCircleFill } from "react-icons/ri"
import { Link } from "react-router-dom"

const Navbar = ({user}) => {
  return (
    <div className="bg-white shadow-sm">
        <div className="mx-auto px-4 py-2 flex justify-between items-center">
            <Link to="/" className="flex items-center mr-5">
            <h2 className="text-3xl font-extrabold tracking-tighter text-black inline-flex items-center justify-center gap-2">Collect<span className="text-red-500"><RiCircleFill /></span></h2>
            </Link>
            <div className="flex items-center space-x-4 md:w-[200px]">
                <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                <Link to="/create" className="text-gray-700 hover:text-gray-900">Create</Link>
                <Link to="/account" className="w-8 h-8 p-3 rounded-full bg-gray-300 flex items-center justify-center text-lg text-gray-700">{user.name.slice(0, 1).toUpperCase()}</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar