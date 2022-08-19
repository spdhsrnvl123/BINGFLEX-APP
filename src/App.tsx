import styled from "styled-components";
import { motion, useMotionValue, useTransform,useViewportScroll } from "framer-motion";
import { useEffect } from "react";
// import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background:  */
`;


const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  // const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0)
  // console.log(x)
  const rotateZ = useTransform(x,[-800,800],[-360,360]);
  const gradient = useTransform(x,[-800,800],[
    "linear-gradient(135deg, rgb(0,210,238),rgb(0,83,238))",
    "linear-gradient(135deg, rgb(0,238,155),rgb(238,178,0))",
  ])


  const {scrollYProgress} = useViewportScroll();
  const scale = useTransform(scrollYProgress,[0,1],[1,5])
  //input 과 output은 반드시 같은 배열 크기를 가져야 한다.
  // useEffect(()=>{
  //   rotateZ.onChange(()=> console.log(rotateZ.get()))
  // },[rotateZ])

  return (
    <Wrapper style={{background:gradient}}>
      {/*
      <BiggerBox ref={biggerBoxRef}>
       <Box 
        drag
        dragSnapToOrigin
        // dragElastic={1}
        dragConstraints={biggerBoxRef}
        variants={boxVariants}
        whileHover="hover"  
        whileDrag="drag"
        wshileTap="click"
      />
      </BiggerBox>
      */}
      {/* <button onClick={()=>x.set(400)}>click me</button> */}
      <Box style={{x,rotateZ,scale}} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;