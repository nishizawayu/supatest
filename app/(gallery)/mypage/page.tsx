import Navigation from '@/components/nav';
import getStudendata from "../studentsdata/page";
import getScoredata from '../scoredata/getscoredata';
import MypageView from './mypageView';


const Mypage = async () => {
  const studentarr = await getStudendata() ?? [];
  const scorearr = await getScoredata() ?? [];


  return (
    <div>
      <MypageView studentarr={studentarr} scoredata={scorearr}/>
      <Navigation />
    </div>
  );
};

export default Mypage;