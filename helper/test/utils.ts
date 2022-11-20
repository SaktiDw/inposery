import { vi } from "vitest";

// Mocks useRouter
const useRouter = vi.spyOn(require("next/router"), "useRouter");

/**
 * mockNextUseRouter
 * Mocks the useRouter React hook from Next.js on a test-case by test-case basis
 */
export function mockNextUseRouter(props: {
  route: string;
  pathname: string;
  query: any;
  asPath: string;
}) {
  useRouter.mockImplementationOnce(() => ({
    route: props.route,
    pathname: props.pathname,
    query: props.query,
    asPath: props.asPath,
  }));
}
