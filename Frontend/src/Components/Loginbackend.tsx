import React, { useEffect, useState, useRef } from 'react';

interface Props {
  loginsteps: string[];
  buysteps: string[];
}

const Loginbackend: React.FC<Props> = ({ loginsteps,buysteps }) => {
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);
  const [displayedSteps2, setDisplayedSteps2] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: number[] = [];

    const displaySteps = () => {
      loginsteps.forEach((step, index) => {
        const timeout = window.setTimeout(() => {
          setDisplayedSteps(prevSteps => [...prevSteps, step]);
        }, (index + 1) * 900);
        timeouts.push(timeout);
      });
    };

    displaySteps();

    return () => {
      timeouts.forEach(timeout => {
        window.clearTimeout(timeout);
      });
      setDisplayedSteps([]);
    };
  }, [loginsteps]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [displayedSteps]);

  useEffect(() => {
    let timeouts: number[] = [];

    const displaySteps2 = () => {
      buysteps.forEach((step, index) => {
        const timeout = window.setTimeout(() => {
          setDisplayedSteps2(prevSteps => [...prevSteps, step]);
        }, (index + 1) * 900);
        timeouts.push(timeout);
      });
    };

    displaySteps2();

    return () => {
      timeouts.forEach(timeout => {
        window.clearTimeout(timeout);
      });
      setDisplayedSteps2([]);
    };
  }, [buysteps]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [displayedSteps2]);

  return (
    <>
      <div>
        <div className="h-1/2 flex justify-center gap-5">
          <div className="pl-8 bg-black bg-opacity-40 w-3/4 text-base font-bold text-white rounded-lg p-5 font-mono">
            <div className='font-sans underline sticky top-0'>Login Backend Process</div>
            <br />
            <div ref={scrollContainerRef} className='overflow-y-scroll h-64 overflow-x-hidden'>
              {displayedSteps.map((step, index) => (
                <div key={index} className='flex text-xs sm:text-base'>
                  &gt; {step}
                </div>
              ))}
              {displayedSteps2.map((step, index) => (
                <div key={index} className='flex text-xs sm:text-base'>
                  &gt; {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginbackend;
