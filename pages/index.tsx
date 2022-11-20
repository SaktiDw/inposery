import React from "react";
import { Dashboard } from "../components";

type Props = {};

const Home = (props: Props) => {
  // return <Dashboard>Home</Dashboard>;
  return (
    <>
      <Dashboard>Home</Dashboard>
    </>
  );
};

export default Home;

// export async function getServerSideProps() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");
//   const data = await res.json();

//   return { props: { data } };
// }
