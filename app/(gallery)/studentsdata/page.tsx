import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getStudendata = async(i:number) =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    if(i==0){
        const { data: students } = await supabase.from("students").select("*").order('id', { ascending: true });
        if(students != null){
            console.log(students);
            return students;
        }
    }
    else if(i==1){
        const { data: students } = await supabase.from("students").select("*").lte("id",35).order('id', { ascending: true });
        if(students != null){
            console.log(students);
            return students;
        }
    }
    else if(i==2){
        const { data: students } = await supabase.from("students").select("*").gt("id",35).order('id', { ascending: true });
        if(students != null){
            console.log(students);
            return students;
        }
    }
    
}

export default getStudendata