'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const insertimagedata = async(imageUrl:string,tid:number,tag:[]) =>{
    console.log("inset-imageUrl");
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
    .from('teamsimageurl')     
    .insert({
        tid:tid,
        imageUrl:imageUrl,
        tag:tag
    })
    if(error){
        console.log(error);
    }
}

export default insertimagedata