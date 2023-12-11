import Navigation from '@/components/nav';
import StudentView from './studentView';
import getStudendata from "../studentsdata/page";


const Students = async () => {
  const studentarr = await getStudendata() ?? [];

  return (
    <div>
      <StudentView studentarr={studentarr}/>
      <Navigation />
    </div>
  );
};

export default Students;