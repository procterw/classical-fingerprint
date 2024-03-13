import { useState } from 'react';


export const useWorkRatings = () => {

    // Work id -> number rating from 0 - 4
    const [workRatings, setWorkRatings] = useState<{ [key: string]: number }>({});

    const updateWorkRatings = (workId: string, rating: number) => {
        setWorkRatings({
            ...workRatings,
            [workId]: rating,
        });
    };

    return {
        workRatings,
        updateWorkRatings,
    };
}

// const userPreferences = () => {
//     const preferencesMap = {

//     };

//     // Initialize with local storage

    
// };


