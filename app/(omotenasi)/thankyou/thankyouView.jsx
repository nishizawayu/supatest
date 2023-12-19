"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import {useSearchParams } from 'next/navigation';

// 描画用
const ThankyouView = ({ thankyouarr }) => {

    const searchParams = useSearchParams()
    // uid
    const uid = searchParams.get("uid")

    const tid = searchParams.get("tid")

    const [studentStatus, setStudentStatus] = useState(0)
    const currentData = useMemo(() => {
            return thankyouarr.filter((v) => v.uid == uid && v.tid == tid);
    }, [studentStatus])


    return (
        <>
            {currentData.map((data,index)=>{
                return(
                    <div key={index}>
                        <p>{data.text}</p>
                    </div>
                    
                )
            })}
        </>
    );
}

export default ThankyouView;