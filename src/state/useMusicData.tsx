import { createContext, useContext, useEffect, useState } from "react";
import { getMusicData } from "../services/getMusicData";

type MusicDataContextType = {
  composers: Array<Composer>,
  works: Array<Work>,
  loading: boolean,
  completed: boolean,
};

const MusicDataContext = createContext<MusicDataContextType>({
    composers: [],
    works: [],
    loading: false,
    completed: false,
});

export const MusicDataProvider = (props: { children: React.ReactNode }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const [composers, setComposers] = useState<Array<Composer>>([]);
  const [works, setWorks] = useState<Array<Work>>([]);

  useEffect(() => {
    setLoading(true);

    getMusicData(
      (d: {
        works: Array<Work>,
        composers: Array<Composer>,
      }) => {
        setWorks(d.works.filter((w) => !!w.preview.title));
        setComposers(d.composers);

        setLoading(false);
        setCompleted(true);
      },
    );
  }, []);

  const state = {
    composers,
    works,
    loading,
    completed,
  };

  return (
    <MusicDataContext.Provider value={state}>
      { props.children }
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => {
  return useContext(MusicDataContext);
};
