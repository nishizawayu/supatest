import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getImagedata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const { data: students } = await supabase.from("teamsimageurl").select("*").order('id', { ascending: true });
    if(students != null){
        console.log(students);
        return students;
    }
}

export default getImagedata