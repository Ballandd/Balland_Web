import Head from "next/head";

export default function Club() {

  return (
    <div>
      <Head>
        <title>Tailwind Navbar Tutorial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* content goes here */}
      <div className="py-32 text-center">
        <div className="text-4xl font-extrabold">Club main page</div>
      </div>
    </div>
  );
}