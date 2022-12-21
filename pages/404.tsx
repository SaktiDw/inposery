import { ErrorLayout } from "@/components";

export default function Custom404() {
  return <ErrorLayout code={404} message={"Not Found"} />;
}
