import Nummber from "../nummber/page";
import getStudendata from "@/app/(gallery)/studentsdata/page";
import Loading from "@/app/loading";
import Navigation from "@/components/nav";
import { Suspense } from 'react'

const FormFirst = async () => {
    // const studentarr = await getStudendata() ?? [];

    return (
      <div>
        <Suspense fallback={<Loading />}>
          {/* <Nummber studentarr={studentarr}/> */}
          <Nummber/>
          <Navigation />
        </Suspense>
      </div>
    );
  };
  
  export default FormFirst;