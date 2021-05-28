import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProducts,
  updateFilters,
  clearFilters,
} from '../slices/basketSlice';
function Filter({ categories }) {
  const [priceMax, setPriceMax] = useState(1);
  const [price, setPrice] = useState(0);
  const [showClear, setShowClear] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    if (!products) return false;
    const max = products
      ?.map((product) => product.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice(max);
  }, [products]);

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = products.filter((product) => product.price <= value);
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };

  const clearAllFilters = () => {
    dispatch(clearFilters());
    setShowClear(false);
    setPrice(priceMax);
  };

  const filterCategory = async (value) => {
    const filtered = await fetch(
      `https://fakestoreapi.com/products/category/${value}`
    ).then((res) => res.json());
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };
  return (
    <div className='flex flex-col mt-10'>
      <div className='mb-4'>
        <h2 className='font-bold text-base text-gray-600'>Categories</h2>
        <div className='flex flex-col my-5'>
          {categories?.map((value) => (
            <p
              key={value}
              className='text-gray-500 cursor-pointer mb-2'
              onClick={() => filterCategory(value)}
            >
              {value}
            </p>
          ))}
        </div>
      </div>

      <div className='mb-4 pr-10'>
        <h2 className='font-bold text-base text-gray-600'>Price</h2>
        <div className='flex flex-col my-5'>
          <InputRange
            maxValue={priceMax}
            minValue={0}
            value={price}
            formatLabel={(value) => `₹ ${value}`}
            onChange={priceFilter}
          />
        </div>
      </div>

      {showClear && (
        <button onClick={clearAllFilters} className='button w-full'>
          Clear Filter
        </button>
      )}
    </div>
  );
}

export default Filter;
