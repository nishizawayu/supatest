import React, { useState, useEffect } from 'react';

// 起動時アニメーション
const Anime: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const splashScreen = document.getElementById('splashScreen');

    if (splashScreen) {
      if (loading) {
        // フェードイン
        splashScreen.style.opacity = '1';
      } else {
        // フェードアウト
        splashScreen.style.opacity = '0';
      }
    }
  }, [loading]);

  return (
    <div
      id="splashScreen"
      className="flex items-center justify-center h-screen bg-white transition-opacity duration-1000 ease-in-out opacity-0"
    >
      <h1 className="text-4xl font-bold text-black">
        <img src='rogo.png' alt="ロゴ" />
      </h1>
      {/* その他のスプラッシュスクリーンの要素 */}
    </div>
  );
};

export default Anime;
