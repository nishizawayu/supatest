// import { createClient } from '@/utils/supabase/server';
// import { cookies } from 'next/headers';
// import Navigation from '@/components/nav';

//   export default async function Notes() {
//     const cookieStore = cookies()
//     const supabase = createClient(cookieStore);
//     const { data: notes } = await supabase.from("notes").select();

//     return (
//       <div>
//         <pre>{JSON.stringify(notes, null, 2)}</pre>
//         <Navigation/>
//       </div>
//     )
//   }