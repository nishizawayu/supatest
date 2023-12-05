import Link from 'next/link';
import Navigation from '@/components/nav';
import getStudendata from '../studentsdata/page';

// const getStudendata = async() =>{
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore);

//   const { data: students } = await supabase.from("students").select("*");

//   if(students != null){
//     console.log(students);
//     return students;
//   }
// }

const Students = async() => {
  let id;  // ここは string 型で問題ありません
  const studentarr = await getStudendata();
  return (
    <div>
      <p>
        見たい学生をタップしてください
      </p>
      
      <ul>
        <li>1年生</li>
        <li>2年生</li>
      </ul>
      <div className='pb-[120px]'>
        <ul>
          {
            studentarr?.map((data:any,index:number)=>{
              return (
                <li key={index}>
                  <Link href={`/mypage?id=${data.id}&name=${encodeURIComponent(data.name)}`}>
                    {data.name}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      <Navigation />
    </div>
  );
};

export default Students;
