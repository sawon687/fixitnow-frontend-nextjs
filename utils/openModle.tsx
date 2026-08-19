'use client'
import { useState } from 'react'

const [isopen,setOPen]=useState(false)
export const dialogOpen=()=>{
      setOPen(true)
}

export { isopen }