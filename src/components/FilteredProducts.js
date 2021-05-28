import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../slices/basketSlice';
import Product from './Product';

function FiltredProducts() {
  const products = useSelector(selectFilteredProducts);

  return (
    <>
      {products && (
        <p className='mb-4 font-bold text-xl text-gray-500'>
          {products.length} Products Found
        </p>
      )}
      <div className='grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-gray-50'>
        {products?.length &&
          products.map(({id, title, price, description, category, image}) => (
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
      {!products?.length && (
        <p className='text-sm text-gray-400 text-center py-4'>
          No Product Found :(
        </p>
      )}
    </>
  );
}

export default FiltredProducts;
