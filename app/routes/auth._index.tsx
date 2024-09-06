import { LoaderFunctionArgs, redirect } from "@remix-run/node";

import authServer from "~/models/nylas/auth.server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: LoaderFunctionArgs) {
  const authUrl = authServer.generateAuthURL();
  return redirect(
    authUrl
    //{
    //     headers: {
    //       Origin: configServer.ORIGIN || "http://localhost:5173",
    //     },
    //   }
  );
}

export default null;