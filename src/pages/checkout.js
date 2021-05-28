import Header from '../components/Header';
import CheckoutProduct from '../components/CheckoutProduct';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Footer from '../components/Footer';
const stripePromise = loadStripe(process.env.stripe_public_key);
function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email,
    });

    //Redirect user to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b-1 pb-4'>
              {items.length === 0
                ? 'Your Amazon Basket is empty'
                : 'Your Shopping Basket'}
            </h1>
            {items.length === 0 && (
              <div>
                <Image
                  className='flex'
                  src='https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg'
                  height={600}
                  width={600}
                  objectFit='contain'
                />
              </div>
            )}
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items) : &nbsp;
                <span className='font-bold'>
                  <Currency quantity={total} currency='INR' />
                </span>
              </h2>
              <button
                role='link'
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign In to checkout' : 'Proceed to Checkout'}
              </button>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
