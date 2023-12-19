import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getYelldata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const { data: students } = await supabase.from("yell").select("*")
    if(students != null){
        console.log(students);
        return students;
    }
}

export default getYelldata