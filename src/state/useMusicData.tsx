import { createContext, useContext } from "react";
import musicData from '../data/musicData.json';

type MusicDataContextType = {
  composers: Array<Composer>,
  works: Array<Work>,
};

const MusicDataContext = createContext<MusicDataContextType>({
    composers: [],
    works: [],
});

export const MusicDataProvider = (props: { children: React.ReactNode }) => {

  const { composers, works } = musicData;
  
  console.log('oh boy')

  const state = {
    composers,
    works,
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
