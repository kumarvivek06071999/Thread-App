import React, { useState, useEffect } from 'react'
import { Image } from "react-feather"
import Thread from '../components/Thread'
import { database, DEV_DB_ID, COLLECTION_ID_THREADS } from '../appwriteConfig'
import { Query, ID } from 'appwrite'


const Feed = () => {

    const [threads, setThreads] = useState([])
    const [threadBody, setThreadBody] = useState('')
    const [threadImg, setThreadImg] = useState(null)

    useEffect(() => {
        getThreads()
    }, [])

    const getThreads = async () => {
        const response = await database.listDocuments(
            DEV_DB_ID,
            COLLECTION_ID_THREADS,
            [Query.orderDesc('$createdAt')]
        )
        console.log(response);
        setThreads(response.documents)
        console.log(response.documents);
    }

    const handleTreadSubmit = async (e) => {
        e.preventDefault()
        
        const payload = {
            "owner_id":"64eb40c0326e00af18f6",
            "body": threadBody,
            "image": threadImg,
            
        }

        const response = await database.createDocument(
            DEV_DB_ID,
            COLLECTION_ID_THREADS,
            ID.unique(),
            payload,
        )
        setThreads(prevState => [response, ...prevState])
        console.log(response);
        setThreadBody('')
    }


    return (
        <div className='container mx-auto max-w-[600px]  '>
            <div className='p-4'>
                <form action="" onSubmit={handleTreadSubmit}>
                    <textarea className=' bg-[rgba(29,29,29,1)] w-full resize-none px-3 py-2 border-none h-20 text-white border rounded-lg focus:outline-none" rows="10" ' required value={threadBody} name="body" id="" placeholder='Say something...'
                        onChange={(e) => {
                            setThreadBody(e.target.value)
                        }} ></textarea>
                    <div className='flex justify-between p-1'>
                        <Image className=' cursor-pointer' size={30} />
                        <input className= ' cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit" value="Post" />
                    </div>
                </form>
            </div>

            {threads.map(thread => (
                <Thread key={thread.$id} thread={thread} />
            ))}
        </div>
    )
}

export default Feed




