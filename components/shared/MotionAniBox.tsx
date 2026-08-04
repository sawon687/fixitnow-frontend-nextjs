'use client'
import React from "react";
import { motion,HTMLMotionProps } from "framer-motion";

interface IChildrenProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const MotionAniBox = ({ children ,...motionProps}: IChildrenProps) => {
  return <motion.div {...motionProps} >{children}</motion.div>;
};

export default MotionAniBox;
