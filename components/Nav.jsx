'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProvider } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggeleDropdown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
        const response = await getProvider();

        setProviders(response)
    }
    setProviders()
  },[])
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt='Promptopia logo' width={32} height={32} className='object-contain'/>
        <p className='logo_text'> Promptopia </p>
      </Link>

      {/* Desktop navigation */}

      <div className='hidden sm:flex'>
        {isUserLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href='/create-prompt' className='black_btn'>
                    Create Prompt
                </Link>
                <button className='outline_btn' onClick={signOut}>
                    Sign Out
                </button>
                <Link href='/profile'>
                    <Image src='/assets/images/logo.svg' 
                        width={30} height={30} className='rounded-full'
                        alt='profile' onClick={()=> {}}
                    />
                </Link>
            </div>
            ) 
            : 
            (
                <>
                    { providers &&
                      Object.values(providers).map((provider) => (
                        <button className='black_btn' type='button' onClick={() =>  signIn(provider.id)}>
                            Sign In
                        </button>
                      ))
                      }
                </>
            )
        }
      </div>

      {/* {Mobile Navigation} */}
      <div className='flex sm:hidden relative'>
        {isUserLoggedIn ? 
        (
            <div className='flex'>
                <Image src='/assets/icons/menu.svg' 
                    width={30} height={30} 
                    className='rounded-full' alt='profile' 
                    onClick={()=>setToggeleDropdown(prevState => !prevState)
                    }
                />
                {toggleDropdown && (
                    <div className='dropdown'>
                        <Link href='/create-prompt' className='dropdown_link'
                            onClick={()=>setToggeleDropdown(false)}>
                            Create Prompt
                        </Link>
                        <Link className='dropdown_link' 
                            href='/profile'
                            onClick={()=>setToggeleDropdown(false)}>
                        My Profile
                        </Link>                  
                        <button className='black_btn' onClick={()=>{
                            signOut()
                            setToggeleDropdown(false)
                        }}>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        ) : 
        (
            <>
                { providers &&
                    Object.values(providers).map((provider) => (
                    <button className='black_btn' type='button' onClick={() =>  signIn(provider.id)}>
                        Sign In
                    </button>
                    ))
                }
            </>
        )}
      </div>
      
    </nav>
  )
}

export default Nav
