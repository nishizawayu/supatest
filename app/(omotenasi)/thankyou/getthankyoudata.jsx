import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getThankyoudata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const { data: students } = await supabase.from("thankyou").select("*")
    if(students != null){
        console.log(students);
        return students;
    }
}

export default getThankyoudata