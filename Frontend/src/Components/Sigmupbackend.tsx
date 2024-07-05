import React, { useEffect, useRef, useState } from 'react';

interface Props {
  steps: string[];
}

const Signupbackend: React.FC<Props> = ({ steps }) => {
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: number[] = [];

    const displaySteps = () => {
      steps.forEach((s, index) => {
        const timeout = window.setTimeout(() => {
          setDisplayedSteps(prevSteps => [...prevSteps, s]);
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
  }, [steps]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [displayedSteps]);

  return (
    <div>
      <div className="h-1/2 flex justify-center gap-5">
        <div className="pl-8 bg-black bg-opacity-40 w-3/4 text-base font-bold text-white rounded-lg p-5 font-mono">
          <div className='font-sans underline sticky top-0'>Signup Backend Process</div>
          <br />
          <div ref={scrollContainerRef} className='overflow-y-scroll h-48 overflow-x-hidden'>
            {displayedSteps.map((step, index) => (
              <div key={index} className='flex text-xs sm:text-base'>
                &gt; {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupbackend;
