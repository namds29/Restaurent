import styles from '../../styles/Menu.module.scss'
import Image from 'next/image';
import picRawSalad from '../../img/raw-salmon-salad.png';
import picSalmonSalad from '../../img/salmon-salad.png';
import picVeggie from '../../img/veggie.png';
import picSalmonStack from '../../img/salmon-stack.png';
import Layout from '../../components/Layout';

const ListMenu = () => {
    return (
        <Layout>
            <div className={styles.menu}>
                <div className='flex items-center justify-evenly mt-6 px-10 font-bourton-base'>
                    <p className='text-2xl'>DELICIOUS</p>
                    <div className={styles.circle}>
                        <Image className={styles.circle_img} src={picSalmonSalad} alt="Icon Raw Salmon Salad"
                        />
                    </div>
                    <p className='text-2xl'>TASTY</p>
                </div>
                <div className={styles.main_dishes}>
                    <div className={styles.food_dishes}>
                        <Image className={styles.img_food} src={picSalmonSalad} alt="Salmon Salad" loading='lazy' />
                        <p className='font-bold text-2xl text-center'>Salmon Salad</p>
                        <p className='font-bold  text-lg text-center text-gray-500'>150 calories</p>
                        <div className={styles.divider}></div>
                        <div className='flex justify-between text-xl mt-3'>
                            <div>
                                <h2 className={styles.price}>Price</h2>
                                <h2 className='font-bold'>Time</h2>
                            </div>
                            <div>
                                <h2 className={styles.price}>250$</h2>
                                <h2 className={styles.time}> 15:00</h2>
                            </div>
                        </div>
                    </div>

                    <div className={styles.food_dishes}>
                        <Image className={styles.img_food} src={picRawSalad} alt="picRawSalad" loading='lazy' />
                        <p className='font-bold text-2xl text-center'>Raw Salmon Salad</p>
                        <p className='font-bold  text-lg text-center text-gray-500'>170 calories</p>
                        <div className={styles.divider}></div>
                        <div className='flex justify-between text-xl mt-3'>
                            <div>
                                <h2 className={styles.price}>Price</h2>
                                <h2 className='font-bold'>Time</h2>
                            </div>
                            <div>
                                <h2 className={styles.price}>150$</h2>
                                <h2 className={styles.time}> 10:00</h2>
                            </div>
                        </div>
                    </div>

                    <div className={styles.food_dishes}>
                        <Image className={styles.img_food} src={picSalmonStack} alt="Salmon Stack" loading='lazy' />
                        <p className='font-bold text-2xl text-center'>Salmon Stack</p>
                        <p className='font-bold  text-lg text-center text-gray-500'>150 calories</p>
                        <div className={styles.divider}></div>
                        <div className='flex justify-between text-xl mt-3'>
                            <div>
                                <h2 className={styles.price}>Price</h2>
                                <h2 className='font-bold'>Time</h2>
                            </div>
                            <div>
                                <h2 className={styles.price}>250$</h2>
                                <h2 className={styles.time}> 15:00</h2>
                            </div>
                        </div>
                    </div>
                    <div className={styles.food_dishes}>
                        <Image className={styles.img_food} src={picVeggie} alt="Egg and veggie" loading='lazy' />
                        <p className='font-bold text-2xl text-center'>Egg and veggie</p>
                        <p className='font-bold  text-lg text-center text-gray-500'>150 calories</p>
                        <div className={styles.divider}></div>
                        <div className='flex justify-between text-xl mt-3'>
                            <div>
                                <h2 className={styles.price}>Price</h2>
                                <h2 className='font-bold'>Time</h2>
                            </div>
                            <div>
                                <h2 className={styles.price}>250$</h2>
                                <h2 className={styles.time}> 15:00</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}
export default ListMenu