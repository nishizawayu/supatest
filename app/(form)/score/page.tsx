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
  const [score_1, setScore_1] = useState(50);
  const [score_2, setScore_2] = useState(50);
  const [score_3, setScore_3] = useState(50);
  const [score_4, setScore_4] = useState(50);

  const router = useRouter();

  const handleNextClick = () => {
    // ローカルストレージに値を保存
    localStorage.setItem('score_1', score_1.toString());
    localStorage.setItem('score_2', score_2.toString());
    localStorage.setItem('score_3', score_3.toString());
    localStorage.setItem('score_4', score_4.toString());

    // '/comment'ページに移動
    router.push("/comment");
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-center mt-6">作品の評価をお願いします</h1>

      <div className="mt-[32px]">
        <div className="w-full max-w-xs mx-auto mt-10">
          <div className="flex justify-between">
            <h2 className="font-bold text-base">企画</h2>
            <p className="font-bold text-base">{score_1}<span className="text-xs">点</span></p>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-lg max-w-xs range-primary mt-4"
            step="10"
            defaultValue={score_1}
            onChange={(event) => setScore_1(Number(event.target.value))}
          />
          <div className="w-full flex justify-between text-xs px-2 max-w-xs">
            <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p><p>100</p>
          </div>
        </div>

        <div className="w-full max-w-xs mx-auto mt-8">
          <div className="flex justify-between">
            <p className="font-bold text-base">デザイン</p>
            <p className="font-bold text-base">{score_2}<span className="text-xs">点</span></p>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-lg max-w-xs range-secondary mt-4"
            step="10"
            defaultValue={score_2}
            onChange={(event) => setScore_2(Number(event.target.value))}
          />
          <div className="w-full flex justify-between text-xs px-2 max-w-xs">
            <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p><p>100</p>
          </div>
        </div>

        <div className="w-full max-w-xs mx-auto mt-8">
          <div className="flex justify-between">
            <p className="font-bold text-base">実装</p>
            <p className="font-bold text-base">{score_3}<span className="text-xs">点</span></p>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-lg max-w-xs range-accent mt-4"
            step="10"
            defaultValue={score_3}
            onChange={(event) => setScore_3(Number(event.target.value))}
          />
          <div className="w-full flex justify-between text-xs px-2 max-w-xs">
              <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p>
              <p>100</p>
          </div>
        </div>

        <div className="w-full max-w-xs mx-auto mt-8">
          <div className="flex justify-between">
            <p className="font-bold text-base">プレゼン</p>
            <p className="font-bold text-base">{score_4}<span className="text-xs">点</span></p>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            className="range range-lg max-w-xs range-accent mt-4"
            step="10"
            defaultValue={score_4}
            onChange={(event) => setScore_4(Number(event.target.value))}
          />
          <div className="w-full flex justify-between text-xs px-2 max-w-xs">
              <p>0</p> <p>20</p> <p>40</p> <p>60</p><p>80</p>
              <p>100</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="font-bold text-l mt-8 ml-10">
            <button 
              className="btn bg-white text-[#808080]"
              onClick={()=>{
                router.push("/nummber")
              }}  
            >
              <span className="mr-[2px]">&lt;</span>戻る
            </button>
          </div>
          <div className="font-bold text-l mt-8 mr-10">
            <button onClick={handleNextClick} className="btn bg-black text-white">
              次へ<span className="ml-[2px]">&gt;</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Score;
