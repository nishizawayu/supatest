"use client"
import Link from "next/link"
import { useMemo, useState } from "react"
import {useSearchParams } from 'next/navigation';

// 描画用
const YellView = ({ yellarr }) => {

    const searchParams = useSearchParams()
    // uid
    const uid = searchParams.get("uid")   

    const [studentStatus, setStudentStatus] = useState(0)
    const currentData = useMemo(() => {
            return yellarr.filter((v) => v.uid == uid)
    }, [studentStatus])
    return (
        <>
            {currentData.map((data,index)=>{
                return(
                    <div key={index}>
                        <p>{data.name}</p>
                        <p>{data.text}</p>
                    </div>
                    
                )
            })}
        </>
    );
}

export default YellView;