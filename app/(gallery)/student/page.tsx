import Navigation from '@/components/nav';
import StudentView from './studentView';
import getStudendata from "../studentsdata/page";
import getScoredata from '../scoredata/getscoredata';
import { Suspense } from 'react'
import Loading from "@/app/loading";


const Students = async () => {
  const studentarr = await getStudendata() ?? [];
  const scorearr = await getScoredata() ?? [];

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <StudentView studentarr={studentarr} scoredata={scorearr}/>
        <Navigation />
      </Suspense>
    </div>
  );
};

export default Students;