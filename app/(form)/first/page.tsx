import Nummber from "../nummber/page";
import getStudendata from "@/app/(gallery)/studentsdata/page";
import Navigation from "@/components/nav";

const FormFirst = async () => {
    // const studentarr = await getStudendata() ?? [];

    return (
      <div>
        {/* <Nummber studentarr={studentarr}/> */}
        <Nummber/>
        <Navigation />
      </div>
    );
  };
  
  export default FormFirst;