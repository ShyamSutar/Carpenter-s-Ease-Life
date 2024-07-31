import axios from "axios";
import { useState } from "react"

const Carpenter = () => {
    const [search, setSearch] = useState("");
    const [mistries, setMistries] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/v1/users/mistrySearch", {username:search}, {withCredentials: true})
            
            setMistries(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const sendNotification = async(mistry) => {
        try {
            const res = await axios.post("http://localhost:5000/api/v1/notification/notificationRequest", {mistryId: mistry._id}, {withCredentials:true})
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="h-[93vh] mt-16">
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" className="border-b" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <button type="submit">search</button>
            </form>
        </div>

        <div>
            {mistries && mistries.map((mistry, index)=>(<div key={index} className="mt-20 p-10 m-4 w-64 bg-red-200">
                <h1>{mistry.username}</h1>
                <button onClick={()=>sendNotification(mistry)} className="bg-slate-300">Send Request</button>
            </div>))}
        </div>
    </div>
  )
}

export default Carpenter