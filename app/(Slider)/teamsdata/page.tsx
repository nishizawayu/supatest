import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getTeamsdata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const { data: students } = await supabase.from("teams").select("*").order('teampoint', { ascending: false });
    if(students != null){
        console.log(students);
        return students;
    }
}

export default getTeamsdata