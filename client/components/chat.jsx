import { useEffect, useState } from "react";

export default function Chat({ user, selected, sendMessage, messageList }){
    const [message, setMessage] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        sendMessage({
            receiver: selected,
            message,
            sender: user
        })
        setMessage('')
    }

    if (selected) {
        return(
            <div className="flex-1 h-full flex flex-col">
                <div className="bg-base-200 flex gap-4 p-4 items-center px-8">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src="https://th.bing.com/th/id/OIP.eKW9vXzdfmaRQV2PtPD7kwHaHa?rs=1&pid=ImgDetMain" />
                        </div>
                    </div>
                    <span className="text-md">{selected}</span>
                </div>
                <div className="flex-1 w-full flex flex-col p-4 px-8">
                    {messageList?.filter(u => (u?.receiver === selected && u?.sender === user) || (u?.receiver === user && u?.sender === selected))?.map((u, i) => (
                        <div key={i} className={`chat ${u?.receiver === selected ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-bubble">{u?.message}</div>
                        </div>
                    ))}
                </div>
                <form onSubmit={onSubmit} className="bg-base-200 w-full p-4 flex gap-4 px-8">
                    <div className="join w-full">
                        <input value={message} onChange={(e) => setMessage(e.target.value)} className="input input-bordered join-item w-full"/>
                        <button type="submit" className="btn btn-accent join-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        )
    } else return null
}