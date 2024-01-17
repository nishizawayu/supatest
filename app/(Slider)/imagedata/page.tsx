import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// サーバー接続用
const getImagedata = async() =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);

    const { data: students } = await supabase.from("teamsimageurl").select("*").order('id', { ascending: true });
    
    if (students != null) {
        const formattedStudents = students?.map(student => {
            return {
                ...student,
                created_at: formatDate(student.created_at)
            };
        });

        console.log(formattedStudents);
        return formattedStudents;
    }
}

function formatDate(dateString:any) {
    return new Date(dateString).toLocaleString('ja-JP', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default getImagedata