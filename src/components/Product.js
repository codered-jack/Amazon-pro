import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import Fade from 'react-reveal/Fade';
import Link from 'next/link';
import { useToasts } from 'react-toast-notifications';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const CustomToast = ({ appearance, children }) => (
    <div style={{ background: appearance === 'info' ? 'white' : 'green' }}>
      {children}
    </div>
  );

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
      quantity: 1,
    };

    dispatch(addToBasket(product));

    addToast(
      <div className='flex rounded-md space-x-2 items-center'>
        <Image src={image} width={200} height={200} alt='' />
        <div>
          <p className='font-medium'>{title}</p>
          <div className='mt-5'>
            <p className='flex'>
              {' '}
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </p>
            <Currency quantity={price} currency='INR' />
          </div>
        </div>
      </div>,
      {
        appearance: 'info',
        autoDismiss: true,
      }
    );
  };

  return (
    <>
      <Fade bottom>
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
          <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
            {category}
          </p>
          <Image src={image} height={200} width={200} objectFit='contain' />

          <Link href={`/product/${id}`}>
            <h4 title={title} className='cursor-pointer my-3 font-medium'>
              {title}
            </h4>
          </Link>

          <div className='flex'>
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className='h-5 text-yellow-500' />
              ))}
          </div>

          <p className='text-xs my-2 line-clamp-2'>{description}</p>

          <div className='mb-5'>
            <Currency quantity={price} currency='INR' />
          </div>

          {hasPrime && (
            <div className='flex items-center space-x-2 -mt-5'>
              <img
                className='w-12'
                src='https://links.papareact.com/fdw'
                alt=''
              />
              <p className='text-xs text-gray-500'>FREE NEXT-day Delivery</p>
            </div>
          )}
          <button onClick={addItemToBasket} className='mt-auto button'>
            Add to Basket
          </button>
        </div>
      </Fade>
    </>
  );
}

export default Product;
