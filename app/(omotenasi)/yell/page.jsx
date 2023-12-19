import Navigation from '@/components/nav';
import YellView from './yellView';
import getYelldata from './getyelldata';


const Yell = async () => {
  const yellarr = await getYelldata() ?? [];

  return (
    <div>
      <YellView yellarr={yellarr}/>
      <Navigation />
    </div>
  );
};

export default Yell;