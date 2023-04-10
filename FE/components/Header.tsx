import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styles from '../styles/Header.module.scss';
import Image from 'next/image';
import { AppContext } from 'context-api/AppContext';
interface Props {
    children?: ReactNode,
    data?: any
    // any props that come into the component
}
interface User {
    id: number,
    username: string,
    name: string,
    email: string,
    picture: string,
    locale: string
}
const Header = ({ children, data }: Props) => {
    const [user, setUser] = useState<User>({
        id: 0,
        username: "",
        name: "",
        email: "",
        picture: "",
        locale: ""
    });
    const router = useRouter();
    const { userData, avatar } = useContext(AppContext);
    console.log(userData, avatar);

    useEffect(() => {
    }, []);

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

                <div className='flex items-center'>
                    {router.pathname == '/login' && !userData &&
                        <Link href='/register'>
                            <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Register</button>
                        </Link>
                    }
                    {router.pathname !== '/login' && !userData &&
                        <Link href='/login'>
                            <button className='text-2xl bg-amber-500 rounded-full w-20 h-20 text-white'>Sign in</button>
                        </Link>
                    }
                </div>
                {userData &&
                    <Link href='/login'>
                        <button className='text-2xl bg-amber-500 rounded-full w-16 h-16 text-white relative'>
                            {!avatar ? userData.username.charAt(0).toUpperCase() :
                                <Image
                                    src={avatar}
                                    alt="User avatar"
                                    fill
                                    className='rounded-full'
                                />}
                        </button>
                    </Link>
                }
            </header>
            <main>{children}</main>
        </div>

    )
}

export default React.memo(Header);
