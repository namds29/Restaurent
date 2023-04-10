import styles from '../../styles/Menu.module.scss'
import Image from 'next/image';
import picRawSalad from '../../img/raw-salmon-salad.png';
import picSalmonSalad from '../../img/salmon-salad.png';
import picVeggie from '../../img/veggie.png';
import picSalmonStack from '../../img/salmon-stack.png';
import Layout from '../../components/Header';

const ListMenu = () => {
    const dishes = [
        {
            food_name: 'Salmon Salad',
            calories: 150,
            price: 250,
            time_finish: '35:00',
            url_pic: picSalmonSalad
        },
        {
            food_name: 'Raw Salmon Salad',
            calories: 170,
            price: 350,
            time_finish: '15:00',
            url_pic: picRawSalad
        },
        {
            food_name: 'Salmon Stack',
            calories: 1250,
            price: 1250,
            time_finish: '5:00',
            url_pic: picSalmonStack
        },
        {
            food_name: 'Egg and veggie',
            calories: 150,
            price: 250,
            time_finish: '15:00',
            url_pic: picVeggie
        },
    ]
    return (
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
                {
                    dishes.map((item, index) =>
                        <div key={index} className={styles.food_dishes}>
                            <Image className={styles.img_food} src={item.url_pic} alt="Salmon Salad" loading='lazy' />
                            <p className='font-bold text-2xl text-center'>{item.food_name}</p>
                            <p className='font-bold  text-lg text-center text-gray-500'>{item.calories} calories</p>
                            <div className={styles.divider}></div>
                            <div className='flex justify-between text-xl mt-3'>
                                <div>
                                    <h2 className={styles.price}>Price</h2>
                                    <h2 className='font-bold'>Time</h2>
                                </div>
                                <div>
                                    <h2 className={styles.price}>{item.price}$</h2>
                                    <h2 className={styles.time}> {item.time_finish}</h2>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )

}
export default ListMenu