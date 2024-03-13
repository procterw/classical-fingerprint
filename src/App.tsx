import { useEffect, useState } from 'react'
import { Work, getMusicData } from './services/getMusicData';

import './App.css'
import { WorkCard } from './WorkCard';

function App() {
  const [works, setWorks] = useState<Array<Work>>([])
  const [selectedWork, setSelectedWork] = useState<Work>()

  useEffect(() => {
    getMusicData(
      (d: {
        works: Array<Work>
      }) => {
        setWorks(d.works);
        setSelectedWork(d.works[0]);
      },
    );
  }, [])

  const shuffleWork = () => {
    const n = Math.floor(Math.random() * works.length);
    setSelectedWork(works[n]);
  };

  return (
    <>
      <h1>Classical Fingerprint</h1>
      <div className="card">
        <button onClick={shuffleWork}>
          Next work
        </button>
      </div>

      <WorkCard work={selectedWork} />
    </>
  )
}

export default App
