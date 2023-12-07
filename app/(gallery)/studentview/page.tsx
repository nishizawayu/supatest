import Link from "next/link"
import getStudendata from "../studentsdata/page";

interface StudentViewProps {
    id: number;
  }

// 描画用
const StudentView: React.FC<StudentViewProps> = async({id}) =>{
    const studentarr = await getStudendata(id);
    return(
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
    );
}

export default StudentView;