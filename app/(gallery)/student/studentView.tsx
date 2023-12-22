"use client"
import Link from "next/link"
import { useMemo, useState } from "react"

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string, job:string, team:string, school_year:string}[]
}

// 描画用
const StudentView: React.FC<StudentViewProps> = ({ studentarr }) => {
    const [studentStatus, setStudentStatus] = useState(0)
    const currentData = useMemo(() => {
        if(studentStatus === 1) {
            return studentarr.filter((v) => v.id <=35)
        } 
        else if(studentStatus === 2) {
            return studentarr.filter((v) => v.id >35)
        } 
        else if(studentStatus === 3) {
            return studentarr.filter((v) => v.job == "エンジニア")
        }
        else if(studentStatus === 4) {
            return studentarr.filter((v) => v.job == "デザイナー")
        }
        else if(studentStatus === 5) {
            return studentarr.filter((v) => v.team == "Bチーム")
        }
        else {
            return studentarr
        }
    }, [studentStatus])
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

            {/* <ul className='flex w-full text-center flex-wrap mt-4'>
                <li className={`w-[33%] ${studentStatus === 0 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(0)}>リセット</li>
                <li className={`w-[33%] ${studentStatus === 1 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(1)}>1年生</li>
                <li className={`w-[33%] ${studentStatus === 2 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(2)}>2年生</li>
                <li className={`w-[33%] ${studentStatus === 3 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(3)}>エンジニア</li>
                <li className={`w-[33%] ${studentStatus === 4 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(4)}>デザイナー</li>
                <li className={`w-[33%] ${studentStatus === 5 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(5)}>Bチーム</li>
            </ul> */}
            <div className="flex justify-between mx-6 mt-8">
                <select className="select select-primary pl-3 pr-8"  onChange={(e) => setStudentStatus(parseInt(e.target.value))}>
                    <option disabled selected>学生</option>
                    <option value={1}>1年</option>
                    <option value={2}>2年</option>
                    <option value={0}>全て</option>
                </select>

                <select className="select select-primary pl-3" onChange={(e) => setStudentStatus(parseInt(e.target.value))}>
                    <option disabled selected>職種</option>
                    <option value={3}>エンジニア</option>
                    <option value={4}>デザイナー</option>
                    <option>その他</option>
                    <option value={0}>全て</option>
                </select>

                <select className="select select-primary pl-3 pr-12">
                    <option disabled selected>特徴</option>
                    <option>努力家</option>
                    <option>面白い</option>
                    <option>全て</option>
                </select>
            </div>

            <div className='pb-[120px] mt-8'>
                <ul className="w-[90%] mx-6">
                    {
                        currentData?.map((data: any, index: number) => {
                            return (

                                <li key={index} className="">
                                    <Link href={`/mypage?id=${data.id}&uid=${data.uid}&goal=${data.goal}&name=${encodeURIComponent(data.name)}`}>
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
                                                        <p className="ml-2">#面白い</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-base font-bold">10000<span className="text-[10px] font-normal">点</span></p>
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