import Head from 'next/head';
import styles from '../styles/Homepage.module.scss';

import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import pic1 from '@img/food-bg.png';
import icFb from '@img/ic-fb.svg';
import icIg from '@img/ic-ig.svg';
import decor1 from '@img/decor-1.svg'
import decor2 from '@img/decor-2.svg'
import decor3 from '@img/decor-3.svg'
import dish1 from '@img/dish-1.png'
import dish2 from '@img/dish-2.png'
import dish3 from '@img/dish-3.png'
import dish4 from '@img/dish-4.png'
import dish5 from '@img/dish-5.png'
import chef from '@img/chef.png'
import icTwitter from '@img/ic-twitt.svg';
import Link from 'next/link';


function Home() {
  const router = useRouter();

  return (
    <div >
      <Head>
        <title>NamSmall Restaurant</title>
        <meta name="description" content="NamSmall Restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div className='flex justify-evenly items-center p-12'>
          <div className='text-2xl'>
            <p className='text-7xl font-bold'>We provide the <br />
              best food for you</p>
            <p className='my-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='flex'>
              <button className={styles.btn_style}>Menu</button>
              <button className={styles.btn_style}>Book a table</button>
            </div>
            <div className='flex'>
              <Link href='https://fb.com/namdoan.29'>
                <div className={styles.icon_in4}>
                  <div className={styles.border}></div>
                  <Image src={icFb} alt='Icon FB' />
                </div>
              </Link>
              <Link href='https://www.instagram.com/nammdoan/'>
                <div className={styles.icon_in4}>
                  <div className={styles.border}></div>
                  <Image src={icIg} alt='Icon Ins' />
                </div>
              </Link>
              <Link href='https://www.instagram.com/nammdoan/'>
                <div className={styles.icon_in4} >
                  <div className={styles.border}></div>
                  <Image src={icTwitter} alt='Icon Twitter' />
                </div>
              </Link>
            </div>
          </div>
          <div>
            <Image className={styles.intro_pic} src={pic1} alt='Intro pic' />
          </div>
        </div>
      </section>

      <section className='bg-white pt-4 px-8 pb-12'>
        <div className='text-center flex justify-center relative'>
          <Image className='absolute left-1/4' src={decor2} alt='Decoration' width={150} />
          <div>
            <p className='font-bold text-6xl'>Our Special Dishes</p>
            <p className='text-2xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt </p>
          </div>
          <Image className='absolute right-1/4' src={decor1} alt='Decoration' width={120} />
        </div>
        <div className="flex justify-center gap-20 pb-8 text-center flex-wrap mt-14">
          <div className={styles.boxes}>
            <Image className={styles.dishes} src={dish1} alt='Lumpia with Suace' />
            <div className={styles.prices}>$52</div>
            <p className='font-bold text-2xl pt-24 text-white'>Lumpia with Suace</p>
            <p className='text-xl text-gray-400'>Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor </p>
          </div>
          <div className={styles.boxes}>
            <Image className={styles.dishes} src={dish3} alt='Fish and Veggie' />
            <div className={styles.prices}>$52</div>
            <p className='font-bold text-2xl pt-24 text-white'>Fish and Veggie</p>
            <p className='text-xl text-gray-400'>Lorem i  psum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor </p>
          </div>
          <div className={styles.boxes}>
            <Image className={styles.dishes} src={dish4} alt='Tofu Chili' />
            <div className={styles.prices}>$52</div>
            <p className='font-bold text-2xl pt-24 text-white'>Tofu Chili</p>
            <p className='text-xl text-gray-400'>Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor </p>
          </div>
          <div className={styles.boxes}>
            <Image className={styles.dishes} src={dish5} alt='Egg and Cocumber' />
            <div className={styles.prices}>$52</div>
            <p className='font-bold text-2xl pt-24 text-white'>Egg and Cocumber</p>
            <p className='text-xl text-gray-400'>Lorem ipsum dolor sit , consectetur adipiscing elit, sed do eiusmod tempor </p>
          </div>
        </div>
        <div className='flex justify-center gap-20 my-24 items-center flex-wrap relative'>
          <Image src={dish2} alt='Decoration' width={450} />
          <div>
            <p className='font-bold text-7xl'>Wecome to Our Restaurant</p>
            <p className='text-3xl mt-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className={styles.btn_leaf}>Menu</button>
          </div>
          <Image className={styles.decor} src={decor3} alt='Decoration' width={200} />
          <Image className='absolute left-4 bottom-96 rotate-12' src={decor1} alt='Decoration' width={200} />
          <Image className='absolute right-72 bottom-96 rotate-12' src={decor2} alt='Decoration' width={200} />
        </div>
      </section>
      <section className='py-12'>
        <div className="flex justify-center relative flex-wrap">
          <div className='w-1/2 mr-24'>
            <p className='font-bold text-6xl mb-8'>Our Expects Chef</p>
            <p className='text-2xl text-gray-400 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <ul className={styles.listDecoration} >
              <li>Lorem ipsum dolor sit amet, consectetur </li>
              <li>Lorem ipsum dolor sit amet, consectetur </li>
              <li>Lorem ipsum dolor sit amet, consectetur </li>
              <li>Lorem ipsum dolor sit amet, consectetur </li>
              <li>Lorem ipsum dolor sit amet, consectetur </li>
              <li>Lorem ipsum dolor sit amet, consectetur </li>
            </ul>
          </div>
          <div>
            <Image src={chef} alt="Chef" width={250} />
          </div>
          <Image className='absolute right-20 bottom-12 rotate-12' src={decor2} alt='Decoration' width={200} />
        </div>
      </section>
    </div>
  )
}

export default Home;