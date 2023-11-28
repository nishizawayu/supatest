'use client'
import Navigation from "@/components/nav";
import Link from "next/link";
import { useState } from "react";

const nummber = ()=>{
    return(
        <div>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">評価する学生の学籍番号入力してください</h2>
                
                

                <div className="font-bold text-l flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                    >

                        <Link href="/score">
                            評価をする
                        </Link>
                    </button>
                </div>
                
            </section>
            <Navigation/>
        </div>
    )
}

export default nummber;