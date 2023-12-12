'use client'

const Save: React.FC = () => {

    // ローカルストレージから値を取得
    const uid = localStorage.getItem('filteredValue');
    const score_1 = localStorage.getItem('planpoint');
    const score_2 = localStorage.getItem('cpoint');
    const score_3 = localStorage.getItem('ppoint');
    const comment = localStorage.getItem('inputText');
    const tag = localStorage.getItem('selectedTags');

    const arr =[uid,score_1,score_2,score_3,comment,tag];

    console.log(uid);
    console.log(score_1);
    console.log(score_2);
    console.log(score_3);
    console.log(comment);
    console.log(tag);
    console.log(arr);

    const handleSubmit = async () => {
      const response = await fetch('api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: localStorage.getItem('filteredValue'),
          score_1: localStorage.getItem('planpoint'),
          score_2: localStorage.getItem('cpoint'),
          score_3: localStorage.getItem('ppoint'),
          comment: localStorage.getItem('inputText'),
          tag: localStorage.getItem('selectedTags'),
        }),
      });
    
      const data = await response.json();
      console.log(data);
    };

    return(
     <div>
        <button
          className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
          onClick={handleSubmit}
        >
        next<span className="text-base ml-1">&gt;</span>
        </button>
      </div> 
      )
  };
  
  export default Save;

