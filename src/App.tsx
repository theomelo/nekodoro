import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceTrigger,
  useViewModelInstanceBoolean,
  useViewModelInstanceString,
  useViewModelInstanceNumber
} from '@rive-app/react-webgl2';
import { useEffect, useState } from 'react';

export default function App() {
  const [currentInterval, setCurrentInterval] = useState('Work'); // 'Work' | 'Rest'

  const { rive, RiveComponent } = useRive({
    src: 'nekodoro.riv',
    stateMachines: "State Machine 1",
    artboard: `${currentInterval} Screen`,
    autoplay: true, // Don't change this
    autoBind: true,
    animations: 'Timeline 1',
    layout: new Layout({
      fit: Fit.Layout,
      // alignment: Alignment.Center,
    }),
  });

  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { value: time, setValue: setTime } = useViewModelInstanceString('Time', rive?.viewModelInstance);
  const { value: counter, setValue: setCounter } = useViewModelInstanceString('Counter', rive?.viewModelInstance);
  const { value: isPaused, setValue: setIsPaused } = useViewModelInstanceBoolean('Main Button/Icon Switcher', rive?.viewModelInstance);
  const { value: _countdownTime, setValue: setCountdownTime } = useViewModelInstanceNumber('Progress Bar/Progress', rive?.viewModelInstance);
  const { value: isIdle, setValue: setIsIdle } = useViewModelInstanceBoolean('Idle', rive?.viewModelInstance);

  useViewModelInstanceTrigger('Main Button/Pressed', rive?.viewModelInstance,
    {
      onTrigger: () => {
        setIsRunning((prev: boolean) => {          
          setIsPaused(prev)
          setIsIdle(!prev)
          return !prev
        })
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
    // Initial States
    setTime('25:00')
    setCounter('0/10')
    setIsPaused(false)
    setIsIdle(false)
  }, []);

  useEffect(() => {
    // Timer
    let interval: NodeJS.Timeout;

    if (isRunning && seconds <= 100) {
      interval = setInterval(() => {
        setSeconds((prev: number) => prev + 1)
        setCountdownTime(seconds)
      }, 1000);
    } else {
      setIsRunning(false)
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, setIsRunning, seconds]);

  return (
    <RiveComponent style={{ height: '100vh' }} />
  );
}
