
import Layout from '@components/Header';
import { useRef, useState } from 'react';
import styles from '../../styles/Login.module.scss'

export default function Register() {
  const usernameRef = useRef<any>();
  const passwordRef = useRef<any>();
  const emailRef = useRef<any>();
  const [errorStyle, setErrorStyle] = useState(false);
  
  const submitForm = async (e: any) => {
    e.preventDefault();
    const inputValue = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value
    }
    console.log(inputValue);
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/register/`, {
      method: 'POST',
      body: JSON.stringify(inputValue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }
  return (
      <div className={styles.container} >
        <div className={!errorStyle ? styles.form : styles.form_error}>
          <h1 className={styles.title}>
            Register
          </h1>
          <form className={styles.form_input} onSubmit={submitForm}>
            <div>
              <label htmlFor="title">Username:</label> <br />
              <input className="px-2 py-1 w-full border  rounded" type="text" ref={usernameRef} />
            </div>
            <div>
              <label htmlFor="body">Password:</label> <br />
              <input className="px-2 py-1 w-full border  rounded" type="text" ref={passwordRef} />
            </div>
            <div>
              <label htmlFor="body">Email:</label> <br />
              <input className="px-2 py-1 w-full border  rounded" type="text" ref={emailRef} />
            </div>
            <div className="mt-4 text-center">
              <button className="rounded border bg-lime-300 px-4" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
  )
}
