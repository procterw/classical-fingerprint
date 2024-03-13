import { useEffect, useState } from "react";
import { Work } from "./getMusicData";
import { useWorkRatings } from "./useWorkRatings";
import { useGetMusicData } from "./useGetMusicData";

export const useWorkFeeder = (): [Work | null, VoidFunction] => {
    const [activeWork, setActiveWork] = useState<Work | null>(null);
    const { works } = useGetMusicData();
    const { workRatings } = useWorkRatings();

    useEffect(() => {
        if (works) {
            getNextWork();
        }
    }, [works]);

    const getNextWork = () => {
        // What hasn't the user rated yet?
        const filteredWorks = works.filter((w: Work) => {
            return !Object.keys(workRatings).includes(w.id);
        });

        // Get a random index from the remaining works
        const i = Math.floor(Math.random() * filteredWorks.length);

        setActiveWork(filteredWorks[i]);
    };

    return [
        activeWork,
        getNextWork,
    ];
};