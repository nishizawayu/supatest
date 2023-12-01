'use client'
import { useState, FC } from "react";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
}

const AccordionItem: FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <div
        className="accordion-title flex justify-between items-center bg-gray-200 p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="accordion-content p-4 border-x-2 border-b-2 border-gray-200 underline decoration-gray-500">
          {content}
        </div>
      )}
    </div>
  );
};

const Score: FC = () => {
  const [planpoint, setPlanPoint] = useState(50);
  const [cpoint, setCPoint] = useState(50);
  const [ppoint, setPPoint] = useState(50);

  const router = useRouter();

  return (
    <div>
      <button 
        className="mt-6 ml-8"
        onClick={()=>{
          router.push("/nummber")
        }}  
      >
          &lt;戻る
      </button>

      <h2 className="text-xl font-bold text-center mt-6">作品の評価をお願いします。</h2>

      <div className="w-full max-w-xs mx-auto mt-10">
        <div className="flex justify-between">
          <p className="font-bold">企画</p>
          <p className="font-bold">{planpoint}点</p>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="range max-w-xs range-primary mt-4"
          step="10"
          defaultValue={planpoint}
          onChange={(event) => setPlanPoint(Number(event.target.value))}
        />
        <div className="w-full flex justify-between text-xs px-2 max-w-xs">
          <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p>
          <p>100</p>
        </div>
      </div>

      <div className="w-full max-w-xs mx-auto mt-10">
        <div className="flex justify-between">
          <p className="font-bold">完成度</p>
          <p className="font-bold">{cpoint}点</p>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="range max-w-xs range-primary mt-4"
          step="10"
          defaultValue={cpoint}
          onChange={(event) => setCPoint(Number(event.target.value))}
        />
        <div className="w-full flex justify-between text-xs px-2 max-w-xs">
        <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p>
        <p>100</p>
        </div>
      </div>

      <div className="w-full max-w-xs mx-auto mt-10">
        <div className="flex justify-between">
          <p className="font-bold">プレゼン</p>
          <p className="font-bold">{ppoint}点</p>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          className="range max-w-xs range-primary mt-4"
          step="10"
          defaultValue={ppoint}
          onChange={(event) => setPPoint(Number(event.target.value))}
        />
        <div className="w-full flex justify-between text-xs px-2 max-w-xs">
            <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p>
            <p>100</p>
        </div>
      </div>

      <div className="font-bold text-2xl flex justify-center">
        <button
          className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
          onClick={() => {
            console.log(planpoint);
            console.log(cpoint);
            console.log(ppoint);
            router.push("/comment")
          }}
        >
            next<span className="text-base ml-1">&gt;</span>
        </button>
      </div>

    </div>
  );
};

export default Score;