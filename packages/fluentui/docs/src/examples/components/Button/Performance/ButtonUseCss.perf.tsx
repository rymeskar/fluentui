import * as React from 'react';
import { Button, Provider, useCSS, teamsTheme } from '@fluentui/react-northstar';

const ButtonUseCssPerf = () => {
  const foo1 = useCSS({
    border: '1px solid black',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo2 = useCSS({
    border: '1px solid white',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo3 = useCSS({
    border: '1px solid red',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo4 = useCSS({
    border: '1px solid green',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo5 = useCSS({
    border: '1px solid blue',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo6 = useCSS({
    border: '1px solid yellow',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo7 = useCSS({
    border: '1px solid orange',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo8 = useCSS({
    border: '1px solid pink',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo9 = useCSS({
    border: '1px solid magenta',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo10 = useCSS({
    border: '1px solid salmon',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo11 = useCSS({
    border: '1px solid aliceblue',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo12 = useCSS({
    border: '1px solid #ccc',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo13 = useCSS({
    border: '1px solid #fff',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo14 = useCSS({
    border: '1px solid #000',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });
  const foo15 = useCSS({
    border: '1px solid #fffccc',
    display: 'flex',
    padding: '10px',
    margin: '10px',
    position: 'initial',
  });

  return (
    <Provider overwrite theme={teamsTheme}>
      <Button content="Click here" className={foo1} /> {/* 1 */}
      <Button content="Click here" className={foo2} /> {/* 2 */}
      <Button content="Click here" className={foo3} /> {/* 3 */}
      <Button content="Click here" className={foo4} /> {/* 4 */}
      <Button content="Click here" className={foo5} /> {/* 5 */}
      <Button content="Click here" className={foo6} /> {/* 6 */}
      <Button content="Click here" className={foo7} /> {/* 7 */}
      <Button content="Click here" className={foo8} /> {/* 8 */}
      <Button content="Click here" className={foo9} /> {/* 9 */}
      <Button content="Click here" className={foo10} /> {/* 10 */}
      <Button content="Click here" className={foo11} /> {/* 11 */}
      <Button content="Click here" className={foo12} /> {/* 12 */}
      <Button content="Click here" className={foo13} /> {/* 13 */}
      <Button content="Click here" className={foo14} /> {/* 14 */}
      <Button content="Click here" className={foo15} /> {/* 15 */}
      {/* ---- */}
      <Button content="Click here" className={foo1} /> {/* 1 */}
      <Button content="Click here" className={foo2} /> {/* 2 */}
      <Button content="Click here" className={foo3} /> {/* 3 */}
      <Button content="Click here" className={foo4} /> {/* 4 */}
      <Button content="Click here" className={foo5} /> {/* 5 */}
      <Button content="Click here" className={foo6} /> {/* 6 */}
      <Button content="Click here" className={foo7} /> {/* 7 */}
      <Button content="Click here" className={foo8} /> {/* 8 */}
      <Button content="Click here" className={foo9} /> {/* 9 */}
      <Button content="Click here" className={foo10} /> {/* 10 */}
      <Button content="Click here" className={foo11} /> {/* 11 */}
      <Button content="Click here" className={foo12} /> {/* 12 */}
      <Button content="Click here" className={foo13} /> {/* 13 */}
      <Button content="Click here" className={foo14} /> {/* 14 */}
      <Button content="Click here" className={foo15} /> {/* 15 */}
      {/* ---- */}
      <Button content="Click here" className={foo1} /> {/* 1 */}
      <Button content="Click here" className={foo2} /> {/* 2 */}
      <Button content="Click here" className={foo3} /> {/* 3 */}
      <Button content="Click here" className={foo4} /> {/* 4 */}
      <Button content="Click here" className={foo5} /> {/* 5 */}
      <Button content="Click here" className={foo6} /> {/* 6 */}
      <Button content="Click here" className={foo7} /> {/* 7 */}
      <Button content="Click here" className={foo8} /> {/* 8 */}
      <Button content="Click here" className={foo9} /> {/* 9 */}
      <Button content="Click here" className={foo10} /> {/* 10 */}
      <Button content="Click here" className={foo11} /> {/* 11 */}
      <Button content="Click here" className={foo12} /> {/* 12 */}
      <Button content="Click here" className={foo13} /> {/* 13 */}
      <Button content="Click here" className={foo14} /> {/* 14 */}
      <Button content="Click here" className={foo15} /> {/* 15 */}
    </Provider>
  );
};

export default ButtonUseCssPerf;
