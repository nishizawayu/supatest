import Students from './(gallery)/student/page'
import Slider from './(Slider)/Swiper/page'
import Teams from './(Slider)/teams/page'
// chatgtpのapiが動く
import TestImages from './tesuimage/page'

export default async function Index() {
  return (
    <div>
        <Students/>
    </div>
  )
}