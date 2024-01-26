'use client'
import { useState} from 'react';
import React from 'react';
import Navigation from '@/components/nav';
import {useSearchParams } from 'next/navigation';
import Image from 'next/image';
import blueman from "@/app/(images)/blue-man.png" 
import greenman from "@/app/(images)/greenman.png"
import man from "@/app/(images)/man.png"
import orangeman from "@/app/(images)/orangeman.png"
import redman from "@/app/(images)/redman.png"
import { useRouter } from 'next/navigation';

interface MypageViewProps {
    scoredata : {score_1:number, score_2:number, score_3:number,score_4:number,comment:string, tag:string, uid:string, date:string,tid:number}[]
    studentdata: {id:number, uid:string, name:string,goal:number,job:string,schoolyear:string,team:string}[]
}

// 描画用
const MypageView :React.FC<MypageViewProps> = ({scoredata,studentdata}) => {
    const router = useRouter()

    const searchParams = useSearchParams()
    // 名前
    const username = searchParams?.get("name") ?? "";
    // uid
    const uid = searchParams?.get("uid") ?? "";  
    // 目標人数
    const goal = searchParams?.get("goal") ?? "";
    // チーム名
    const team = searchParams?.get("team") ?? "";

    const currentData= scoredata.filter((v) => v.uid == uid)

    const goaldata = studentdata.filter((v) => v.uid == uid)

    // ここの部分をサーバーと接続してデータを扱う-------------
    
    // 全体の評価された人数
    const nop = currentData.length;
    // 1日目の評価された人数
    const day1arr = currentData.filter((v)=> v.date == "2024-01-25");
    const day1 = day1arr.length;
    // 2日目の評価された人数
    const day2arr = currentData.filter((v)=> v.date == "2024-01-26");
    const day2 = day2arr.length;
    // 3日目の評価された人数
    const day3arr = currentData.filter((v)=> v.date == "2024-01-27");
    const day3 = day3arr.length;

    let sum:[number,number,number,number] = [0,0,0,0];
    let score1:[number,number,number,number] = [0,0,0,0];
    let score2:[number,number,number,number] = [0,0,0,0];
    let score3:[number,number,number,number] = [0,0,0,0];
    let score4:[number,number,number,number] = [0,0,0,0];

    // 合計値の計算　---------------------------------------------------------
    // 全体
    currentData.map((data)=>{
        sum[0] = sum[0] + data.score_1 + data.score_2 + data.score_3 + data.score_4 + 100;
        score1[0] += data.score_1;
        score2[0] += data.score_2;
        score3[0] += data.score_3;
        score4[0] += data.score_4;
    })
    // 1日目
    day1arr.map((data)=>{
        sum[1] = sum[1] + data.score_1 + data.score_2 + data.score_3 + data.score_4 + 100; + 100;
    })
    // 2日目
    day2arr.map((data)=>{
        sum[2] = sum[2] + data.score_1 + data.score_2 + data.score_3 + data.score_4 + 100; + 100;
    })
    // 3日目
    day3arr.map((data)=>{
        sum[3] = sum[3] + data.score_1 + data.score_2 + data.score_3 + data.score_4 + 100; + 100;
    })

    //タブの開閉用---------------------------------------
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber : number) => {
        setActiveTab(tabNumber);
    };
    // -------------------------------------------------

    const goalview = () =>{
        const items = [];
        if(currentData.length <= goaldata[0].goal){
            for(let i=0; i<currentData.length; i++){
                items.push(<li key={`presented-${i}`}><Image src={blueman} width={22} height={22} alt="プレゼンした人数" /></li>)
            }
            for(let i=0; i<goaldata[0].goal-currentData.length; i++){
                items.push(<li key={`remaining-${i}`}><Image src={man} width={22} height={22} alt="プレゼンした人数" /></li>)
            }
        }
        else if(currentData.length > goaldata[0].goal){
            if(currentData.length > goaldata[0].goal*2){
                for(let i=0; i<currentData.length-goaldata[0].goal*2; i++){
                    items.push(<li key={`presented-${i}`}><Image src={greenman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
                for(let i=0; i<goaldata[0].goal; i++){
                    items.push(<li key={`remaining-${i}`}><Image src={orangeman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
            }else if(currentData.length > goaldata[0].goal*3){
                for(let i=0; i<currentData.length-goaldata[0].goal*3; i++){
                    items.push(<li key={`presented-${i}`}><Image src={redman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
                for(let i=0; i<goaldata[0].goal; i++){
                    items.push(<li key={`remaining-${i}`}><Image src={greenman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
            }
            else{
                for(let i=0; i<currentData.length-goaldata[0].goal; i++){
                    items.push(<li key={`presented-${i}`}><Image src={orangeman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
                for(let i=0; i<goaldata[0].goal; i++){
                    items.push(<li key={`remaining-${i}`}><Image src={blueman} width={22} height={22} alt="プレゼンした人数" /></li>)
                }
            }
        }
        
        
        return items;
    }

    return (
        <>
            <div>
                <div className="font-bold text-l mt-8 ml-8">
                    <button 
                    className="btn bg-black text-[#fff]"
                    onClick={()=>{
                        router.push("/student")
                    }}  
                    >
                    <span className="mr-[2px]">&lt;</span>戻る
                    </button>
                </div>
                <section className='w-[90%] mt-8 mx-auto pb-20'>
                    <div className='relative'>
                        <div className='pl-8 inline-flex flex-wrap flex-col-reverse gap-1 mt-1'>   
                            <h2 className='text-2xl text-black font-bold relative z-10'>
                                {username}
                            </h2>
                            <p className='relative z-10 text-black text-xl'>{team}</p>
                            <p className='text-[84px] text-[#c5c5c5] absolute left-0 top-[-45%]'>{uid}</p>
                        </div>
                    </div>
                    <p className='text-[16px] text-[#000000] absolute right-[5%] top-8'>ブース番号:{uid}</p>
                    <div className='mt-1 pl-2 flex flex-wrap gap-2 relative z-10 text-sm'>
                        <p className='inline-block mt-3 pb-1 px-2 font-bold bg-[#e3e3e3] rounded-md'>#{goaldata[0].schoolyear}</p>
                        <p className='inline-block mt-3 pb-1 px-2 font-bold bg-[#e3e3e3] rounded-md'>#{goaldata[0].job}</p>
                        {
                            // @ts-ignore
                            [...new Set(currentData.reduce<string[]>((pre,cur) => {
                                pre.push(cur.tag)
                                return pre
                            },[]))].map((data,index)=>{
                                return(
                                    <p key={`tag-${data}`} className='inline-block mt-3 pb-1 px-2 font-bold bg-[#e3e3e3] rounded-md'>#{data}</p>
                                )
                            })
                        }
                    </div>
                    
                    {/* タブメニュー */}
                    <div role="tablist" className='mt-8 text-xl tabs tabs-bordered'>
                        <p className= {activeTab === 1 ? 'tab tab-active font-bold' :'tab'} 
                        onClick={() => handleTabClick(1)}>
                            全体
                        </p>
                        <p className= {activeTab === 2 ? 'tab tab-active font-bold' :'tab'} 
                        onClick={() => handleTabClick(2)}>
                            1日目
                        </p>
                        <p className= {activeTab === 3 ? 'tab tab-active font-bold' :'tab'} 
                        onClick={() => handleTabClick(3)}>
                            2日目
                        </p>
                        <p className= {activeTab === 4 ? 'tab tab-active font-bold' :'tab'} 
                        onClick={() => handleTabClick(4)}>
                            3日目
                        </p>
                    </div>

                    {/* タブで切り替わるコンテンツ */}
                    <div className="mt-4">
                        {/* 全体 */}
                        {activeTab === 1 && 
                            <>
                                <section className='w-[90%] mx-auto text-center mt-8 text-lg font-bold border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)] px-5 py-8'>
                                    <h3 className='text-[#5B5B5B]'>目標プレゼン人数</h3>
                                    <p className='text-center align-bottom text-3xl ml-[2%] mr-[2%] mt-6 text-[#818181]'>
                                        <span className='text-6xl text-black font-bold'>{currentData.length}</span>
                                        <span className='text-black text-2xl'>人</span>
                                        <span className='text-xl ml-1'>/</span>
                                        {goal}<span className='text-base ml-3'>人</span>
                                    </p>
                                    <ul className='inline-flex w-[80%] mx-auto mt-6 flex-wrap list-none gap-2'>
                                        {goalview()}
                                    </ul>
                                </section>
                                
                                <div className='border-b-8 border-dashed border-black pb-12'>
                                    <section className="w-[90%] mx-auto mt-12 border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)] py-12">
                                            <h3 className='text-center text-lg font-bold text-[#5B5B5B]'>合計スコア</h3>
                                            <p className='text-6xl font-bold text-center mt-6 text-black'>{sum[0]}<span className='text-2xl text-[#818181]'>点</span></p>
                                        
                                        <div className='w-[80%] mx-auto mt-8'>
                                            <p className='font-bold'>企画<progress className="progress progress-primary" value={score1[0]} max={currentData.length*100}></progress></p>
                                            <p className='font-bold mt-4'>デザイン<progress className="progress progress-primary" value={score2[0]} max={currentData.length*100}></progress></p>
                                            <p className='font-bold mt-4'>実装<progress className="progress progress-primary" value={score3[0]} max={currentData.length*100}></progress></p>
                                            <p className='font-bold mt-4'>プレゼン<progress className="progress progress-primary" value={score4[0]} max={currentData.length*100}></progress></p>
                                        </div>
                                    </section>
                                </div>
                                
                                <div className='w-[90%] mx-auto'>
                                    {
                                        currentData?.map((data,index)=>{
                                            return(
                                                <React.Fragment key={`all-${index}`}>
                                                <div key={`currentData-${data.uid}`} className='mt-8'>
                                                    <div className='p-6 border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)]'>
                                                        <section className='text-lg font-bold'>
                                                            <h3 className='text-center'>点数</h3>
                                                            <div className='w-[80%] mx-auto mt-8'>
                                                                <div>
                                                                    <p className='font-bold flex justify-between'>企画<span>{data.score_1}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_1} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>デザイン<span>{data.score_2}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_2} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>実装<span>{data.score_3}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_3} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>プレゼン<span>{data.score_4}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_4} max={100}></progress>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        
                                                        <section>
                                                            <h3 className='mt-8 text-lg font-bold text-center'>コメント</h3>
                                                            <div className='py-6'>
                                                                <div className='w-[90%] mx-auto text-left border-b-2 border-black'>
                                                                    <p className='text-lg font-bold inline-block'>
                                                                        {data.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        
                                                        <section>
                                                            <div className='mt-2 text-lg font-bold'>
                                                                <p className='inline-block pb-1 px-2 font-bold bg-[#ececec] rounded-md'>#{data.tag}</p>
                                                            </div>
                                                        </section>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                    
                                                </React.Fragment>
                                                
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        {/* 1日目 */}
                        {activeTab === 2 && 
                            <>
                                <div className="mt-4 pb-9 border-b-8 border-dashed border-black">
                                    <p className='font-bold text-lg mt-8'>{day1}人に評価されています。</p>
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[1]}<span className='text-base'>点</span></p>
                                </div>
                                
                                <div className='w-[90%] mx-auto'>
                                    {
                                        day1arr?.map((data,index)=>{
                                            return(
                                            <React.Fragment key={`day1-${index}`}>
                                                <div className='mt-8'>
                                                    <div className='p-6 border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)]'>
                                                        <section className='text-lg font-bold'>
                                                            <h3 className='text-center'>点数</h3>
                                                            <div className='w-[80%] mx-auto mt-8'>
                                                                <div>
                                                                    <p className='font-bold flex justify-between'>企画<span>{data.score_1}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_1} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>デザイン<span>{data.score_2}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_2} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>実装<span>{data.score_3}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_3} max={100}></progress>
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <p className='font-bold flex justify-between'>プレゼン<span>{data.score_4}<span className='text-xs'>点</span></span></p>
                                                                    <progress className="progress progress-accent" value={data.score_4} max={100}></progress>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        
                                                        <section>
                                                            <h3 className='mt-12 text-lg font-bold text-center'>コメント</h3>
                                                            <div className='py-6'>
                                                                <div className='w-[90%] mx-auto text-left border-b-2 border-black'>
                                                                    <p className='text-lg font-bold inline-block'>
                                                                        {data.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </section>
                                                        
                                                        <section>
                                                            <div className='mt-2 text-lg font-bold'>
                                                                <p className='inline-block pb-1 px-2 font-bold bg-[#ececec] rounded-md'>#{data.tag}</p>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        {/* 2日目 */}
                        {activeTab === 3 && 
                            <>
                                <div className="mt-4 pb-9 border-b-8 border-dashed border-black">
                                    <p className='font-bold text-lg mt-8'>{day2}人に評価されています。</p>
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[2]}<span className='text-base'>点</span></p>
                                </div>
                                
                                <div className='w-[90%] mx-auto'>
                                    {
                                        day2arr?.map((data,index)=>{
                                            return(
                                                <React.Fragment key={`day2-${index}`}>
                                                    <div className='mt-8'>
                                                        <div className='p-6 border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)]'>
                                                            <section className='text-lg font-bold'>
                                                                <h3 className='text-center'>点数</h3>
                                                                <div className='w-[80%] mx-auto mt-8'>
                                                                    <div>
                                                                        <p className='font-bold flex justify-between'>企画<span>{data.score_1}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_1} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>デザイン<span>{data.score_2}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_2} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>実装<span>{data.score_3}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_3} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>プレゼン<span>{data.score_4}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_4} max={100}></progress>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            
                                                            <section>
                                                                <h3 className='mt-12 text-lg font-bold text-center'>コメント</h3>
                                                                <div className='py-6'>
                                                                    <div className='w-[90%] mx-auto text-left border-b-2 border-black'>
                                                                        <p className='text-lg font-bold inline-block'>
                                                                            {data.comment}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            
                                                            <section>
                                                                <div className='mt-2 text-lg font-bold'>
                                                                    <p className='inline-block pb-1 px-2 font-bold bg-[#ececec] rounded-md'>#{data.tag}</p>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        {/* 3日目 */}
                        {activeTab === 4 &&
                            <>
                                <div className="mt-4 pb-9 border-b-8 border-dashed border-black">
                                    <p className='font-bold text-lg mt-8'>{day3}人に評価されています。</p>
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[3]}<span className='text-base'>点</span></p>
                                </div>
                                
                                <div className='w-[90%] mx-auto'>
                                    {
                                        day3arr?.map((data,index)=>{
                                            return(
                                                <React.Fragment key={`day3-${index}`}>
                                                    <div className='mt-8'>
                                                        <div className='p-6 border-white rounded-3xl shadow-[1px_2px_4px_2px_rgba(0,0,0,0.25)]'>
                                                            <section className='text-lg font-bold'>
                                                                <h3 className='text-center'>点数</h3>
                                                                <div className='w-[80%] mx-auto mt-8'>
                                                                    <div>
                                                                        <p className='font-bold flex justify-between'>企画<span>{data.score_1}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_1} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>デザイン<span>{data.score_2}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_2} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>実装<span>{data.score_3}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_3} max={100}></progress>
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <p className='font-bold flex justify-between'>プレゼン<span>{data.score_4}<span className='text-xs'>点</span></span></p>
                                                                        <progress className="progress progress-accent" value={data.score_4} max={100}></progress>
                                                                </div>
                                                                </div>
                                                            </section>
                                                            
                                                            <section>
                                                                <h3 className='mt-12 text-lg font-bold text-center'>コメント</h3>
                                                                <div className='py-6'>
                                                                    <div className='w-[90%] mx-auto text-left border-b-2 border-black'>
                                                                        <p className='text-lg font-bold inline-block'>
                                                                            {data.comment}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            
                                                            <section>
                                                                <div className='mt-2 text-lg font-bold'>
                                                                    <p className='inline-block pb-1 px-2 font-bold bg-[#ececec] rounded-md'>#{data.tag}</p>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>

                </section>
                <Navigation/>
            </div>
        </>
    )
}

export default MypageView