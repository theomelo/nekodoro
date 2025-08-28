import { 
  useRive, 
  useViewModel, 
  useViewModelInstance, 
  useViewModelInstanceBoolean, 
  useViewModelInstanceTrigger
} from '@rive-app/react-webgl2';
import { useEffect, useState } from 'react';

export default function MainButton({ currentInterval }) { // TODO: Refactor this. `currentInterval` should be an enum: 'work' | 'break'
  const [isWorking, setIsWorking] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: 'nekodoro.riv',
    stateMachines: "State Machine",
    artboard: "Main Button",
    autoplay: true,
    autoBind: true,
  });

  const viewModel = useViewModel(rive, { name: 'Main Button' });
  const viewModelInstance = useViewModelInstance(viewModel, { useDefault: true, rive });
  const { value: isPaused, setValue: setIsPaused } = useViewModelInstanceBoolean('Icon Switcher', viewModelInstance);
  
  const { trigger: handlePlay } = useViewModelInstanceTrigger('Pressed', viewModelInstance,
    {
      onTrigger: () => {
        setIsPaused(!isPaused);
      }
    }
  );

  // Update isWorking based on currentInterval
  // `isWorking` will update the color of the button
  useEffect(() => {
    const intervalStates = {
      work: true,
      break: false
    };
    
    setIsWorking(intervalStates[currentInterval]);
    setIsPaused(false); 
  }, [currentInterval]);

  return (
    <RiveComponent style={{ width: '400px', height: '400px' }} onClick={handlePlay}/>
  );
}
