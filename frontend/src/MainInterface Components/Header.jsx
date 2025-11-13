import headerLogo from '../assets/headerLogo.png'
import loginicon from '../assets/loginicon.png'
import {TextAlignJustify} from 'lucide-react'


export function Header(){


    return(

           <div className=" w-screen flex justify-around items-center bg-white py-5 shadow-xl">
            

            <div className=" w-[200px] flex justify-center  items-center gap-x-2 ">

                    <img src={headerLogo} className="size-10 md:size-14"/>

                    <h1 className="font-extrabold text-lg md:text-2xl text-cyan-300 "> Dent<span className="font-bold text-cyan-500">Pulse</span></h1>

            </div>
         
            <div className="hidden lg:block">

                            <nav className="space-x-8 cursor-pointer text-cyan-600"> 
                                <a herf="/html/" className='  hover:text-cyan-800'>Home</a>
                                <a herf="/html/"  className='  hover:text-cyan-800'>Services</a>
                                <a herf="/html/"  className='  hover:text-cyan-800'>About Us</a>
                                <a herf="/html/"  className='  hover:text-cyan-800'>Testimonias</a>
                                <a herf="/html/" className='  hover:text-cyan-800'>Contact</a>         
                            </nav>

            </div>
            <div className="">

                <button className=" flex  justify-center w-[150px] border-cyan-500 border-2 rounded-lg p-2 m-2  font-light  text-black text-sm hover:text-cyan-500 hover:bg-cyan-50">
                      <img src={loginicon} className='w-2/12 h-2/12'/>
                        <span className=''>Login/Signup</span> 

                </button>
            </div>

            

            <div className='block lg:hidden'>
                <TextAlignJustify />
            </div>


           </div>

    )
     
}