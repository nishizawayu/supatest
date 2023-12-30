'use client'
import React, { useEffect } from 'react'
import TestImage from '@/app/(Slider)/TestImage/page'

interface TeamsViewProps {
    teamsarr: {id:number,name:string,tid:string,teampoint:number,level:number}[]
}

const TeamsView: React.FC<TeamsViewProps> = ({ teamsarr })=> {
    const pronpt = `これから送る条件を記憶し、キャラクターを作成してください
    要素
    ・漢字をいくつか渡すのでそれのイメージにあったもの
    ・イラストのテイストはファンタジーのみではなく、自由に作成してください
    ・キャラクターはレベルを持っており、特定のレベルに達成すると進化します。
    ・1回目の生成はその生物の卵を生成してください
    
    レベルについて
    初期値:1
    最大値:100
    レベルが上がる＝経験を積むと捉えてください
    
    レベルが上がった時
    指定のレベルに達したらキャラクターを進化させてください
    
    進化について
    進化する際は芋虫→蛹→蝶このようにいくつかの段階を応じて進化させてください
    レベルに応じたを見た目にどんどん反映させてください。
    さらに追加で与えた要素も追加して、進化させてください。
    
    イラストについて
    ・手書きのイラスト風。
    ・イラストの中に実際の漢字は含めないであくまで印象のみを反映させてください。
    ・周りの要素は含めずそのもの単体を1パターンだけ生成してください。`
  
    console.log(teamsarr)
    useEffect(()=>{
        teamsarr.map((data:any,index:number)=>{
            if(data.teampoint == 100){
                TestImage(pronpt,data.tid)
            }
        })
    },[])

    return (
      <div>
        {teamsarr?.map((data:any,index:number)=>{
            return(
                <>
                <div className='flex' key={`teams${index}`}>
                    <p key={`teamsname${index}`}>{data.name}</p>
                    <p key={`teamsscore${index}`} className='ml-8'>合計点：{data.teampoint}</p>
                </div>
                </>
            )
        })}
      </div>
    )
}

export default TeamsView