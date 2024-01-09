import Slider from '../Swiper/page';
import getTeamsdata from '../teamsdata/page';
import TeamRankView from './teamrankView';
const TeamRank = async () => {
    const teamsarr = await getTeamsdata() ?? [];
  return (
    <div className='flex'>
        <Slider/>
        <TeamRankView teamsarr={teamsarr}/>
    </div>
  )
}

export default TeamRank