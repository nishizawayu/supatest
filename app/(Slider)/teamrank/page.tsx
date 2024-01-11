import Slider from '../Swiper/page';
import getTeamsdata from '../teamsdata/page';
import TeamRankView from './teamrankView';
import { useMemo, useState } from 'react';
const TeamRank = async () => {
    const teamsarr = await getTeamsdata() ?? [];
  return (
    <div>
        <Slider  teamsarr={teamsarr}/>
        {/* <TeamRankView teamsarr={teamsarr}/> */}
    </div>
  )
}

export default TeamRank