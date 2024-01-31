import axios from "axios"
import { useEffect, useState } from "react"

export default function Sidebar({ refresh, user, setSelectedUser, selectedUser, messageList, setMessageList }){
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users")
        .then((res) => {
            setUserList(res.data)
        })
        .catch((e) => {
            console.log(e)
        })
    }, [refresh])

    const handleSelect = (selected) => {
        setSelectedUser(selected)
        setMessageList(prev => prev.map((u) => {
            if ((u.sender === selected || u.sender === selectedUser) && u.receiver === user && !u.isRead) {
                return ({...u, isRead: true})
            } else return u
        }))
    }

    return(
        <div className="w-[300px] bg-base-200 h-full flex flex-col border-r-[1px] border-neutral">
            <div className="bg-base-300 p-4 font-bold text-xl px-8">Contacts</div>
            <div className="w-full px-4 mt-2 flex-1 overflow-y-auto">
                {userList.filter(u => u !== user).map((u, i) => (
                    <button key={i} onClick={() => { handleSelect(u) }} className={`${u === selectedUser ? 'btn-active' : ''} btn btn-ghost rounded-lg my-2 gap-6 py-2 h-auto justify-start w-full`}>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src="https://th.bing.com/th/id/OIP.eKW9vXzdfmaRQV2PtPD7kwHaHa?rs=1&pid=ImgDetMain" />
                            </div>
                        </div>
                        <span className="text-md flex-1 text-start">{u}</span>
                        {messageList.filter(m => m.sender === u && !m.isRead).length > 0 && <span className="indicator-item badge badge-error">
                            {messageList.filter(m => m.sender === u && !m.isRead).length}
                        </span>}
                    </button>
                ))}
            </div>
            <div className="bg-base-300 flex gap-4 p-4 items-center px-8">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://th.bing.com/th/id/OIP.eKW9vXzdfmaRQV2PtPD7kwHaHa?rs=1&pid=ImgDetMain" />
                    </div>
                </div>
                <span className="text-md">{user}</span>
                <div className="flex-1 flex justify-end">
                    <button onClick={() => {
                        window.location.href = "/"
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}