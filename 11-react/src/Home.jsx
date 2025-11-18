function Home(){
  let arr = [1,2,3,4,5,6];

  return(
    <>
    Home
    {arr.map((el, index) => (
        <b key = {index}>{el}</b>
      ))}
    </>
  );
}

export default Home;