"use client"
import React, { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, SunMoon } from 'lucide-react';

function ToggelTheame() {
    const {theme, setTheme} = useTheme();
    const [aneble , setAneble]= useState(false);
    useEffect(()=>{
        if(!aneble){
            setAneble(true);
        }
    },[])
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            {theme === "light"?(
                <SunIcon />
            ):theme==="dark"?(
                <MoonIcon />
            ):(
                <SunMoon/>
            )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Appreance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={theme==="light"} onClick={()=>setTheme("light")} >
                Light
            </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={theme==="dark"} onClick={()=>setTheme("dark")} >
                Dark
            </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={theme==="system"} onClick={()=>setTheme("system")} >
                System
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggelTheame