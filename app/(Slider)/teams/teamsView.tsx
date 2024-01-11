'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import TestImage from '@/app/(Slider)/TestImage/page'
import Navigation from '@/components/nav'

interface TeamsViewProps {
    teamsarr: {id:number,name:string,tid:number,teampoint:number,level:number}[]
    scoredata:{score_1:number, score_2:number, score_3:number,score_4:number,comment:string,tag:string,uid:string,date:string,tid:number}[]
    teamsimageurl: {id:number,tid:number,imageurl:string}[]
}

const calculateLevel = (experience:number) => {
  const BASE = 10;
  const GROWTH = 1.05;
  let level = 1;

  while (BASE * Math.pow(GROWTH, level - 1) <= experience) {
    level++;
  }

  return 6;
};

const TeamsView: React.FC<TeamsViewProps> = ({ teamsarr,scoredata,teamsimageurl })=> {
    const tag = "かっこいい"
    const router = useRouter()
    useEffect(() => {
      teamsarr.forEach((team, index) => {
        const teamdata = scoredata.filter((v) => v.tid === team.id);
        if(teamdata.length != 0){
          const currentimagedata = teamsimageurl.filter((v) => v.tid === team.tid);
          console.log(currentimagedata);
          if(currentimagedata.length != 0){
            const leveldata = calculateLevel(teamdata.length)
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
              ${leveldata}
          
              要素（ここの言葉に含まれる意味を噛み砕いてください）
              ${tag}
          
              I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`,

            ]
            if (teamdata.length == 4) {
              TestImage(pronpt[0], team.id,leveldata);
            }
          }
        }
      });
    }, []);

    return (
        <div>
          <p>送信されました。</p>
          <button onClick={()=>{
              router.push("/nummber");
          }} className="btn bg-black text-white">
          終了<span className="ml-[2px]">&gt;</span>
          </button>
          <Navigation/>
        </div>
    )
}

export default TeamsView