"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'

function Theme() {
    const { theme , setTheme } = useTheme();
    const [mounted ,setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    },[]);
    if(!mounted){
        return; 
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className=' focus-visible:ring-0 focus-visible:ring-offset-0'>
            <Button variant="ghost">
            {theme==="light"?(<SunIcon />):theme==="dark"?(<MoonIcon />):(<SunMoonIcon />)}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Appearence
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={theme==="light"} onClick={()=> setTheme("light")}>
                Light
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme==="dark"} onClick={()=> setTheme("dark")}>
                Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme==="system"} onClick={()=> setTheme("system")}>
                System
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
        <DropdownMenuSeparator />
    </DropdownMenu>
  )
}

export default Theme
