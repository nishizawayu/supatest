import Navigation from '@/components/nav';
import getStudendata from "../studentsdata/page";
import getScoredata from '../scoredata/getscoredata';
import MypageView from './mypageView';
import { Suspense } from 'react'
import Loading from "@/app/loading";

const Mypage = async () => {
  const studentarr = await getStudendata() ?? [];
  const scorearr = await getScoredata() ?? [];


  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MypageView scoredata={scorearr} studentdata={studentarr}/>
        <Navigation />
      </Suspense>
    </div>
  );
};

export default Mypage;