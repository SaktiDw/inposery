import { ErrorLayout } from "@/components";
import { useRouter } from "next/router";

// pages/403.js
export default function Custom403() {
  const router = useRouter();
  return (
    <ErrorLayout>
      <h1>
        <span onClick={() => router.back()}>Click here to go back</span>403 -
        Unauthorized
      </h1>
    </ErrorLayout>
  );
}
