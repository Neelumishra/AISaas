import { Menu } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { UserButton } from "@clerk/nextjs";
import Mobilesidebar from '@/components/mobile-sidebar';
import {getApiLimitCount } from '@/lib/api-limit';

async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p-4">
      <Mobilesidebar apiLimitCount={apiLimitCount} />
      <div className="w-full flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar