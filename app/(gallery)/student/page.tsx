import Navigation from '@/components/nav';
import StudentView from './studentView';
import getStudendata from "../studentsdata/page";
import getScoredata from '../scoredata/getscoredata';


const Students = async () => {
  const studentarr = await getStudendata() ?? [];
  const scorearr = await getScoredata() ?? [];

  return (
    <div>
      <StudentView studentarr={studentarr} scoredata={scorearr}/>
      <Navigation />
    </div>
  );
};

export default Students;