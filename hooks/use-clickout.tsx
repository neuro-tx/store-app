import React, { useEffect, useRef } from 'react'

const useClickout = (children : React.ReactNode) => {
  const elmentRef = useRef<HTMLDivElement>(null);

  if(!elmentRef.current) return;

  useEffect(()=> {

  } ,[])
  return (
    <div ref={elmentRef}>
      {children}
    </div>
  )
}

export default useClickout