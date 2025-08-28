import { 
  useRive, 
  useViewModelInstanceBoolean,
} from '@rive-app/react-webgl2';
import { useEffect, useState } from 'react';

export default function CatSleep() {
  const { rive, RiveComponent } = useRive({
    src: 'nekodoro.riv',
    stateMachines: "State Machine 1",
    autoplay: true,
    autoBind: true,
  });

  const { value: isIdle, setValue: setIsIdle } = useViewModelInstanceBoolean('Idle', rive?.viewModelInstance);

  useEffect(() => {
    if (rive && setIsIdle) {
      setIsIdle(true); 
    }
  }, [rive, setIsIdle]);

  return (
    <>
      <RiveComponent style={{ width: '400px', height: '400px' }}/>
      {(rive === null) ? <div>Loading…</div> : (
        <button onClick={() => setIsIdle(!isIdle)}>
          Toggle Idle
        </button>
      )}
     </>
  );
}
