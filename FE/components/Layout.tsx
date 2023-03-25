import Link from 'next/link'
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import styles from '../styles/Header.module.scss';
import Cookies from 'js-cookie';
interface Props {
    children?: ReactNode,
    data?: any
    // any props that come into the component
}
const Layout = ({ children, data }: Props) => {
    const router = useRouter();
    console.log(data);
    
    return (
        <div className='bg-clr-homepage'>
            <header className='sticky flex py-2 px-12 justify-between font-bourton'>

                <button className='text-3xl font-bold' onClick={() => router.push('/')}>
                    NamSmall's Restaurant
                </button>
                <div className='flex items-center'>
                    <Link className={styles.menuItem} href="/">Home</Link>
                    <Link className={styles.menuItem} href="/menu">Menu</Link>
                    <Link className={styles.menuItem} href="/categories">Categories</Link>
                </div>
                {router.pathname === '/login' &&
                    <Link href='/register'>
                        <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Register</button>
                    </Link>
                }
                {(router.pathname !== '/login')  &&
                    <Link href='/login'>
                        <button className='text-2xl bg-amber-500 rounded-full w-16 h-16 text-white'>Sign in</button>
                    </Link>
                }
                { }
            </header>
            {children}
        </div>

    )
}


export default Layout
