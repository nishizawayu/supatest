import Navigation from '@/components/nav';
import ThankyouView from './thankyouView';
import getThankyoudata from './getthankyoudata';


const Thankyou = async () => {
  const thankyouarr = await getThankyoudata() ?? [];

  return (
    <div>
      <ThankyouView thankyouarr={thankyouarr}/>
      <Navigation />
    </div>
  );
};

export default Thankyou;