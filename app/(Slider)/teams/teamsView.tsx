'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import {useSearchParams } from 'next/navigation';
import Navigation from '@/components/nav'

interface TeamsViewProps {
    teamsarr: {id:number,name:string,tid:number,teampoint:number,level:number,total_evaluation_count:number,member:[]}[]
    scoredata:{score_1:number, score_2:number, score_3:number,score_4:number,comment:string,tag:string,uid:string,date:string,tid:number}[]
    teamsimageurl: {id:number,tid:number,imageurl:string}[]
}

const TeamsView: React.FC<TeamsViewProps> = ({ teamsarr,scoredata,teamsimageurl })=> {
    const router = useRouter()
    const searchParams = useSearchParams()
    // uid
    const uid = searchParams?.get("uid") ?? "";
    
    setTimeout(()=>{
      router.push("/nummber");
    },2500)
    return (
        <div>
          <p className="text-xl font-bold text-center mt-6">評価を受け取りました。</p>
          <p className="text-xl font-bold text-center mt-6">ご協力ありがとうございます。</p>
          <p className="text-base font-bold text-center mt-6">※3秒後に自動で戻ります</p>
        </div>
    )
}

export default TeamsView