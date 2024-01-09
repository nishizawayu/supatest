import Navigation from '@/components/nav';
import TeamsView from './teamsView';
import getTeamsdata from '../teamsdata/page';
import getScoredata from '@/app/(gallery)/scoredata/getscoredata';


const Teams = async () => {
  const teamsarr = await getTeamsdata() ?? [];
  const scorearr = await getScoredata() ?? [];
  
  return (
    <div>
      <TeamsView teamsarr={teamsarr} scoredata={scorearr}/>
    </div>
  );
};

export default Teams;