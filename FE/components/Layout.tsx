import Link from 'next/link'
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import styles from '../styles/Header.module.scss';

interface Props {
    children?: ReactNode
    token?: any;
    // any props that come into the component
}
const Layout = ({ children, token }: Props) => {
    const { pathname } = useRouter();
    const getDetailUser = async () => {
        const res = await fetch('http://localhost:5000/api/user', {
            credentials: "include"
        });
        console.log(await res.json());

    }
    useEffect(() => {
        if(token) getDetailUser()
    }, [token])
    return (
        <div className='bg-clr-homepage'>
            <header className='sticky flex py-2 px-12 justify-between font-bourton'>
                <button className='text-3xl font-bold' onClick={getDetailUser}>
                    NamSmall's Restaurant
                </button>
                <div className='flex items-center'>
                    <Link className={styles.menuItem} href="/">Home</Link>
                    <Link className={styles.menuItem} href="/menu">Menu</Link>
                    <Link className={styles.menuItem} href="/categories">Categories</Link>
                </div>
                {pathname === '/login' &&
                    <Link href='/register'>
                        <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Register</button>
                    </Link>
                }
                {(pathname !== '/login' ) &&
                    <Link href='/login'>
                        <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Sign in</button>
                    </Link>
                }
                
            </header>
            {children}
        </div>

    )
}

export default Layout
