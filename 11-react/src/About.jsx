function About(){
  console.log("Hello!");

  useEffect(() =>{
    console.log("This is from inside the useEffect!")
  }, [])

  let hello = "hello";


  return(
    <>
    About
    {hello}
    </>
  );
}

export default About;