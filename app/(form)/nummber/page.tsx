'use client'
import Navigation from "@/components/nav";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent,useState } from 'react';

// interface NummberProps {
//     studentarr: {id:number, uid:string, name:string}[]
// }

const Nummber= () => {
    const router = useRouter()
    const [inputvalue,setInputvalue] = useState<string>("");
    const [errmsg,setErrMsg] = useState<string>("");


    const allowedWords:string[] = [];
    for (let i=0; i<2; i++){
        if(i == 0){
            for (let j = 1; j <= 35; j++) {
                if (j < 10) {
                const num = "010" + j;
                    allowedWords.push(num);
                } else {
                const num = "01"+j;
                    allowedWords.push(num);
                }
            }
        }else if(i == 1){
            for (let j = 1; j <= 41; j++) {
                if (j < 10) {
                const num = "020" + j;
                    allowedWords.push(num);
                } else {
                const num = "02"+j;
                    allowedWords.push(num);
                }
            }
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // inputの文字数の制限
        sliceMaxLength(e.target, 4);
        // inputに入力された値以外の値を排除
        setInputvalue(e.target.value);
        console.log(e.target.value);
    };

    const filterSpecificWords = (input: string, allowedWords: string[]) => {
    // 入力された値が配列に含まれているかチェック
        if (!allowedWords.includes(input)) {
            throw new Error('指定された言葉以外は入力できません。');
        }
    
        return input;
    };
    
    // inputタグの処理  
    const sliceMaxLength = (elem: HTMLInputElement, maxLength: number) => {
        elem.value = elem.value.slice(0, maxLength);
    };
      

    return(
        <div>
            <section>
                <h1 className="text-xl font-bold text-center mt-6">評価する</h1>

                <div className="mt-[50%]">
                    <div className="flex flex-wrap justify-center">
                        <div className="text-left w-full max-w-xs">
                            <h2 className="text-base font-bold">ブース番号を入力</h2>
                            <p className="text-xs mb-2">評価する学生のブース番号を入力してください</p>
                        </div>
                            <input type="number" placeholder="0101" className="input input-bordered w-full max-w-xs mx-6" value={inputvalue} onInput={handleInputChange} maxLength={4}/>
                            <p className="w-full max-w-xs text-[#d54747]">{errmsg}</p>
                    </div>

                    <div className="font-bold text-l flex justify-end mt-8 mr-10">
                        <button
                            className="btn bg-black text-white"
                            onClick={()=>{
                                //特定の言葉以外が入れられたら排除
                                try {
                                    // フィルターの処理
                                    const filteredValue = filterSpecificWords(inputvalue, allowedWords);
                                    console.log(filteredValue);
                                    localStorage.setItem('filteredValue', filteredValue.toString());
                                    router.push(`/score?uid=${filteredValue}`);
                                } catch (error) {
                                    setInputvalue("");
                                    setErrMsg("※正しい値を入力してください。");
                                    // エラーの処理を追加
                                }
                            }}
                        >
                            次へ<span className="ml-[2px]">&gt;</span>
                        </button>
                    </div>
                </div>
                
            </section>
            <Navigation/>
        </div>
    )
}

export default Nummber;