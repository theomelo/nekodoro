import { 
  Alignment,
  Fit,
  Layout,
  useRive, 
  useViewModelInstanceTrigger,
  useViewModelInstanceBoolean,
  useViewModelInstanceString,
} from '@rive-app/react-webgl2';
import { useEffect, useState } from 'react';

export default function Screen({ currentInterval }) {
  const { rive, RiveComponent } = useRive({
    src: 'nekodoro.riv',
    stateMachines: "State Machine 1",
    artboard: `${currentInterval} Screen`,
    autoplay: true,
    autoBind: true,
    animations: 'Timeline 1',
    layout: new Layout({
      fit: Fit.Contain, 
      alignment: Alignment.Center,
    }),
  });

  const { value: time, setValue: setTime } = useViewModelInstanceString('Time', rive?.viewModelInstance);
  const { value: counter, setValue: setCounter } = useViewModelInstanceString('Counter', rive?.viewModelInstance);
  const { value: isPaused, setValue: setIsPaused } = useViewModelInstanceBoolean('Main Button/Icon Switcher', rive?.viewModelInstance);
  useViewModelInstanceTrigger('Main Button/Pressed', rive?.viewModelInstance,
  {
      onTrigger: () => {
        setIsPaused(!isPaused);
        console.log('click play!');
      }
    }
  );
  useViewModelInstanceTrigger('Skip Button/Pressed', rive?.viewModelInstance,
  {
      onTrigger: () => {
        setIsPaused(!isPaused);
        console.log('click skip!');
      }
    }
  );
    useViewModelInstanceTrigger('Reset Button/Pressed', rive?.viewModelInstance,
  {
      onTrigger: () => {
        setIsPaused(!isPaused);
        console.log('click reset!');
      }
    }
  );

  useEffect(() => {
    setTime('25:00'); 
    setCounter('0/10');
    setIsPaused(true); 
  }, [setTime, setCounter]);

  return (
    <RiveComponent style={{ height: '100vh'}}/>
  );
}
