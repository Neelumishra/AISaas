"use client";

import { useEffect, useState } from "react";
import ProModal from "./ui/pro-modal";



function ModalProvider() {
    const [mounted ,setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted){
        return null;
    }
  return (
    <>
        <ProModal/>
    </>
  )
}

export default ModalProvider