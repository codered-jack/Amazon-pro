import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Currency from 'react-currency-formatter';
import Head from 'next/head';
import Product from '../../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectProducts } from '../../slices/basketSlice';
import styles from '../../styles/Product.module.css';
import Footer from '../../components/Footer';
function SingleProduct({ singleProduct, products }) {
  const { id, title, price, image, description, category } = singleProduct;
  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

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
  };

  return (
    <>
      <Head>
        <title>{title} | Amazon</title>
      </Head>
      <Header />
      <div className='bg-gray-200 p-10 mb-10'>
        <div className='max-w-screen-xl mx-auto'>
          <span className='font-medium'>
            <Link href='/'>Home</Link>
          </span>{' '}
          /{' '}
          <span className='font-medium'>
            <Link href='/product'>Product</Link>
          </span>{' '}
          / <span className='text-yellow-500'>{title}</span>
        </div>
      </div>
      <main className='max-w-screen-xl mx-auto mt-5'>
        <div className='flex flex-wrap'>
          <div className='px-5 mb-7 w-full md:w-7/12'>
            <div className='w-full mb-4'>
              <Image
                className={'w-full rounded-lg ' + styles.product_image}
                width={700}
                height={500}
                objectFit='contain'
                src={image}
                alt=''
              />
            </div>
            <div className='flex items-center border-black'>
              {image && (
                <div className='mr-3 mb-3 cursor-pointer'>
                  <Image
                    className='rounded-md'
                    width={100}
                    height={100}
                    objectFit='cover'
                    src={image}
                    alt=''
                  />
                </div>
              )}
            </div>
          </div>
          <div className='px-5 mb-10 w-full md:w-5/12'>
            <p className='font-serif text-xl text-black'>{category}</p>
            <h1 className='my-2 text-5xl text-black mb-7'>{title}</h1>
            <p className='text-gray-600 text-base mb-5'>{description}</p>
            <p className='flex items-center'>
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon key={i} className='h-5 text-yellow-500' />
                ))}
            </p>

            <p className='text-yellow-500 text-2xl mb-7'>
              <Currency quantity={price} currency='INR' />
            </p>
            {hasPrime && (
              <div className='flex items-center space-x-2'>
                <img
                  className='w-12'
                  src='https://links.papareact.com/fdw'
                  alt=''
                />
                <p className='text-xs text-gray-500'>Free Next-day delivery</p>
              </div>
            )}
            <button onClick={addItemToBasket} className='w-full button mt-4'>
              Add to Basket
            </button>
          </div>
        </div>
      </main>
      <div className='mt-12 bg-gradient-to-t from-gray-100 to-transparent'>
        <div className='max-w-screen-2xl mx-auto'>
          <h1 className='text-yellow-500 text-3xl mb-7 mx-10'>
            Related Projects
          </h1>
          <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products &&
              products
                .slice(0, 4)
                .map(({ id, title, price, description, category, image }) => (
                  <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                  />
                ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SingleProduct;

export const getStaticPaths = async () => {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (response) => response.json()
  );

  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const singleProduct = await fetch(
    `https://fakestoreapi.com/products/${id}`
  ).then((res) => res.json());

  const products = await fetch(
    `https://fakestoreapi.com/products/category/${singleProduct?.category}`
  ).then((res) => res.json());

  return {
    props: { singleProduct, products },
  };
};
