"use client"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import rank1 from "@/app/(images)/rank1.png"
import rank2 from "@/app/(images)/rank2.png"
import rank3 from "@/app/(images)/rank3.png"
import rank4 from "@/app/(images)/rank4.png"
import rank5 from "@/app/(images)/rank5.png"
import rank6 from "@/app/(images)/rank6.png"
import rank7 from "@/app/(images)/rank7.png"
import rank8 from "@/app/(images)/rank8.png"
import rank9 from "@/app/(images)/rank9.png"
import Spinner from "@/components/Spinner"

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string, job:string, team:string, school_year:string, most_common_tag:string}[]
    scoredata : {score_1:number, score_2:number, score_3:number, comment:string, tag:string, uid:string, date:string}[]
}

// 描画用
const StudentView: React.FC<StudentViewProps> = ({ studentarr }) => {
    // const [loading, setLoading] = useState(true);
    const rankImages = [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9,];
    const [studentYear, setStudentYear] = useState(0)
    const [studentJob, setStudentJob] = useState(0)
    const [studentCharacter, setStudentCharacter] = useState(0)
    const [studentserch,setStudentserch] = useState("");

    const currentData = useMemo(() => {
        let result = studentarr;
    
        if(studentYear === 1) {
            result = result.filter((v) => v.id <=35);
        } else if(studentYear === 2) {
            result = result.filter((v) => v.id >35);
        }
    
        if(studentJob === 3) {
            result = result.filter((v) => v.job == "エンジニア");
        } else if(studentJob === 4) {
            result = result.filter((v) => v.job == "デザイナー");
        }
    
        if(studentCharacter === 5) {
            result = result.filter((v) => v.most_common_tag == "すごい");
        } else if(studentCharacter === 6) {
            result = result.filter((v) => v.most_common_tag == "面白い");
        }
    
        if(studentserch >= "0101"){
            result = result.filter((v)=> v.uid == studentserch);
        }
    
        return result;
    }, [studentJob,studentYear,studentCharacter,studentserch]);
    

    const handleInputChange = (event:any) => {
        const value = event.target.value
        if (value.length > 4) {
            event.target.value = value.slice(0, 4); // 4桁を超える入力を切り捨て
        }
        setStudentserch(event.target.value);
    };

    return (
        <>
            <div>
                <h1 className="text-xl font-bold text-center mt-7">
                    学生を見る
                </h1>

                <div className="join flex justify-center mt-8">
                    <input className="input border-black join-item w-[282px]" type="number" placeholder="番号で探す" value={studentserch} onChange={handleInputChange}/>
                    {/* <button className="btn join-item w-[63px] bg-black text-white border-black">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
                    </button> */}
                </div>

                <div className="flex justify-between mx-6 mt-8 sticky top-5 bottom-5">
                    <select value={studentYear} className="select select-primary pl-3 pr-8"  onChange={(e) => setStudentYear(parseInt(e.target.value))}>
                        <option disabled value={0}>学生</option>
                        <option value={1}>1年</option>
                        <option value={2}>2年</option>
                        <option value={100}>全て</option>
                    </select>

                    <select value={studentJob} className="select select-primary pl-3" onChange={(e) => setStudentJob(parseInt(e.target.value))}>
                        <option disabled value={0}>職種</option>
                        <option value={3}>エンジニア</option>
                        <option value={4}>デザイナー</option>
                        <option value={100}>全て</option>
                    </select>

                    <select value={studentCharacter} className="select select-primary pl-3 pr-12" onChange={(e) => setStudentCharacter(parseInt(e.target.value))}>
                        <option disabled value={0}>特徴</option>
                        <option value={5}>すごい</option>
                        <option value={6}>面白い</option>
                        <option value={100}>全て</option>
                    </select>
                </div>


                <div className='pb-[120px] mt-8'>
                    <ul className="w-[90%] mx-6">
                        {
                            currentData?.map((data:any, index:number) => {
                                return (
                                    <li key={data.id}>
                                        <Link href={`/mypage?id=${data.id}&uid=${data.uid}&goal=${data.goal}&team=${data.team}&name=${encodeURIComponent(data.name)}`}>
                                            <div className="flex border-b items-center justify-between">
                                                <div className="flex items-center">
                                                    {
                                                        index < 9 ? 
                                                        <Image src={rankImages[index]} alt={`${index+1}位`} width={32} className=" my-2"/> : // インデックスが3未満の場合、画像を表示します
                                                        <p className="ml-1 text-[24px]">{index+1}</p> // インデックスが3以上の場合、順位をテキストとして表示します
                                                    }
                                                    <div className="ml-6">
                                                        <div className="flex items-center mt-4">
                                                            <p className="text-sm font-medium">{data.name}</p>
                                                            <p className="text-[10px] font-medium ml-1">{data.ruby}</p>
                                                        </div>
                                                        
                                                        <div className="flex text-xs mb-4 font-normal">
                                                            <p>#{data.schoolyear}</p>
                                                            <p className="ml-2">#{data.job}</p>
                                                            <p className="ml-2">#{data.most_common_tag}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-base font-bold">{data.total_evaluation_score}<span className="text-[10px] font-normal">点</span></p>
                                            </div>

                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            
        </>
    );
}

export default StudentView;