"use client"
import Link from "next/link"
import { useMemo, useState } from "react"

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string}[]
}

// 描画用
const StudentView: React.FC<StudentViewProps> = ({ studentarr }) => {
    const [studentStatus, setStudentStatus] = useState(0)
    const currentData = useMemo(() => {
        if(studentStatus === 1) {
            return studentarr.filter((v) => v.id <=35)
        } else if(studentStatus === 2) {
            return studentarr.filter((v) => v.id >35)
        } else {
            return studentarr
        }
    }, [studentStatus])
    return (
        <>
            <p>
                見たい学生をタップしてください
            </p>

            <ul className='flex w-full text-center'>
                <li className={`w-[33%] ${studentStatus === 0 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(0)}>全体</li>
                <li className={`w-[33%] ${studentStatus === 1 ? "bg-sky-200" : ""}`} onClick={() => setStudentStatus(1)}>1年生</li>
                <li className={`w-[33%] ${studentStatus === 2 ? "bg-sky-200" : ""}`}  onClick={() => setStudentStatus(2)}>2年生</li>
            </ul>
            <div className='pb-[120px]'>
                <ul>
                    {
                        currentData?.map((data: any, index: number) => {
                            return (
                                <li key={index}>
                                    <Link href={`/mypage?id=${data.id}&name=${encodeURIComponent(data.name)}`}>
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