'use client'
import { useState } from 'react';
import Navigation from '@/components/nav';

export default function Mypage() {

    // ここの部分をサーバーと接続してデータを扱う-------------

    // 各自の名前
    const username = "齋藤 元"; 
    // ブース番号
    const usernum = 1;

    // 全体の評価された人数
    const nop = 10;
    // 1日目の評価された人数
    const day1 = 3;
    // 2日目の評価された人数
    const day2 = 5;
    // 3日目の評価された人数
    const day3 = 2;

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

    const Graph = (deta1:number,deta2:number,deta3:number) =>{
        return(
            <>
                <section className='bg-[#B1B1B1] py-4 mt-4'>
                    <h3 className=' font-bold text-lg mb-4 ml-4'>平均スコア</h3>
                    <div className='flex flex-wrap text-center justify-center'>
                        <div className='w-[80%]'>
                            <div className="radial-progress bg-[#908D8D] text-[#CBCBCB] text-center text-lg font-bold" style={{"--value":deta1, "--size": "7rem"}} role="progressbar">
                                <p className='text-[#000] text-sm mask mask-circle w-[7rem] h-[5.5rem] bg-[#B1B1B1] flex flex-col justify-center'>
                                    企画<br/>
                                    <span className='text-2xl font-bold'>{deta1}%</span>
                                </p>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className="radial-progress bg-[#908D8D] text-[#CBCBCB] text-center text-lg font-bold" style={{"--value":deta2, "--size": "7rem"}} role="progressbar">
                                <p className='text-[#000] text-sm mask mask-circle w-[7rem] h-[5.5rem] bg-[#B1B1B1] flex flex-col justify-center'>
                                    完成度<br/>
                                    <span className='text-2xl font-bold'>{deta2}%</span>
                                </p>
                            </div>
                        </div>
                        <div className='w-[40%]'>
                            <div className="radial-progress bg-[#908D8D] text-[#CBCBCB] text-center text-lg font-bold" style={{"--value":deta3, "--size": "7rem"}} role="progressbar">
                                <p className='text-[#000] text-sm mask mask-circle w-[7rem] h-[5.5rem] bg-[#B1B1B1] flex flex-col justify-center'>
                                    プレゼン<br/>
                                    <span className='text-2xl font-bold'>{deta3}%</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
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

    return (
        <div>
            <section className='w-[90%] mt-8 mx-auto'>
                <div className='inline-flex items-center flex-row-reverse gap-5'>
                    <h2 className='text-3xl'>
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

                <div>
                        {
                            Graph2(detaarr[0],detaarr[1],detaarr[2])
                        }
                </div>


                {/* タブで切り替わるコンテンツ */}
                <div className="mt-4">
                    {/* 全体 */}
                    {activeTab === 1 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{nop}人に評価されています。</p>
                            <section>
                                {
                                    Graph(detaarr[0],detaarr[1],detaarr[2])
                                }
                            </section>
                        </>
                    }
                    {/* 1日目 */}
                    {activeTab === 2 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{day1}人に評価されています。</p>
                            <section>
                                {
                                    Graph(detaarr[0],detaarr[1],detaarr[2])
                                }
                            </section>
                        </>
                    }
                    {/* 2日目 */}
                    {activeTab === 3 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{day2}人に評価されています。</p>
                            <section>
                                {
                                    Graph(detaarr[0],detaarr[1],detaarr[2])
                                }
                            </section>
                        </>
                    }
                    {/* 3日目 */}
                    {activeTab === 4 &&
                        <>
                            <p className='font-bold text-lg mt-8'>{day3}人に評価されています。</p>
                            <section>
                                {
                                    Graph(detaarr[0],detaarr[1],detaarr[2])
                                }
                            </section>
                        </>
                    }
                </div>
            </section>
        <Navigation/>
        </div>
  
    )
}