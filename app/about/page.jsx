"use client"
import Image from 'next/image'
//import profilePic from '../public/images/11111-min.png'
import profilePic from '../../public/images/11111-min.png'
export default function page() {
  return (
    <>
       {/* ABOUT SECTION */}
       <div className="AboutMeContainer bg-[#000000f0] w-full h-screen flex justify-center items-center text-white">
        <div className="flex w-full flex-wrap justify-around md:justify-center xl:gap-40 items-center  md:p-10">
          {/* part1 */}
          <div className="leftSection  ">
            <div className="imageContaienr shadow-md border border-red-400  shadow-red-500 rounded-full my-10">
              <Image  src={profilePic} alt="myImage" className="w-60 md:w-80" />
            </div>
          </div>
          {/* part1 */}
          {/* part2 */}
          <div className="rightSec mx-12 text-justify max-w-xl">
            <div className="headingContainer">
              <h2 className=" text-2xl font-bold md:text-5xl tracking-widest">
                About Me{" "}
              </h2>
            </div>
            <div className="headingContainer my-2">
              <h2 className=" text-xl md:text-2xl tracking-wider">
                Developer & <span className="text-red-600">Designer</span>
              </h2>
            </div>
            <div className="paraContainer">
              <p className="text-sm md:text-md mb-12 tracking-wider">
                Software engineer with a passion of web designing and developing
                professional modern UI designing skills. Creative Modern
                Designer and Web Developer. Excellent Problem-Solving and
                ability to perform well in a team. Seeking to work in a junior
                Software Engineer role or as a Web developer role to pursue my
                passion and grow my own skill sets within a company which can
                offers flexibility and opportunity to grow.
              </p>
            </div>
          </div>
          {/* part2 */}
        </div>
        {/* ABOUT SECTION */}
      </div>
    </>
  )
}
