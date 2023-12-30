import Navigation from '@/components/nav';
import TeamsView from './teamsView';
import getTeamsdata from '../teamsdata/page';


const Teams = async () => {
  const teamsarr = await getTeamsdata() ?? [];
  
  return (
    <div>
      <TeamsView teamsarr={teamsarr}/>
    </div>
  );
};

export default Teams;