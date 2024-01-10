'use client'
import Link from "next/link"
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

interface TeamsViewProps {
    teamsarr: {id:number,name:string,tid:string,teampoint:number,level:number}[]
}

const rankImages = [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9,];

const TeamRankView: React.FC<TeamsViewProps> = ({ teamsarr })=> {
  return (
    <div className='mt-8  w-[20%] mr-6'>
                <ul className="w-[90%] mx-6">
                    {
                        teamsarr?.map((data:any, index:number) => {
                            return (
                                <li key={data.id}>
                                    <Link href={`/`}>
                                        <div className="flex border-b items-center justify-between">
                                            <div className="flex items-center">
                                                {/* 順位 */}
                                                {
                                                    index < 9 ? 
                                                    <Image src={rankImages[index]} alt={`${index+1}位`} width={32} className=" my-2"/> : // インデックスが3未満の場合、画像を表示します
                                                    <p className="mx-1 text-[24px] my-2">{index+1}</p> // インデックスが3以上の場合、順位をテキストとして表示します
                                                }
                                                {/* チーム名 */}
                                                <p className="text-sm font-medium ml-6">{data.name}</p>
                                            </div>
                                            {/* 点数 */}
                                            <p className="text-base font-bold">{data.teampoint}<span className="text-[10px] font-normal">回</span></p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
  )
}

export default TeamRankView