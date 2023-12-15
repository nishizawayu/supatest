"use client"
import Link from "next/link"
import { useMemo, useState } from "react"

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string, job:string, team:string}[]
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
            <p className="text-xl font-bold text-center mt-7">
                見たい学生をタップしてください
            </p>

            <ul className='flex w-full text-center flex-wrap mt-4'>
                <li className={`w-[33%] ${studentStatus === 0 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(0)}>全体</li>
                <li className={`w-[33%] ${studentStatus === 1 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(1)}>1年生</li>
                <li className={`w-[33%] ${studentStatus === 2 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(2)}>2年生</li>
                <li className={`w-[33%] ${studentStatus === 3 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(3)}>エンジニア</li>
                <li className={`w-[33%] ${studentStatus === 4 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(4)}>デザイナー</li>
                <li className={`w-[33%] ${studentStatus === 5 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(5)}>Bチーム</li>
            </ul>
            <div className='pb-[120px] mt-8'>
                <ul className="flex flex-wrap w-[96%] mx-auto">
                    {
                        currentData?.map((data: any, index: number) => {
                            return (
                                <li key={index} className="w-[33%] text-center border border-slate-400 bg-slate-100 py-2">
                                    <Link href={`/mypage?id=${data.id}&uid=${data.uid}&goal=${data.goal}&name=${encodeURIComponent(data.name)}`}>
                                        {data.name}
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