import Students from './(gallery)/student/page'
import TeamRank from './(Slider)/teamrank/page'
import FormFirst from './(form)/first/page'
import { Suspense } from 'react'
import Loading from "@/app/loading";

export default async function Index() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <FormFirst/>
      </Suspense>
    </div>
  )
}