'use client'
import { useRouter } from 'next/navigation';
import insertdata from './insert';

const end = ()=>{
    const router = useRouter()

    // ローカルストレージから値を取得
    const uid = localStorage.getItem('filteredValue');
    const score_1 = localStorage.getItem('planpoint');
    const score_2 = localStorage.getItem('cpoint');
    const score_3 = localStorage.getItem('ppoint');
    const comment = localStorage.getItem('inputText');
    const tag = localStorage.getItem('selectedTags');

    return(
        <div>
            <section>
                <h2 className="text-xl font-bold text-center mt-6">以上です。<br/>ありがとうございます。</h2>

                <div className="font-bold text-2xl flex justify-center">
                    <button
                        className="bg-[#00ff00] px-8 my-16 rounded-md flex items-center"
                        onClick={()=>{
                            if(uid != null && score_1 != null && score_2 != null && score_3 != null && comment != null && tag != null){
                                insertdata(uid,score_1,score_2,score_3,comment,tag);
                            }
                            router.push("/nummber");
                        }}
                    >
                        終了<span className="text-base ml-1">&gt;</span>
                    </button>
                </div>
                
            </section>
        </div>
    )
}

export default end;