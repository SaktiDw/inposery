import { ErrorLayout } from "@/components";
import { useRouter } from "next/router";

// pages/404.js
export default function Custom404() {
  const router = useRouter();
  return (
    <ErrorLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-9xl">404</h1>
        <p className="text-2xl text-slate-500">Page Not Found.</p>
      </div>
      <button
        onClick={() => router.back()}
        className="shadow-lg p-2 rounded-lg px-8 bg-slate-800 text-white dark:bg-white dark:text-slate-800"
      >
        Back
      </button>
    </ErrorLayout>
  );
}
