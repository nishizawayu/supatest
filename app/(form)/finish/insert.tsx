'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const insertdata = async(uid:string,score_1:string,score_2:string,score_3:string,score_4:string,comment:string,tag:string,) =>{
    console.log("inset-page");
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
    .from('evaluation')     
    .insert({
        score_1: score_1,
        score_2: score_2,
        score_3: score_3,
        score_4: score_4, 
        comment: comment,
        tag: tag,
        uid: uid,
    })
    if(error){
        console.log(error);
    }
    
}

export default insertdata