'use client'
import React, { useEffect,useMemo } from 'react'
import TestImage from '@/app/(Slider)/TestImage/page'
import Navigation from '@/components/nav'
import Link from 'next/link'

interface TeamsViewProps {
    teamsarr: {id:number,name:string,tid:string,teampoint:number,level:number}[]
    scoredata:{score_1:number, score_2:number, score_3:number,score_4:number,comment:string,tag:string,uid:string,date:string,tid:number}[]
}

const TeamsView: React.FC<TeamsViewProps> = ({ teamsarr,scoredata })=> {
    const tag = "かっこいい"
    const level = 5;
    const pronpt = [`これから送る条件を記憶し、モンスターを作成してください。要素
    ・漢字をいくつか渡すのでそれのイメージにあったもの
    ・イラストのテイストはファンタジーのみではなく、自由に作成してください
    ・levelが1の時は卵
    ・キャラクターはレベルを持っており、特定のレベルに達成すると進化します。
    レベルについて
    初期値:1
    最大値:100
    レベルが上がる＝経験を積むと捉えてください
    
    レベルが上がった時
    指定のレベルに達したらキャラクターを成長させてください
    
    成長について
    さらに追加で与えた要素も追加して、見た目を生成してください。
    
    イラストについて
    ・イラストの中に実際の漢字は含めないであくまで印象のみを反映させてください。
    ・周りの要素は含めずそのもの単体を1パターンだけ生成してください。

    現在のレベル
    ${level}

    要素（ここの言葉に含まれる意味を噛み砕いてください）
    ${tag}

    I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`,

    ]
  
    console.log(teamsarr)
    useEffect(()=>{
        teamsarr.map((data:any,index:number)=>{  
          const teamdata = scoredata.filter((v) => v.tid == index+1)
          if(teamdata.length == 100){
              TestImage(pronpt[0],teamdata[0].tid)
          }
          else if(teamdata.length == 7){
            TestImage(pronpt[1],teamdata[0].tid)
          }
        })
    },[])

    return (
        <div>
          {teamsarr?.map((team, index) => {
            return (
              <React.Fragment key={`team-${team.id}`}> {/* ここで key を割り当てる */}
                <div className='flex'>
                  <Link href="">
                    <p>{team.name}</p>
                    <p className='ml-8'>合計点：{team.teampoint}</p>
                  </Link>
                </div>
              </React.Fragment>
            )
          })}
          <Navigation/>
        </div>
    )
}

export default TeamsView