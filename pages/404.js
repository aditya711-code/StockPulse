import Link from "next/link";
const Custom404 = () => {
  return (
    <div className='notFound'>
      <h1>404 Page Not Found</h1>
      <h2>
        <Link href='/'>Home</Link>
      </h2>
    </div>
  );
};
export default Custom404;
