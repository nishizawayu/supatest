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
import { Suspense } from 'react'
import Loading from "@/app/loading";

interface StudentViewProps {
    studentarr: {id:number, uid:string, name:string, job:string, team:string, school_year:string, most_common_tag:string,tid:number}[]
    scoredata : {score_1:number, score_2:number, score_3:number, comment:string, tag:string, uid:string, date:string}[]
}

// 描画用
const StudentView: React.FC<StudentViewProps> = ({ studentarr }) => {
    // const [loading, setLoading] = useState(true);
    const rankImages = [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9,];
    const [studentYear, setStudentYear] = useState(0)
    const [studentJob, setStudentJob] = useState(0)
    const [studentCharacter, setStudentCharacter] = useState(0)
    const [team, setTeam] = useState(0)
    const [studentserch,setStudentserch] = useState("");

    const currentData = useMemo(() => {
        let result = studentarr;
    
        if(studentYear === 1) {
            result = result.filter((v) => v.id <=35);
        } else if(studentYear === 2) {
            result = result.filter((v) => v.id >35);
        }
    
        if(studentJob === 3) {
            result = result.filter((v) => v.job == "エンジニア" || v.job == "エンジニア #デザイナー");
        } else if(studentJob === 4) {
            result = result.filter((v) => v.job == "デザイナー" || v.job == "エンジニア #デザイナー");
        }
    
        if(studentCharacter === 5) {
            result = result.filter((v) => v.most_common_tag == "可能性の塊");
        } else if(studentCharacter === 6) {
            result = result.filter((v) => v.most_common_tag == "自信家");
        }else if(studentCharacter === 7) {
            result = result.filter((v) => v.most_common_tag == "天才");
        }else if(studentCharacter === 8) {
            result = result.filter((v) => v.most_common_tag == "真面目");
        }else if(studentCharacter === 9) {
            result = result.filter((v) => v.most_common_tag == "明るい");
        }else if(studentCharacter === 10) {
            result = result.filter((v) => v.most_common_tag == "努力家");
        }else if(studentCharacter === 11) {
            result = result.filter((v) => v.most_common_tag == "個性的");
        }else if(studentCharacter === 12) {
            result = result.filter((v) => v.most_common_tag == "謙虚");
        }

        if(team === 13){
            result = result.filter((v) => v.team == "制作展チーム");
        }else if(team === 14){
            result = result.filter((v) => v.team == "株式会社 良");
        }else if(team === 15){
            result = result.filter((v) => v.team == "creative cloud japan");
        }else if(team === 16){
            result = result.filter((v) => v.team == "U:FUTURE株式会社");
        }else if(team === 17){
            result = result.filter((v) => v.team == "合同会社アソビゴコロ");
        }else if(team === 18){
            result = result.filter((v) => v.team == "ファインディング");
        }else if(team === 19){
            result = result.filter((v) => v.team == "ourly");
        }else if(team === 20){
            result = result.filter((v) => v.team == "スポカレ");
        }else if(team === 21){
            result = result.filter((v) => v.team == "ヘッドスパ-TIRA-");
        }else if(team === 22){
            result = result.filter((v) => v.team == "GOKUCHA");
        }else if(team === 23){
            result = result.filter((v) => v.team == "ソロトリ");
        }
    
        if(studentserch >= "00"){
            result = result.filter((v)=> v.uid == studentserch);
        }
    
        return result;
    }, [studentJob,studentYear,studentCharacter,studentserch,team]);
    

    const handleInputChange = (event:any) => {
        const value = event.target.value
        if (value.length > 2) {
            event.target.value = value.slice(0, 2); // 4桁を超える入力を切り捨て
        }
        setStudentserch(event.target.value);
    };

    return (
        <>
            <div>
                <h1 className="text-xl font-bold text-center mt-7">
                    学生を見る
                </h1>
                <div  className="py-8 px-4 sticky top-0 bg-[#fafafa]">
                    <div className="flex justify-between">
                        <input className="input border-black w-[160px]" type="number" placeholder="ブース番号で探す" value={studentserch} onChange={handleInputChange}/>
                        <select value={team} className="select select-primary pl-3 pr-8"  onChange={(e) => setTeam(parseInt(e.target.value))}>
                            <option disabled value={0}>チーム</option>
                            <option value={13}>制作展チーム</option>
                            <option value={14}>株式会社 良</option>
                            <option value={15}>creative cloud japan</option>
                            <option value={16}>U:FUTURE株式会社</option>
                            <option value={17}>合同会社アソビゴコロ</option>
                            <option value={18}>ファインディング</option>
                            <option value={19}>ourly</option>
                            <option value={20}>スポカレ</option>
                            <option value={21}>ヘッドスパ-TIRA-</option>
                            <option value={22}>GOKUCHA</option>
                            <option value={23}>ソロトリ</option>
                            <option value={100}>全て</option>
                        </select>
                    </div>
                    
                    <div className="flex justify-between mt-4">
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
                        {/* タグのソート */}
                        <select value={studentCharacter} className="select select-primary pl-3 pr-12" onChange={(e) => setStudentCharacter(parseInt(e.target.value))}>
                            <option disabled value={0}>特徴</option>
                            <option value={5}>可能性の塊</option>
                            <option value={6}>自信家</option>
                            <option value={7}>天才</option>
                            <option value={8}>真面目</option>
                            <option value={9}>明るい</option>
                            <option value={10}>努力家</option>
                            <option value={11}>個性的</option>
                            <option value={12}>謙虚</option>
                            <option value={100}>全て</option>
                        </select>
                    </div>
                </div>
                


                <div className='pb-[120px] '>
                    <ul className="w-[90%] mx-6">
                        {
                            currentData?.map((data:any, index:number) => {
                                return (
                                    <li key={data.id}>
                                        <Suspense fallback={<Loading />}>
                                        <Link href={`/mypage?uid=${data.uid}&goal=${data.goal}&team=${data.team}&name=${encodeURIComponent(data.name)}`}>
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
                                        </Suspense>
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