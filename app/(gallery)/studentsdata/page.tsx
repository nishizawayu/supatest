import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

const getStudendata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
  
    const { data: students } = await supabase.from("students").select("*");
  
    if(students != null){
      console.log(students);
      return students;
    }
}

export default getStudendata