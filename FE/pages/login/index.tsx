import Layout from '@components/Layout';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styles from '../../styles/Login.module.scss'

export default function Login() {
  const titleRef = useRef<any>();
  const bodyRef = useRef<any>();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);
  const submitForm = async (e: any) => {
    e.preventDefault();
    const inputValue = {
      username: titleRef.current.value,
      password: bodyRef.current.value
    }
    if (!inputValue.username || !inputValue.password) {
      setMessage('Please fill your usename or password!');
      setErrorStyle(true)
    }

    const res = await fetch('http://localhost:5000/api/login/', {
      method: 'POST',
      body: JSON.stringify(inputValue),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (res.status === 200) {
      const data = await res.json();
      setAccessToken(data.token)
      // router.push('/')  ;
     
    }
    if (res.status >= 400) {
      setMessage('Please signup your account!');
      setErrorStyle(true);
    }
  }
  const onSubmitLoginGoogle = async () => {
    const res = await fetch('http://localhost:5000/api/auth/google/url');
    
    router.push(await res.json())
    
  }
  
  return (
    <Layout>
      <div className={styles.container} >
        <div className={!errorStyle ? styles.form : styles.form_error}>
          <h1 className={styles.title}>
            Login
          </h1>
          {accessToken && <p>Token: {accessToken}</p>}
          <form className={styles.form_input} onSubmit={submitForm}>
            <div>
              <label htmlFor="title">Username:</label> <br />
              <input className="px-2 py-1 w-full border  rounded" type="text" ref={titleRef} />
            </div>
            <div>
              <label htmlFor="body">Password:</label> <br />
              <input className="px-2 py-1 w-full border  rounded" type="text" ref={bodyRef} />
            </div>
            <div className="mt-4 text-center">
              <button className="rounded border-gray-400 border bg-orange-400 px-4 py-1" type="submit">Submit</button>
            </div>
          </form>
          <div className='text-center'>
            <button onClick={onSubmitLoginGoogle}>Login with Google</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}


