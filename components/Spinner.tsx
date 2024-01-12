// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="h-[90vh] flex flex-col justify-center items-center">
            <div className="loading loading-spinner w-20 h-20"></div>
            <p className='mt-5'>loading...</p>
        </div>
    );
}

export default Spinner;
