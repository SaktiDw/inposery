import { ErrorLayout } from "@/components";

export default function Custom403() {
  return <ErrorLayout code={403} message="Unauthorized." />;
}
