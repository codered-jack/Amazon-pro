import Header from '../components/Header';
import { useRouter } from 'next/router'
import Product from '../components/Product'
function search(props) {
    const router = useRouter()
    console.log(router.query)
    const searchTerm = router.query?.searchTerm;
  return (
    <div>
      <Header />
      <main>
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto'>
        {props.products
        .filter((prod)=>(prod.title.includes(searchTerm)))
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
