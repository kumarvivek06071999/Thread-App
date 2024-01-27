import React, { useEffect, useState } from 'react'
import { MoreHorizontal, Heart, Repeat, Send, MessageCircle } from "react-feather"
import { functions } from '../appwriteConfig'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'


const Thread = ({ thread }) => {
    const [Owner, setOwner] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get Owner Info
        getUserInfo()

    }, [])

    const getUserInfo = async () => {
        const payload = {
            "owner_id": thread.owner_id
        }

        const response = await functions.createExecution(
            '64f47ca4f23bdc3b7e3b',
            JSON.stringify(payload)

        )
        const userData = JSON.parse(response.response)
        console.log(userData);
        setOwner(userData)
        setLoading(false)
    }

    if (loading) return

    return (
        <div className=' flex  p-4 '>
            <img className=' w-10 h-10 rounded-full object-cover'
                src={Owner.profile_pic} alt="" />

            <div className='w-full px-2 pb-4 border-b border-[rgba(49,49,50,1)] ' >
                {/* Thread header */}
                <div className=' flex justify-between gap-2  ' >
                    <strong >{Owner.name}</strong >
                    <div className=' flex justify-between gap-2 ' >
                        <p className=' text-[rgba(97,97,97,1)] ' >{<ReactTimeAgo date={ new Date( thread.$createdAt).getTime()} locale="en-US"/>}</p>
                        <MoreHorizontal />
                    </div>
                </div>
                {/* Thread Body */}
                <div className='py-4' >
                    <span>{thread.body}</span>
                    {thread.image && (
                        <img className=' object-cover border border-[rgba(49,49,49,1)] rounded-md my-2' src={thread.image} />
                    ) }
                </div>
                <div className=' flex gap-4 py-4 '>
                    <Heart size={22} />
                    <MessageCircle size={22} />
                    <Repeat size={22} />
                    <Send size={22} />
                </div>

                <div className=' flex gap-4 '>
                    <p className='text-[rgba(97,97,97,1)]' >48 Replies</p>
                    <p className='text-[rgba(97,97,97,1)]' > .</p>
                    <p className='text-[rgba(97,97,97,1)]'>67 Likes</p>
                </div>
            </div>

        </div>
    )
}

export default Thread