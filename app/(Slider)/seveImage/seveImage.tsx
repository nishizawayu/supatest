'use server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';


const seveimage = async(imageBufferBase64:any,tid:number) =>{
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);
    const file = imageBufferBase64;
    const filePath = `app/(images)/image_${tid}.jpg}`;
    const { data, error } = await supabase.storage
      .from('image-bucket')
      .upload(filePath, file)
    if (error) {
      // ここでエラーハンドリング
      console.error(error);
    }
}

export default seveimage