"use client";

import { SidebarProvider } from '@/hooks/use-sidebar';
import React from 'react'

const SiderbarProvider = ({children}:{children: React.ReactNode}) => {
  return (
    <SidebarProvider>
        {children}
    </SidebarProvider>
  )
}

export default SiderbarProvider

