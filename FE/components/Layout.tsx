import Link from 'next/link'
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import styles from '../styles/Header.module.scss';
import { parseCookies } from 'nookies';
import { withAuth } from 'auth/Auth';
interface Props {
    children?: ReactNode,
    data?: any
    // any props that come into the component
}
const Layout = ({ children, data }: Props) => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const getDetailUser = async () => {
        const res = await fetch('http://localhost:5000/api/user', {
            credentials: "include",
        });
        console.log(await res.json());

    }
    useEffect(() => {
        getDetailUser();

    }, [])
    return (
        <div className='bg-clr-homepage'>
            <header className='sticky flex py-2 px-12 justify-between font-bourton'>

                <button className='text-3xl font-bold' onClick={() => router.push('/')}>
                    NamSmall's Restaurant
                </button>
                {/* <div>{token}</div> */}
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
                {(router.pathname !== '/login' && !token) &&
                    <Link href='/login'>
                        <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Sign in</button>
                    </Link>
                }
                { }
            </header>
            {children}
        </div>

    )
}


export default withAuth(Layout) 
