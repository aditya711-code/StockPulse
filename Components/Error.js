const Error = ({ error }) => {
  const src =
    "https://cdn2.iconfinder.com/data/icons/data-analytics-volume-2/512/INTERNET_SERVER_ERROR-512.png";
  return (
    <div className='errorPage'>
      <h3>{error}</h3>
      <img
        className='error-img'
        src='https://cdn2.iconfinder.com/data/icons/data-analytics-volume-2/512/INTERNET_SERVER_ERROR-512.png'
        alt='Error'
      />
    </div>
  );
};
export default Error;
