import Navigation from '@/components/nav';
import TeamsView from './teamsView';
import getTeamsdata from '../teamsdata/page';
import getScoredata from '@/app/(gallery)/scoredata/getscoredata';
import getImagedata from '../imagedata/page';


const Teams = async () => {
  const teamsarr = await getTeamsdata() ?? [];
  const scorearr = await getScoredata() ?? [];
  const teamsimageurl = await getImagedata() ?? [];
  
  return (
    <div>
      <TeamsView teamsarr={teamsarr} scoredata={scorearr} teamsimageurl={teamsimageurl}/>
    </div>
  );
};

export default Teams;