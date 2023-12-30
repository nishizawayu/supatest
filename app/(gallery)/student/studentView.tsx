"use client"
import Link from "next/link"
import TestImage from "@/app/(Slider)/TestImage/page"
import { useMemo, useState } from "react"

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string, job:string, team:string, school_year:string, most_common_tag:string}[]
    scoredata : {score_1:number, score_2:number, score_3:number, comment:string, tag:string, uid:string, date:string}[]
}

// 描画用
const StudentView: React.FC<StudentViewProps> = ({ studentarr }) => {
    const [studentYear, setStudentYear] = useState(0)
    const [studentJob, setStudentJob] = useState(0)
    const [studentCharacter, setStudentCharacter] = useState(0)
    const currentData = useMemo(() => {
        if(studentYear === 1) {
            return studentarr.filter((v) => v.id <=35)
        } 
        else if(studentYear === 2) {
            return studentarr.filter((v) => v.id >35)
        } 
        else if(studentJob === 3) {
            return studentarr.filter((v) => v.job == "エンジニア")
        }
        else if(studentJob === 4) {
            return studentarr.filter((v) => v.job == "デザイナー")
        }
        else if(studentCharacter === 5) {
            return studentarr.filter((v) => v.most_common_tag == "すごい")
        }
        else if(studentCharacter === 6) {
            return studentarr.filter((v) => v.most_common_tag == "面白い")
        }
        else {
            return studentarr
        }
    }, [studentJob,studentYear,studentCharacter])
    return (
        <>
            <h1 className="text-xl font-bold text-center mt-7">
                学生を見る
            </h1>

            <div className="join flex justify-center mt-8">
                <input className="input border-black join-item w-[282px]" placeholder="番号で探す"/>
                <button className="btn join-item w-[63px] bg-black text-white border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/></svg>
                </button>
            </div>

            <div className="flex justify-between mx-6 mt-8 sticky top-5 bottom-5">
                <select value={studentYear} className="select select-primary pl-3 pr-8"  onChange={(e) => setStudentYear(parseInt(e.target.value))}>
                    <option disabled value="">学生</option>
                    <option value={1}>1年</option>
                    <option value={2}>2年</option>
                    <option value={0}>全て</option>
                </select>

                <select value={studentJob} className="select select-primary pl-3" onChange={(e) => setStudentJob(parseInt(e.target.value))}>
                    <option disabled value="">職種</option>
                    <option value={3}>エンジニア</option>
                    <option value={4}>デザイナー</option>
                    <option value={0}>その他</option>
                    <option value={0}>全て</option>
                </select>

                <select value={studentCharacter} className="select select-primary pl-3 pr-12" onChange={(e) => setStudentCharacter(parseInt(e.target.value))}>
                    <option disabled value="">特徴</option>
                    <option value={5}>すごい</option>
                    <option value={6}>面白い</option>
                    <option value={0}>全て</option>
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
                                                <p className="text-[24px]">{index+1}</p>
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
        </>
    );
}

export default StudentView;