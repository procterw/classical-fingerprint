import { useEffect, useState } from "react";
import { Composer, Work, getMusicData } from "./getMusicData";

export const useGetMusicData = () => {
    const [loading, setLoading] = useState<Boolean>(false);

    const [composers, setComposers] = useState<Array<Composer>>();
    const [works, setWorks] = useState<Array<Work>>([]);

    useEffect(() => {
        setLoading(true);

        getMusicData(
            (d: {
                works: Array<Work>,
                composers: Array<Composer>,
            }) => {
                setWorks(d.works);
                setComposers(d.composers);

                setLoading(false);
            },
        );
    }, []);

    return {
        composers,
        works,
        loading,
    };
};
