import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { addProducts } from '../../slices/basketSlice';
import Filter from '../../components/Filter'
import FilteredProducts from '../../components/FilteredProducts';
import Footer from '../../components/Footer';
function Product({ products,categories }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts(products));
  }, [products]);
  return (
    <>
      <Head>
        <title>All Products</title>
      </Head>

      <Header />

      <div className='bg-gray-100 p-10 mb-10'>
        <div className='max-w-screen-xl mx-auto'>
          <span className='font-medium'>
            <Link href='/'>Home</Link>
          </span>{' '}
          / <span className='text-yellow-500'>Products</span>
        </div>
      </div>

      <main className='max-w-screen-xl mx-auto mt-5'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-3/12 w-full mb-5 px-5'>
            <Filter categories={categories}/>
          </div>
          <div className='md:w-9/12 w-full mb-5 px-5'>
            <FilteredProducts />
          </div>
        </div>
      </main>

      <Footer/>
    </>
  );
}

export default Product;

export const getStaticProps = async () => {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (response) => response.json()
  );

  const categories = await fetch(
    'https://fakestoreapi.com/products/categories'
  ).then((response) => response.json());

  return {
    props: { products,categories },
  };
};
