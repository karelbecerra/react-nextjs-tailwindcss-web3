import HomeIntro from '../components/home/HomeIntro';
import { DefaultLayout } from '../layout';

const Home = () => {
  // functions
  const handleFetchPost = async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    console.log('data:', data);
  };

  // render out
  return (
    <>
      <content className="container mx-auto flex flex-col my-24 max-w-6xl">
        <section className='flex flex-row w-full justify-center space-x-10'>
          <HomeIntro />
        </section>
      </content>
    </>
  )
}

Home.Layout = DefaultLayout;

export default Home;