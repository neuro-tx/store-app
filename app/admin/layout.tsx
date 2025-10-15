import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        SideBAr
        {children}
    </div>
  )
}

export default layout