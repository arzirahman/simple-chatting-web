import axios from "axios"
import { useState } from "react"

export default function Login({ onSubmit }){
    const [name, setName] = useState('')
    const [error, setError] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/register", { name })
        .then(() => {
            onSubmit && onSubmit(name)
        })
        .catch((e) => {
            if (e?.response?.data?.message) {
                setError(e?.response?.data?.message)
            }
        })
    }

    return (
        <main className="w-screen h-screen flex justify-center items-center p-6">
          <form onSubmit={handleSubmit} className="bg-base-200 p-6 rounded-lg w-full max-w-[400px] shadow-lg">
            <span className="font-bold text-lg">Welcome, please insert your name</span>
            <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="input input-bordered w-full mt-6 mb-2" />
            {error && <div>
                <span className="text-sm text-error mb-4">{error}</span>    
            </div>}
            <button className="btn btn-accent mt-4">Submit</button>
          </form>
        </main>
    )
}