import Slider from '../Swiper/page';
import getTeamsdata from '../teamsdata/page';
import getScoredata from '@/app/(gallery)/scoredata/getscoredata';
import TeamRankView from './teamrankView';
import { useMemo, useState } from 'react';
import getImagedata from '../imagedata/page';
const TeamRank = async () => {
    const teamsarr = await getTeamsdata() ?? [];
    const scoredata = await getScoredata() ?? [];
    const teamsimagedata = await getImagedata() ?? [];
  return (
    <div>
        <Slider  teamsarr={teamsarr} scoredata={scoredata} teamsimagedata={teamsimagedata}/>
        {/* <TeamRankView teamsarr={teamsarr}/> */}
    </div>
  )
}

export default TeamRank