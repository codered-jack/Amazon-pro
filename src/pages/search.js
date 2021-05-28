import Header from '../components/Header';
import { useRouter } from 'next/router';
import Product from '../components/Product';
import Link from 'next/link'
function search({ products }) {
  const router = useRouter();
  const searchTerm = router.query?.searchTerm?.toLowerCase();
  return (
    <div>
      <Header />
      <main>
        <div className='bg-gray-100 p-10 mb-10'>
          <div className='max-w-screen-xl mx-auto'>
            <span className='font-medium'>
              <Link href='/'>Home</Link>
            </span>{' '}
            / <span className='text-yellow-500'>Search</span>
          </div>
        </div>
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
          {products
            .filter((prod) => prod.title?.toLowerCase().includes(searchTerm))
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
      </main>
    </div>
  );
}

export default search;

export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
