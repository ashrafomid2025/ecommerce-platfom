"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useTheme } from 'next-themes'

function ToggelTheame() {
    const [themes, setThemes] = useTheme();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            {}
        </DropdownMenuTrigger>
    </DropdownMenu>
  )
}

export default ToggelTheame