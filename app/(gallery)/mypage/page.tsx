import Navigation from '@/components/nav';
import getStudendata from "../studentsdata/page";
import getScoredata from '../scoredata/getscoredata';
import MypageView from './mypageView';


const Mypage = async () => {
  const studentarr = await getStudendata() ?? [];
  const scorearr = await getScoredata() ?? [];


  return (
    <div>
      <MypageView scoredata={scorearr} studentdata={studentarr}/>
      <Navigation />
    </div>
  );
};

export default Mypage;