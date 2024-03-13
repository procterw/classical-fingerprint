import './App.css'
import { WorkCard } from './WorkCard';

import { useWorkFeeder } from './services/workFeeder';

function App() {
  const [
    activeWork,
    getNextWork,
  ] = useWorkFeeder();

  return (
    <>
      <h1>Classical Fingerprint</h1>
      <div className="card">
        <button onClick={() => getNextWork()}>
          Next work
        </button>
      </div>

      <WorkCard work={activeWork} />
    </>
  )
}

export default App
