'use client'
import { useRouter } from 'next/navigation';
import insertdata from './insert';
import React from 'react';
import { useEffect, useState } from 'react';

const end = ()=>{
    const router = useRouter()
    const [state,setState] = useState(false)
    const [data,setdata] = useState<string[]>([])
    const text = ["企画","デザイン","実装","プレゼン","コメント","タグ",]
    const [uiddata,setuiddata] = useState<string>("");
    useEffect(()=>{
        // ローカルストレージから値を取得
        const uid = localStorage.getItem('filteredValue');
        const score_1 = localStorage.getItem('score_1');
        const score_2 = localStorage.getItem('score_2');
        const score_3 = localStorage.getItem('score_3');
        const score_4 = localStorage.getItem('score_4');
        const comment = localStorage.getItem('inputText');
        const tag = localStorage.getItem('selectedTags');
        if(uid != null && score_1 != null && score_2 != null && score_3 != null && score_4 != null && comment != null && tag != null){
            setuiddata(uid)
            const dataarr = [`${score_1}点`,`${score_2}点`,`${score_3}点`,`${score_4}点`,comment,tag];
            setdata(dataarr);
        }
    },[])
    useEffect(()=>{
        // ローカルストレージから値を取得
        const uid = localStorage.getItem('filteredValue');
        const score_1 = localStorage.getItem('score_1');
        const score_2 = localStorage.getItem('score_2');
        const score_3 = localStorage.getItem('score_3');
        const score_4 = localStorage.getItem('score_4');
        const comment = localStorage.getItem('inputText');
        const tag = localStorage.getItem('selectedTags');
        if(state === true){
            if(uid != null && score_1 != null && score_2 != null && score_3 != null && score_4 != null && comment != null && tag != null){
                insertdata(uid,score_1,score_2,score_3,score_4,comment,tag);
            }
            //ここに画像生成の条件式を打ち込む
        }
    },[state])

    return(
        <div>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">入力内容の確認</h2>

                <p className='text-base font-bold text-center mt-20'>以下の内容で送信してもよろしいですか？</p>

                <div className='border-b-2 mt-6 w-[90%] mx-auto'>
                    {
                        data.map((data,index)=>{
                            return(
                                <React.Fragment key={`finish${index}`}>
                                    <div className='flex justify-around flex-wrap pt-3 pb-3 border-t-2'>
                                        <p className='w-[25%] text-right'>{text[index]}</p>
                                        <p className='w-[60%]'>{data}</p>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                

                <div className="flex justify-between">
                    <div className="font-bold text-l mt-8 ml-10">
                        <button 
                        className="btn bg-white text-[#808080]"
                        onClick={()=>{
                            router.push("/tag")
                        }}  
                        >
                        <span className="mr-[2px]">&lt;</span>戻る
                        </button>
                    </div>
                    <div className="font-bold text-l mt-8 mr-10">
                        <button onClick={()=>{
                            setState(true)

                            router.push(`/teams?uid=${uiddata}`);
                        }} className="btn bg-black text-white">
                        送信する<span className="ml-[2px]">&gt;</span>
                        </button>
                    </div>
                </div>
                
            </section>
        </div>
    )
}

export default end;