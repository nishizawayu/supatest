import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getScoredata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const { data: students } = await supabase.from("evaluation").select("score_1,score_2,score_3,score_4,comment,tag,uid,date").order('id', { ascending: true });
    if(students != null){
        console.log(students);
        return students;
    }
}

export default getScoredata