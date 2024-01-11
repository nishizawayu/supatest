import Slider from '../Swiper/page';
import getTeamsdata from '../teamsdata/page';
import TeamRankView from './teamrankView';
import { useMemo, useState } from 'react';
import getImagedata from '../imagedata/page';
const TeamRank = async () => {
    const teamsarr = await getTeamsdata() ?? [];
    const teamsimagedata = await getImagedata() ?? [];
  return (
    <div>
        <Slider  teamsarr={teamsarr} teamsimagedata={teamsimagedata}/>
        {/* <TeamRankView teamsarr={teamsarr}/> */}
    </div>
  )
}

export default TeamRank