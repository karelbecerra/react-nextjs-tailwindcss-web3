import { useRouter } from 'next/router';

import { DefaultLayout } from '../layout';

const PageById = () => {

  const router = useRouter();
  const { page } = router.query;

  return (
    <>
      <content className="container mx-auto flex flex-col my-24 max-w-6xl">
        <section className='flex flex-row w-full justify-center space-x-10'>
          <div className="flex rounded-3xl p-4 border border-gray-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900 ">
                <span className="text-gradient ">{page}</span>
            </h1>
          </div>
        </section>
      </content>
    </>
  )
}

PageById.Layout = DefaultLayout;

export default PageById;