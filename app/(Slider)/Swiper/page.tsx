'use client'

import React, {useState, useMemo,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
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
    teamsarr: {id:number,name:string,tid:number,teampoint:number,level:number,total_evaluation_count:number,member:[]}[]
    teamsimagedata:{id:number,tid:number,imageUrl:string}[]
}

const Slider: React.FC<TeamsViewProps> = ({ teamsarr,teamsimagedata })=> {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [flip, setFlip] = useState<Array<boolean | null>>(Array(10).fill(null));
    const rankImages = [rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9,];
    const [teamId, setTeamId] = useState(1)
    const currentData = useMemo(() => {
        if(teamsarr != undefined){
            let result = teamsarr;
            if(teamId === 1) {
                result = result.filter((v) => v.tid == 1);
            } 
            if(teamId === 2) {
                result = result.filter((v) => v.tid == 2);
            }
            if(teamId === 3) {
                result = result.filter((v) => v.tid == 3);
            }
            if(teamId === 4) {
                result = result.filter((v) => v.tid == 4);
            }
            if(teamId === 5) {
                result = result.filter((v) => v.tid == 5);
            }
            if(teamId === 6) {
                result = result.filter((v) => v.tid == 6);
            }
            if(teamId === 7) {
                result = result.filter((v) => v.tid == 7);
            }
            if(teamId === 8) {
                result = result.filter((v) => v.tid == 8);
            }
            if(teamId === 9) {
                result = result.filter((v) => v.tid == 9);
            }
            if(teamId === 10) {
                result = result.filter((v) => v.tid == 10);
            }
            if(teamId === 11) {
                result = result.filter((v) => v.tid == 11);
            }
            return result;
        }
    },[teamId])

    const currentimageData = useMemo(() => {
        if(teamsimagedata != undefined){
            let imagepath = teamsimagedata
            if(teamId === 1) {
                imagepath = imagepath.filter((v) => v.tid == 1);
            } 
            if(teamId === 2) {
                imagepath = imagepath.filter((v) => v.tid == 2);
            }
            if(teamId === 3) {
                imagepath = imagepath.filter((v) => v.tid == 3);
            }
            if(teamId === 4) {
                imagepath = imagepath.filter((v) => v.tid == 4);
            }
            if(teamId === 5) {
                imagepath = imagepath.filter((v) => v.tid == 5);
            }
            if(teamId === 6) {
                imagepath = imagepath.filter((v) => v.tid == 6);
            }
            if(teamId === 7) {
                imagepath = imagepath.filter((v) => v.tid == 7);
            }
            if(teamId === 8) {
                imagepath = imagepath.filter((v) => v.tid == 8);
            }
            if(teamId === 9) {
                imagepath = imagepath.filter((v) => v.tid == 9);
            }
            if(teamId === 10) {
                imagepath = imagepath.filter((v) => v.tid == 10);
            }
            if(teamId === 11) {
                imagepath = imagepath.filter((v) => v.tid == 11);
            }
            return imagepath;
        }
    },[teamId])

        console.log(currentimageData)

    const handleClick = (index:number) => {
        const newFlip = [...flip];
        newFlip[index] = newFlip[index] === null ? true : !newFlip[index];
        setFlip(newFlip);
    };
    return (
        <div className='flex'>
            {
                currentData?.map((data:any, index:number) => {
                    return(
                        <div key={data.id} className='relative w-[80%] h-[100%]'>
                        <h1 className='text-[48px] text-center font-bold '>{data.name}</h1>
                        <p className='text-center'>メンバー:{data.member+""}</p>
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={10}
                            // navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
                            className="mySwiper2 h-[80%]"
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            grabCursor={true}
                            centeredSlides={true}
                            effect={'coverflow'}
                        >   
                        {
                            currentimageData?.map((data,index)=>{
                                return(
                                    <SwiperSlide className='my-8' key={`imageslide${index+1}枚目`}>
                                        <div className="card">
                                            <input type="checkbox" id={`card${index}`} className="more" aria-hidden="true" />
                                            <div className="content">
                                            <div className="front" style={{ backgroundImage: `url("image/${data.imageUrl}")` }}>
                                                <div className="inner">
                                                <label htmlFor={`card${index}`} className="button" aria-hidden="true">
                                                    進化の理由
                                                </label>
                                                </div>
                                            </div>
                                            <div className="back">
                                                <div className="inner">
                                                {
                                                    currentData?.map((data,index)=>{
                                                        return(
                                                            <p key={`imagealt${index+1}枚目`} className='mt-[40%]'>{data.name}が{data.member.length}回プレゼンをし、<br/>すごい,面白い,明るい,プロ級という評価をもらい、<br/>この姿に進化しました。</p>
                                                    )
                                                    })
                                                }
                                                <label htmlFor={`card${index}`} className="button return" aria-hidden="true">
                                                    <p className=' text-black'>←</p>
                                                </label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        </Swiper>
                        <div className='flex justify-around h-[20%]'>
                            <div className=''>
                                <p>次の進化まで</p>
                                
                                {
                                    data.total_evaluation_count < data.member.length ?
                                    <p className=''><span className='text-[40px]'>{data.member.length-data.total_evaluation_count}</span>回</p> :
                                    data.total_evaluation_count < data.member.length*3 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*3-data.total_evaluation_count}</span>回</p> :
                                    data.total_evaluation_count < data.member.length*5 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*5-data.total_evaluation_count}</span>回</p> :
                                    data.total_evaluation_count < data.member.length*7 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*7-data.total_evaluation_count}</span>回</p> :
                                    data.total_evaluation_count < data.member.length*10 ?
                                    <p className=''><span className='text-[40px]'>{data.member.length*10-data.total_evaluation_count}</span>回</p> :
                                    <p className=''><span className='text-[40px]'>{1-data.total_evaluation_count}</span>回</p>
                                }

                            </div>
                            <div className='border-r'></div>
                            <div>
                                <p>特徴</p>
                                <p className='text-[32px]'>面白い</p>
                            </div>
                            <div className='border-r'></div>
                            <div>
                                <p>強み</p>
                                <p className='text-[32px]'>企画力</p>
                            </div>
                            <div className='border-r'></div>
                            <div>
                                <p>合計プレゼン数</p>
                                <p className=''><span className='text-[40px]'>{data.total_evaluation_count}</span>回</p>
                            </div>
                        </div>
                    </div>
                    )
                })
            }
            

        <div className='mt-8  w-[20%] mr-6'>
                <ul className="w-[90%] mx-6">
                    {
                        teamsarr?.map((data:any, index:number) => {
                            return (
                                <li key={data.id}  onClick={()=>{setTeamId(data.tid)}}>
                                    <div>
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
                                            <p className="text-base font-bold">{data.total_evaluation_count}<span className="text-[10px] font-normal">回</span></p>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
      </div>
    )
}

export default Slider