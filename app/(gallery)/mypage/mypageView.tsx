'use client'
import { useState,useMemo, useEffect } from 'react';
import Navigation from '@/components/nav';
import {useSearchParams } from 'next/navigation';

interface MypageViewProps {
    studentarr: {id:number, uid:string, name:string,goal:number}[]
    scoredata : {score_1:number, score_2:number, score_3:number, comment:string, tag:string, uid:string, date:string}[]
}

const Graph2 =  (deta1:number,deta2:number,deta3:number) =>{
    return(
        <section className='py-4 mt-4'>
            <div>
                <progress className="progress w-56" value={deta1} max="100"></progress>
                <progress className="progress progress-accent w-56" value={deta2} max="100"></progress>
                <progress className="progress progress-secondary w-56" value={deta3} max="100"></progress>
            </div>
        </section>
    )    
}

// 描画用
const MypageView :React.FC<MypageViewProps> = ({studentarr,scoredata}) => {
    const searchParams = useSearchParams()
    // ブース番号
    const usernum = searchParams.get("id")
    // 名前
    const username = searchParams.get("name")
    // uid
    const uid = searchParams.get("uid")    
    // 目標人数
    const goal = searchParams.get("goal")


    const currentData= scoredata.filter((v) => v.uid == uid)

    // ここの部分をサーバーと接続してデータを扱う-------------
    
    // 全体の評価された人数
    const nop = currentData.length;
    // 1日目の評価された人数
    const day1arr = currentData.filter((v)=> v.date == "2023-12-14");
    const day1 = day1arr.length;
    // 2日目の評価された人数
    const day2arr = currentData.filter((v)=> v.date == "2023-12-15");
    const day2 = day2arr.length;
    // 3日目の評価された人数
    const day3arr = currentData.filter((v)=> v.date == "2023-12-16");
    const day3 = day3arr.length;

    let sum:[number,number,number,number] = [0,0,0,0];

    // 合計値の計算　---------------------------------------------------------
    // 全体
    currentData.map((data)=>{
        sum[0] = sum[0] + data.score_1 + data.score_2 + data.score_3 + 100;
    })
    // 1日目
    day1arr.map((data)=>{
        sum[1] = sum[1] + data.score_1 + data.score_2 + data.score_3 + 100;
    })
    // 2日目
    day2arr.map((data)=>{
        sum[2] = sum[2] + data.score_1 + data.score_2 + data.score_3 + 100;
    })
    // 3日目
    day3arr.map((data)=>{
        sum[3] = sum[3] + data.score_1 + data.score_2 + data.score_3 + 100;
    })
    
    // --------------------------------------------------------------------


    // -------------------------------------------------

    //タブの開閉用---------------------------------------
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber : number) => {
        setActiveTab(tabNumber);
    };
    // -------------------------------------------------

    // グラフの数値用
    // テスト用（後で消す）
    const detaarr = [20,90,50] 

    // -------------------------------------------------

    return (
        <>
            <div>
                <section className='w-[90%] mt-8 mx-auto pb-20'>
                    <div className='inline-flex items-center flex-row-reverse gap-5'>
                        <h2 className='text-3xl text-black'>
                            {username}
                        </h2>
                        <p className='text-3xl bg-gray-400 w-10 h-10 text-white flex justify-center items-center'>{usernum}</p>
                    </div>
                    {/* タブメニュー */}
                    <div className='flex mt-16 text-lg justify-around w-full text-center items-center'>
                        <p className= {activeTab === 1 ? 'bg-gray-400 w-[25%] py-3 font-bold' :'bg-gray-300 w-[24%] py-3'} 
                        onClick={() => handleTabClick(1)}>
                            全体
                        </p>
                        <p className= {activeTab === 2 ? 'bg-gray-400 w-[25%] py-3 font-bold' :'bg-gray-300 w-[24%] py-3'} 
                        onClick={() => handleTabClick(2)}>
                            1日目
                        </p>
                        <p className= {activeTab === 3 ? 'bg-gray-400 w-[25%] py-3 font-bold' :'bg-gray-300 w-[24%] py-3'} 
                        onClick={() => handleTabClick(3)}>
                            2日目
                        </p>
                        <p className= {activeTab === 4 ? 'bg-gray-400 w-[25%] py-3 font-bold' :'bg-gray-300 w-[24%] py-3'} 
                        onClick={() => handleTabClick(4)}>
                            3日目
                        </p>
                    </div>

                    {/* タブで切り替わるコンテンツ */}
                    <div className="mt-4">
                        {/* 全体 */}
                        {activeTab === 1 && 
                            <>
                                <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                    <p>{currentData.length}/{goal}</p>
                                </div>
                                <div className="w-[90%] mx-auto mt-4 pb-9 border-b-8 border-dashed border-black">
                                    <p className='font-bold text-lg mt-8'>{nop}人に評価されています。</p>
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[0]}pt</p>
                                </div>
                                
                                <div>
                                    {
                                        currentData?.map((data,index)=>{
                                            return(
                                                <>
                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>企画:{data.score_1}点</p>
                                                        <p>完成度:{data.score_2}点</p>
                                                        <p>プレゼン:{data.score_3}点</p>
                                                    </div>
                                                    
                                                    <div className='w-[90%] mx-auto mt-12 py-4 bg-slate-300'>
                                                        <p key={index} 
                                                        className='text-lg font-bold text-center'
                                                        >{data.comment}
                                                        </p>
                                                    </div>

                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>#{data.tag}</p>
                                                    </div>
                                                </>
                                                
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
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[1]}pt</p>
                                </div>
                                
                                <div>
                                    {
                                        day1arr?.map((data,index)=>{
                                            return(
                                                <>
                                                   <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>企画:{data.score_1}点</p>
                                                        <p>完成度:{data.score_2}点</p>
                                                        <p>プレゼン:{data.score_3}点</p>
                                                    </div>
                                                    
                                                    <div className='w-[90%] mx-auto mt-12 py-4 bg-slate-300'>
                                                        <p key={index} 
                                                        className='text-lg font-bold text-center'
                                                        >{data.comment}
                                                        </p>
                                                    </div>

                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>#{data.tag}</p>
                                                    </div>
                                                </>
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
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[2]}pt</p>
                                </div>
                                
                                <div>
                                    {
                                        day2arr?.map((data,index)=>{
                                            return(
                                                <>
                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>企画:{data.score_1}点</p>
                                                        <p>完成度:{data.score_2}点</p>
                                                        <p>プレゼン:{data.score_3}点</p>
                                                    </div>
                                                    
                                                    <div className='w-[90%] mx-auto mt-12 py-4 bg-slate-300'>
                                                        <p key={index} 
                                                        className='text-lg font-bold text-center'
                                                        >{data.comment}
                                                        </p>
                                                    </div>

                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>#{data.tag}</p>
                                                    </div>
                                                </>
                                                
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
                                    <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum[3]}pt</p>
                                </div>
                                
                                <div>
                                    {
                                        day3arr?.map((data,index)=>{
                                            return(
                                                <>
                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>企画:{data.score_1}点</p>
                                                        <p>完成度:{data.score_2}点</p>
                                                        <p>プレゼン:{data.score_3}点</p>
                                                    </div>
                                                    
                                                    <div className='w-[90%] mx-auto mt-12 py-4 bg-slate-300'>
                                                        <p key={index} 
                                                        className='text-lg font-bold text-center'
                                                        >{data.comment}
                                                        </p>
                                                    </div>

                                                    <div className='w-[90%] mx-auto mt-8 text-lg font-bold'>
                                                        <p>#{data.tag}</p>
                                                    </div>
                                                </>
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