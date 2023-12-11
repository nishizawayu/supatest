'use client'
import { useState } from 'react';
import Navigation from '@/components/nav';
import { useRouter, useSearchParams } from 'next/navigation';

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

const Mypage: React.FC = () => {

    const router = useRouter();
    const searchParams = useSearchParams()
    // ブース番号
    const usernum = searchParams.get("id")
    // 名前
    const username = searchParams.get("name")

    // ここの部分をサーバーと接続してデータを扱う-------------
    
    // ブース番号
    // const usernum = router.query.uid === uid;

    // 全体の評価された人数
    const nop = 10;
    // 1日目の評価された人数
    const day1 = 3;
    // 2日目の評価された人数
    const day2 = 5;
    // 3日目の評価された人数
    const day3 = 2;

    const sum = 250;

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
        <div>
            <section className='w-[90%] mt-8 mx-auto'>
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
                <div className="mt-4 pb-9 border-b-8 border-dashed border-black">
                    {/* 全体 */}
                    {activeTab === 1 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{nop}人に評価されています。</p>
                            <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum}pt</p>
                        </>
                    }
                    {/* 1日目 */}
                    {activeTab === 2 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{day1}人に評価されています。</p>
                            <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum}pt</p>
                        </>
                    }
                    {/* 2日目 */}
                    {activeTab === 3 && 
                        <>
                            <p className='font-bold text-lg mt-8'>{day2}人に評価されています。</p>
                            <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum}pt</p>
                        </>
                    }
                    {/* 3日目 */}
                    {activeTab === 4 &&
                        <>
                            <p className='font-bold text-lg mt-8'>{day3}人に評価されています。</p>
                            <p className='text-4xl font-bold text-center mt-9'><span className='text-base mr-3'>合計</span>{sum}pt</p>
                        </>
                    }
                </div>

                    
                
                <div>
                    {
                        Graph2(detaarr[0],detaarr[1],detaarr[2])
                    }
                </div>

            </section>
        <Navigation/>
        </div>
  
    )
}

export default Mypage