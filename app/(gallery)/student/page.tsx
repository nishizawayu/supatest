import Navigation from '@/components/nav';
import StudentView from '../studentview/page';

const Students = async() => {
  let id:number = 2;  // ここは string 型で問題ありません
  return (
    <div>
      <p>
        見たい学生をタップしてください
      </p>
      
      <ul className='flex w-full text-center'>
        <li className='w-[50%]'>1年生</li>
        <li className='w-[50%]'>2年生</li>
      </ul>
      
      <StudentView id={id}/>
      <Navigation />
    </div>
  );
};

export default Students;
