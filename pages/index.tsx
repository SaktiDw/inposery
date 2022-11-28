import useAuth from "@/helper/hooks/useAuth";
import { slugify } from "@/helper/lib/slug";
import Link from "next/link";
import React from "react";
import { Dashboard, Navigation } from "../components";

type Props = {};

const Home = (props: Props) => {
  // return <Dashboard>Home</Dashboard>;
  const { user } = useAuth();
  return (
    <>
      <main className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white">
        <Navigation onClick={() => null} />
        <h1 className="text-slate-800 dark:text-white text-3xl">
          Landing Page ♥
        </h1>
        {slugify("Landing Page ♥")}
        <Link href="/dashboard">Get Started</Link>
      </main>
    </>
  );
};

export default Home;

// export async function getServerSideProps() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");
//   const data = await res.json();

//   return { props: { data } };
// }
