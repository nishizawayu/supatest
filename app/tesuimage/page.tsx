"use client"
import React, { useState } from 'react';

const TestImages = () => {
  const [image, setImage] = useState(null);
  const [level, setLevel] = useState(1);

  const handleSubmit = async () => {
    const response = await fetch(`/api/chatgpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `猫のイラストを生成して`,
        level: level,
      }),
    });

    const data = await response.json();
    console.log(data);
    // setImage(data.images[0]);
  };

  return (
    <div>
      <button onClick={handleSubmit}>画像生成</button>
      {image && <img src={image} alt="Generated Monster" />}
    </div>
  );
};

export default TestImages;
