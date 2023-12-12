'use client'
import Navigation from "@/components/nav";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent,useState } from 'react';

interface NummverProps {
    studentarr: {id:number, uid:string, name:string}[]
}

const Nummber: React.FC<NummverProps> = ({studentarr}) => {
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
            for (let j = 1; j <= 34; j++) {
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
                <h2 className="text-xl font-bold text-center mt-6">評価する学生の学籍番号入力してください</h2>
                
                <div className="flex flex-wrap justify-center mt-12">
                    <input type="number" placeholder="0101" className="input input-bordered w-full max-w-xs" value={inputvalue} onInput={handleInputChange} maxLength={4}/>
                    <p className="w-full max-w-xs text-[#d54747]">{errmsg}</p>
                </div>

                <div className="font-bold text-l flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                        onClick={()=>{
                            //特定の言葉以外が入れられたら排除
                            try {
                                // フィルターの処理
                                const filteredValue = filterSpecificWords(inputvalue, allowedWords);
                                console.log(filteredValue);
                                router.push(`/score?uid=${filteredValue}`);
                            } catch (error) {
                                setInputvalue("");
                                setErrMsg("※正しい値を入力してください。");
                                // エラーの処理を追加
                            }
                        }}
                    >
                            評価をする
                    </button>
                </div>
                
            </section>
            <Navigation/>
        </div>
    )
}

export default Nummber;