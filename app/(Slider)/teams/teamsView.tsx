'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import {useSearchParams } from 'next/navigation';
import TestImage from '@/app/TestImage/page'
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
    // useEffect(() => {

    //   const studentdata = scoredata.filter((v) => v.uid == uid);
    //   console.log(studentdata)
    //   if (studentdata.length > 0) {
    //     const teamscoredata = scoredata.filter(v => v.tid === studentdata[0].tid);
        
    //     if (teamscoredata.length > 0) {
    //       const teamdata = teamsarr.filter(v => v.tid === teamscoredata[0].tid);
    //       console.log(teamscoredata);
    //       if (teamdata.length > 0) {
    //         // 以降の処理
    //         const currentimagedata = teamsimageurl.filter((v) => v.tid === teamdata[0].tid);
    //         console.log(currentimagedata);
    //         //タグが重複しないで全部出る
    //         const tag = teamscoredata.map((data,index)=>{
    //           return data.tag
    //         })
    //         //タグの重複をなくす
    //         // const tag = // @ts-ignore
    //         // [...new Set(teamscoredata.reduce<string[]>((pre,cur) => {
    //         //     pre.push(cur.tag)
    //         //     return pre
    //         // },[]))]
    //         console.log(tag);
    //         const pronpt = [`これから送る条件を記憶し、モンスターを作成してください。要素
    //           ・漢字をいくつか渡すのでそれのイメージにあったもの
    //           ・イラストのテイストはファンタジーのみではなく、自由に作成してください
    //           ・levelが1の時は卵
    //           ・キャラクターはレベルを持っており、特定のレベルに達成すると進化します。
    //           レベルについて
    //           初期値:1
    //           最大値:100
    //           レベルが上がる＝経験を積むと捉えてください
              
    //           レベルが上がった時
    //           指定のレベルに達したらキャラクターを成長させてください
              
    //           成長について
    //           さらに追加で与えた要素も追加して、見た目を生成してください。
              
    //           イラストについて
    //           ・イラストの中に実際の漢字は含めないであくまで印象のみを反映させてください。
    //           ・周りの要素は含めずそのもの単体を1パターンだけ生成してください。
          
    //           現在のレベル
    //           ${teamdata.length}
          
    //           要素（ここの言葉に含まれる意味を噛み砕いてください）
    //           ${tag}
          
    //           I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`,
    //         ]
            
    //         if (teamscoredata.length == 1) {
    //           TestImage(pronpt[0], teamdata[0].id,1);
    //         }
    //         else if (teamscoredata.length == teamdata[0].member.length) {
    //           TestImage(pronpt[0], teamdata[0].id,10);
    //         }
    //         else if (teamscoredata.length == teamdata[0].member.length*3) {
    //           TestImage(pronpt[0], teamdata[0].id,30);
    //         }
    //         else if (teamscoredata.length == teamdata[0].member.length*5) {
    //           TestImage(pronpt[0], teamdata[0].id,50);
    //         }
    //         else if (teamscoredata.length == teamdata[0].member.length*7) {
    //           TestImage(pronpt[0], teamdata[0].id,70);
    //         }
    //         else if (teamscoredata.length == teamdata[0].member.length*10) {
    //           TestImage(pronpt[0], teamdata[0].id,100);
    //         }
    //       }
    //     }
    //   }
        
    // }, []);
    setTimeout(()=>{
      router.push("/nummber");
    },2500)
    return (
        <div>
          <p className="text-xl font-bold text-center mt-6">送信されました。</p>
          <p className="text-base font-bold text-center mt-6">※3秒後に自動で戻ります</p>
          <Navigation/>
        </div>
    )
}

export default TeamsView