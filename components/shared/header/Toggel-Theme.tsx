"use client"
import { useEffect, useState } from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, SunMoon } from 'lucide-react';
import { Button } from '../../ui/button';

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
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className=' focus-visible:ring-0  focus-visible:ring-offset-0 '>
            {theme === "light"?(
                <SunIcon />
            ):theme==="dark"?(
                <MoonIcon />
            ):(
                <SunMoon/>
            )}
            </Button>
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