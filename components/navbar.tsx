import { Menu } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { UserButton } from "@clerk/nextjs";
import Mobilesidebar from '@/components/mobile-sidebar';
import {getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

async function Navbar() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription()
  return (
    <div className="flex items-center p-4">
      <Mobilesidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      <div className="w-full flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Navbar