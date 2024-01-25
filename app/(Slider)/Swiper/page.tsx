'use client'

import React, {useState, useMemo,useEffect, isValidElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import TestImage from '@/app/TestImage/page';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import rank1 from "@/app/(images)/rank1.png"
import rank2 from "@/app/(images)/rank2.png"
import rank3 from "@/app/(images)/rank3.png"
import Image from 'next/image';


interface TeamsViewProps {

    teamsarr: {id:number,name:string,tid:number,teampoint:number,level:number,total_evaluation_count:number,member:[],total_team_score:number,kanji:[],most_team_tag:string}[]
    scoredata:{score_1:number, score_2:number, score_3:number,score_4:number,comment:string,tag:string,uid:string,date:string,tid:number}[]
    teamsimagedata:{id:number,tid:number,imageUrl:string,created_at:string,name:string,formattedTimestamp:string,tag:[]}[]
}

const Slider: React.FC<TeamsViewProps> = ({ teamsarr,scoredata,teamsimagedata})=> {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    // const [flip, setFlip] = useState<Array<boolean | null>>(Array(10).fill(null));
    const [teamId, setTeamId] = useState(1)
    const supabase = createClientComponentClient();
    const [evaluations, setEvaluations] = useState(scoredata);
    const [imageact,setimageact] = useState("");
    const [teamname,setteamname] = useState("");
    const [insetdata,setinsertdata] = useState<boolean>(false);
    // const [imagedata,setimagedata] = useState();
    const [imagedata,setimagedata] = useState(teamsimagedata);
    const [anime,setanime] = useState(false)
    const [teamrank, setTeamrank] = useState(teamsarr);
    const [teams, setTeams] = useState(teamsarr);
    const rankImages = [rank1, rank2, rank3];

    //ランキングリアルタイム更新
    useEffect(() => {
        const subscription = supabase
          .channel('teamrank')
          .on("postgres_changes", { event: "*", schema: "public", table: "teams" }, (payload) => {
            console.log('Change received!', payload);
            // 状態を更新する
            //@ts-ignore
            setTeamrank(prevTeamrank => {
              // 更新されたチームのデータを見つける
              //@ts-ignore
              const updatedTeamIndex = prevTeamrank.findIndex(team => team.id === payload.new.id);
              if (updatedTeamIndex === -1) {
                // 新しいチームのデータを追加
                //@ts-ignore
                return [...prevTeamrank, payload.new].sort((a, b) => b.total_evaluation_count - a.total_evaluation_count); // 降順に並び替え
              } else {
                // 既存のチームのデータを更新
                const updatedTeamrank = [...prevTeamrank];
                updatedTeamrank[updatedTeamIndex] = {
                  ...updatedTeamrank[updatedTeamIndex],
                  ...payload.new
                };
                return updatedTeamrank.sort((a, b) => b.total_evaluation_count - a.total_evaluation_count); // 降順に並び替え
              }
            });
          })
          .subscribe();
      
        return () => {
          subscription.unsubscribe(); // クリーンアップ
        };
      }, []);
    console.log(teamrank);

    //チームの特徴リアルタイム更新
    useEffect(() => {
        const subscription = supabase
          .channel('teams')
          .on("postgres_changes", { event: "*", schema: "public", table: "teams" }, (payload) => {
            console.log('Change received!', payload);
            // 状態を更新する
            //@ts-ignore
            setTeams(prevTeams => {
              // 更新されたチームのデータを見つける
              //@ts-ignore
              const updatedTeamIndex = prevTeams.findIndex(team => team.id === payload.new.id);
              if (updatedTeamIndex === -1) {
                // 新しいチームのデータを追加
                return [...prevTeams, payload.new];
              } else {
                // 既存のチームのデータを更新
                const updatedTeams = [...prevTeams];
                updatedTeams[updatedTeamIndex] = {
                  ...updatedTeams[updatedTeamIndex],
                  ...payload.new
                };
                return updatedTeams;
              }
            });
          })
          .subscribe();

            return () => {
            subscription.unsubscribe(); // クリーンアップ
            };
        }, []);

        //評価が入ったか監視
        useEffect(() => {
            const subscription = supabase
                .channel('evaluation')
                .on("postgres_changes", { event: "INSERT", schema: "public", table: "evaluation" }, (payload) => {
                    setinsertdata(true)
                    //@ts-ignore
                    setEvaluations(prevEvals => [...prevEvals, payload.new]); // 新しい評価を追加
                })
                .subscribe();
    
            return () => {
                subscription.unsubscribe(); // クリーンアップ
            };
        }, []);
    

    //評価が入力された際の処理
    useEffect(()=>{
        if(evaluations != undefined){
            if(evaluations.length != 0){
            console.log(evaluations);
            //@ts-ignore
            const teamscoredata = evaluations.filter(v => v.tid === evaluations[evaluations.length-1].tid);
            console.log(teamscoredata);
            //@ts-ignore
            const teamdata = teamsarr.filter(v => v.tid === evaluations[evaluations.length-1].tid);
            console.log(teamdata);
                if (teamdata.length > 0) {
                    // 以降の処理
                    const currentimagedata = teamsimagedata.filter((v) => v.tid === teamdata[0].tid);
                    console.log(currentimagedata);
                    //タグが重複しないで全部出る
                    const tag = teamscoredata.map((data:any,index:number)=>{
                        return data.tag
                    })
                    //タグの重複をなくす
                    // const tag = // @ts-ignore
                    // [...new Set(teamscoredata.reduce<string[]>((pre,cur) => {
                    //     pre.push(cur.tag)
                    //     return pre
                    // },[]))]
                    console.log(tag);
                    // 生成されるイメージ
                    const animal =["虎","猫","羊","宇宙人","ミニ豚","狼","天使","不死鳥","鮫","鹿","馬"]
                    // プロンプト
                    const pronpt = [`これから送る条件を記憶し、モンスターを作成してください。要素
                    ・漢字をいくつか渡すのでそれのイメージにあったもの
                    ・イラストのテイストはファンタジーのみではなく、自由に作成してください
                    ・levelが1の時は卵から生まれる様子を描いてください。
                    ・キャラクターはレベルを持っており、特定のレベルに達成すると進化します。
                    ・キャラクターのイメージは${animal[teamdata[0].tid-1]}
                    レベルについて
                    初期値:1
                    最大値:100
                    レベルが上がる＝経験を積むと捉えてください
                    100をこえたら限界突破したと考え、超過分に応じた変化を与えてください（壮大なイメージ）
                    
                    レベルが上がった時
                    指定のレベルに達したらキャラクターを成長させてください
                    
                    成長について
                    さらに追加で与えた要素も追加して、見た目を生成してください。
                    
                    イラストについて
                    ・イラストの中に実際の漢字は含めないであくまで印象のみを反映させてください。
                    ・周りの要素は含めずそのもの単体を1パターンだけ生成してください。

                    漢字について
                    ${teamdata[0].kanji}
                
                    現在のレベル
                    ${teamscoredata.length}
                
                    要素（ここの言葉に含まれる意味を噛み砕いてください）
                    ${tag}
                
                    I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:`,
                    ]
                    
                    //評価回数に応じて画像生成
                    if(insetdata == true){
                        if (teamscoredata.length == 1) {
                            TestImage(pronpt[0], teamdata[0].tid,2,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == 2) {
                            TestImage(pronpt[0], teamdata[0].tid,3,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == 3) {
                            TestImage(pronpt[0], teamdata[0].tid,4,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length) {
                            TestImage(pronpt[0], teamdata[0].tid,10,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length+1) {
                            TestImage(pronpt[0], teamdata[0].tid,12,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length+3) {
                            TestImage(pronpt[0], teamdata[0].tid,14,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length+5) {
                            TestImage(pronpt[0], teamdata[0].tid,16,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*2) {
                            TestImage(pronpt[0], teamdata[0].tid,20,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*3) {
                            TestImage(pronpt[0], teamdata[0].tid,30,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*5) {
                            TestImage(pronpt[0], teamdata[0].tid,50,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*7) {
                            TestImage(pronpt[0], teamdata[0].tid,70,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*9) {
                            TestImage(pronpt[0], teamdata[0].tid,90,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*10) {
                            TestImage(pronpt[0], teamdata[0].tid,100,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*11) {
                            TestImage(pronpt[0], teamdata[0].tid,110,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*12) {
                            TestImage(pronpt[0], teamdata[0].tid,120,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*13) {
                            TestImage(pronpt[0], teamdata[0].tid,130,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*14) {
                            TestImage(pronpt[0], teamdata[0].tid,140,tag);
                            setinsertdata(false)
                        }
                        else if (teamscoredata.length == teamdata[0].member.length*15) {
                            TestImage(pronpt[0], teamdata[0].tid,150,tag);
                            setinsertdata(false)
                        }

                    }
                }
            }
        }
    },[evaluations])

    useEffect(()=>{
        const subscription = supabase
        .channel('teamsimageurl')
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "teamsimageurl" }, (payload) => {
            console.log('New evaluation:', payload.new);
            // ここで何かの処理を行う
            let timestamp = new Date(payload.new.created_at);
            let formattedTimestamp = timestamp.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            payload.new.formattedTimestamp = formattedTimestamp;
            //@ts-ignore
                setimagedata(prevEvals => [...prevEvals, payload.new]); // 新しい評価を追加
                // teamsimagedata.push(payload.new)
                // //@ts-ignore
                // setimagedata(teamsimagedata);
                setimageact(payload.new.imageUrl);
            })
        .subscribe();
    },[])

    const audiodata = ["sound_1.mp3","sound_2.mp3","sound_3.mp3","sound_4.mp3","sound_5.mp3","sound_6.mp3","sound_7.mp3","sound_8.mp3","sound_9.mp3","sound_10.mp3","sound_11.mp3"]

    // const [audio] = useState(typeof Audio !== "undefined" ? new Audio(`/sound/${audiodata[imagedata[imagedata.length-1].tid-1]}`) : undefined);
    const [audio] = useState(typeof Audio !== "undefined" ? new Audio(`/sound/sound_1.mp3`) : undefined);

    const onsound = ()=>{
        if(audio) {
            console.log("soundplay")
            audio.play();
        }
    }

    useEffect(()=>{
        console.log(imageact);
        if(imageact != ""){
            setteamname(imagedata[imagedata.length-1].name);
            setTeamId(0)
            onsound();
            setanime(true);
        }
    },[imageact])

    const currentData = useMemo(() => {
        if(teamsarr != undefined){
            let result = teamsarr;
            if(teamId === 1) {
                result = result.filter((v) => v.tid == 1);
            }
            if(teamId === 2) {
                result = result.filter((v) => v.tid == 2);
            }
            if(teamId === 3) {
                result = result.filter((v) => v.tid == 3);
            }
            if(teamId === 4) {
                result = result.filter((v) => v.tid == 4);
            }
            if(teamId === 5) {
                result = result.filter((v) => v.tid == 5);
            }
            if(teamId === 6) {
                result = result.filter((v) => v.tid == 6);
            }
            if(teamId === 7) {
                result = result.filter((v) => v.tid == 7);
            }
            if(teamId === 8) {
                result = result.filter((v) => v.tid == 8);
            }
            if(teamId === 9) {
                result = result.filter((v) => v.tid == 9);
            }
            if(teamId === 10) {
                result = result.filter((v) => v.tid == 10);
            }
            if(teamId === 11) {
                result = result.filter((v) => v.tid == 11);
            }
            return result;
        }
    },[teamId])
    const currentimageData = useMemo(() => {
        let imagepath = imagedata
        if(teamsimagedata != undefined){
            if(teamId === 1) {
                imagepath = imagepath.filter((v) => v.tid == 1);
            } 
            if(teamId === 2) {
                imagepath = imagepath.filter((v) => v.tid == 2);
            }
            if(teamId === 3) {
                imagepath = imagepath.filter((v) => v.tid == 3);
            }
            if(teamId === 4) {
                imagepath = imagepath.filter((v) => v.tid == 4);
            }
            if(teamId === 5) {
                imagepath = imagepath.filter((v) => v.tid == 5);
            }
            if(teamId === 6) {
                imagepath = imagepath.filter((v) => v.tid == 6);
            }
            if(teamId === 7) {
                imagepath = imagepath.filter((v) => v.tid == 7);
            }
            if(teamId === 8) {
                imagepath = imagepath.filter((v) => v.tid == 8);
            }
            if(teamId === 9) {
                imagepath = imagepath.filter((v) => v.tid == 9);
            }
            if(teamId === 10) {
                imagepath = imagepath.filter((v) => v.tid == 10);
            }
            if(teamId === 11) {
                imagepath = imagepath.filter((v) => v.tid == 11);
            }
            return imagepath
        }
    },[teamId])


    useEffect(()=>{
        if(anime != false){
            setTimeout(()=>{
                setTeamId(imagedata[imagedata.length-1].tid)
                setanime(false)
            },10000)
        }
    },[anime])

    const url = `image/${imageact}`

    // const [balls, setBalls] = useState<JSX.Element[]>([]);

    // useEffect(() => {
    //     if(imageact != ""){
    //     // 球を追加する関数
    //     const addBalls = () => {
    //       const newBalls = Array.from({ length: 700 }).map((_, index) => {
    //         const size = Math.random() * 15 + 10; // 10pxから25pxのランダムなサイズ
    //         const top = Math.random() * 100;
    //         const left = Math.random() * 100;
    
    //         return (
    //           <div
    //             key={`ball-${balls.length + index}`}
    //             className="absolute bg-white rounded-full"
    //             style={{
    //               width: `${size}px`,
    //               height: `${size}px`,
    //               top: `${top}%`,
    //               left: `${left}%`
    //             }}
    //           ></div>
    //         );
    //       });
    
    //       setBalls(prevBalls => [...prevBalls, ...newBalls]);
    //     };
    
    //     // 球を定期的に追加
    //     const intervalAdd = setInterval(addBalls, 300); // 0.3秒ごとに700個の球を追加
    
    //     // 5秒後に球の追加を停止
    //     const timeoutStop = setTimeout(() => {
    //       clearInterval(intervalAdd);
    //     }, 4000);
    
    //     // 球を削除する関数
    //      // 球を削除
    //      const removeBalls = () => {
    //         setBalls(prevBalls => prevBalls.slice(1400));
    //       };
      
    //       const intervalRemove = ()=>{
    //           setInterval(removeBalls, 300); // 5秒ごとに700個の球を削除
    //       }
  
    //       const resetremoove = setInterval(intervalRemove,4000)
    
    //     return () => {
    //       clearInterval(intervalAdd);
    //       clearTimeout(timeoutStop);
    //       clearInterval(resetremoove);
    //     };
    // }
    //   }, [imageact]);

    useEffect(()=>{

    },[imageact])
  
    return (
        <div className={teamId===1?"bg-[#323232]":teamId===2?"bg-[#008C7E]":teamId===3?"bg-[#4D8437]":teamId===4?"bg-[#394D98]":
                        teamId===5?"bg-[#E61D7A]":teamId===6?"bg-[#E7BE01]":teamId===7?"bg-[#E47900]":teamId===8?"bg-[#992089]":
                        teamId===9?"bg-[#015A94]":teamId===10?"bg-[#00993C]":teamId===11?"bg-[#B6002C]":""}>
            {
                teamname != ""?
                anime == true ?
                <div className='w-full h-[100vh] bg-white flex flex-col justify-center items-center absolute z-10'>
                    {/* {balls} */}
                    {/* @ts-ignore */}
                    <p className='text-4xl'>{teamname}が進化しました。</p>
                    <p className='w-[40%] mt-5 mx-auto'><img src={url} alt="新たに生成された画像" className='w-full'/></p>
                </div>: ""
                :""
            }
            <div className='flex'>
            {
                currentData?.map((data:any, index:number) => {
                    return(
                        <div key={data.id} className='relative w-[80%] h-[100%]'>
                            <h1 className='text-[56px] text-center font-bold  py-5 text-white'>{data.name}</h1>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={0}
                            // navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs, EffectCoverflow, Pagination]}
                            className="mySwiper2 h-[80%]"
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            grabCursor={true}
                            centeredSlides={true}
                            effect={'coverflow'}
                            pagination={true}
                            //@ts-ignore
                            loop={currentimageData?.length >= 3}
                            initialSlide={currentimageData?.length}
                        >   
                        {
                            currentimageData?.map((data,index)=>{
                                return(
                                    <SwiperSlide className='my-8' key={`imageslide${index+1}枚目`}>
                                        {
                                            index == 0 ?
                                            <div className="h-7"></div>:
                                            data.formattedTimestamp != null ?
                                            <p key={`imageslide${index+1}枚目`} className='text-white text-center' >{data.formattedTimestamp}に進化しました</p>:
                                            <p key={`imageslide${index+1}枚目`} className='text-white text-center' >{data.created_at}に進化しました</p>
                                        }
                                        <div className="rating mr-3 my-3">
                                            {
                                                Array.from({length: index + 1}).map((_, i) => (
                                                    <input key={i} type="" name="rating-2" className="mask mask-star bg-white" />
                                                ))
                                            }
                                        </div>
                                            {/* <input type='' name="rating-2" className="mask mask-star bg-white" /> */}
                                        <div className="card">
                                            <input type="checkbox" id={`card${index}`} className="more" aria-hidden="true" />
                                            <div className="content">
                                            <div className="front" style={{ backgroundImage: `url("image/${data.imageUrl}")` }}>
                                                <div className="inner">
                                                <label htmlFor={`card${index}`} className="button" aria-hidden="true">
                                                    進化の理由
                                                </label>
                                                </div>
                                            </div>
                                            <div className="back">
                                                <div className="inner">
                                                {
                                                    index == 0 ?
                                                    <p className='mt-[40%]'>{data.name}のメンバーが大切にしている漢字{currentData[0].kanji}から<br/>チームのキャラクターの卵が産まれました</p>:
                                                    <p className='mt-[40%]'>{data.name}が{index == 1 ? 1 :
                                                                                        index == 2 ? 2:
                                                                                        index == 3 ? 3:
                                                                                        index == 4 ? currentData[0].member.length :
                                                                                        index == 5 ? currentData[0].member.length+1 :
                                                                                        index == 6 ? currentData[0].member.length+3 :
                                                                                        index == 7 ? currentData[0].member.length+5 :
                                                                                        index == 8 ? currentData[0].member.length*2 :
                                                                                        index == 9 ? currentData[0].member.length*3 :
                                                                                        index == 10 ? currentData[0].member.length*5 :
                                                                                        index == 11 ? currentData[0].member.length*7 :
                                                                                        index == 12 ? currentData[0].member.length*9 :
                                                                                        index == 13 ? currentData[0].member.length*10 :
                                                                                        index == 14 ? currentData[0].member.length*11 :
                                                                                        index == 15 ? currentData[0].member.length*12 :
                                                                                        index == 16 ? currentData[0].member.length*13 :
                                                                                        index == 17 ? currentData[0].member.length*14 :
                                                                                        index == 18 ? currentData[0].member.length*15 :
                                                                                        currentData[0].member.length}回プレゼンをし、<br/>{data.tag}<br/>という評価をもらい、この姿に進化しました。</p>
                                                }
                                                <label htmlFor={`card${index}`} className="button return" aria-hidden="true">
                                                    <p className=' text-black'>←</p>
                                                </label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        </Swiper>
                        <div className='flex justify-around h-[20%] mb-1 text-center'>
                            <div className='text-white'>
                                <p>次の進化まで</p>
                                {
                                    teamId >= 1?
                                    teams[teamId-1].total_evaluation_count <= 3 ?
                                    <p className=''><span className='text-[40px]'>1</span>人</p>:
                                    teams[teamId-1].total_evaluation_count < data.member.length ?
                                    <p className=''><span className='text-[40px]'>{data.member.length-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length+1 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length+1-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length+3 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length+3-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length+5 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length+5-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*2 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*2-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*3 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*3-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*5 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*5-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*7 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*7-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*9 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*9-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*10 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*10-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*11 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*11-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*12 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*12-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*13 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*13-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*14 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*14-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    teams[teamId-1].total_evaluation_count < data.member.length*15 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*15-teams[teamId-1].total_evaluation_count}</span>人</p> :
                                    <p></p>:""
                                }
                            </div>
                            <div className='border-r'></div>
                            <div className='text-white'>
                                <p>合計点</p>
                                {
                                    teamId >= 1?
                                    <p className='text-[40px]'>{teams[teamId-1].total_team_score}<span className='text-base'>点</span></p>:""
                                    
                                }
                            </div>
                            <div className='border-r'></div>
                            <div className='text-white'>
                                <p>特徴</p>
                                {
                                    teamId >= 1?
                                    <p className='text-[32px]'>{teams[teamId-1].most_team_tag}</p>:""
                                }       
                            </div>
                            <div className='border-r'></div>
                            <div className='text-white'>
                                <p>合計プレゼン数</p>
                                {
                                    teamId >= 1?
                                    <p className=''><span className='text-[40px]'>{teams[teamId-1].total_evaluation_count}</span>回</p>:""
                                }
                            </div>
                        </div>
                    </div>
                    )
                })
            }
            

        <div className='w-[20%] mr-6 border-l-2'>
            <h2 className='text-center text-[24px] font-bold ml-8  mt-10 text-white'>ランキング</h2>
                <ul className="w-[90%] mx-6 my-6">
                    {
                        teamrank?.map((data:any, index:number) => {
                            return (
                                <li key={data.id}  onClick={()=>{setTeamId(data.tid)}}> 
                                        <div className="flex border-b items-center justify-between py-2">
                                            <div className="flex items-center">
                                            {/* 順位 */}
                                                {
                                                    index < 3 ?
                                                    <Image src={rankImages[index]} alt={`${index+1}位`} width={32} className=" my-2"/> : 
                                                    <p className="mx-1 text-[24px] my-2 text-white">{index+1}</p>
                                                }
                                            {/* チーム名 */}
                                                <p className={index < 9 ?" text-base font-medium ml-5 text-white":"text-base font-medium ml-2 text-white"}>{data.name}</p>
                                            </div>
                                            {/* 点数 */}
                                            <p className="text-base font-bold text-white">{data.total_evaluation_count}<span className="text-[10px] font-normal">回</span></p>
                                        </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            </div>
        </div>
        
    )
}

export default Slider