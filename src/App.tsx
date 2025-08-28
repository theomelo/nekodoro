import Screen from "./components/Screen";
import { useState } from 'react';

export default function App() {
  const [currentInterval, setCurrentInterval] = useState('Rest'); // 'Work' | 'Rest'

  return (
    <>
      <Screen currentInterval={currentInterval} />
    </>
  );
}
