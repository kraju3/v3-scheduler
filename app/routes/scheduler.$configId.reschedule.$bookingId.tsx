import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData} from "@remix-run/react";
import NylasCustomScheduler from "~/components/scheduler";
import sessionServer from "~/models/nylas/session.server";

type LoaderData = {
  configurationId: string;
  sessionId: string;
  bookingId: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
   const configurationId = params.configId
  const bookingId = params.bookingId

  if (!configurationId || !bookingId) {
    return redirect("/error")
  }

  const sessionId = await sessionServer.createSchedulerSession({
    configurationId,
    ttl:30
  })
  return json({
    configurationId,
    sessionId,
    bookingId
  })

}
export default function Scheduler() {
  const {configurationId,bookingId,sessionId} = useLoaderData<LoaderData>();
  return (
    <NylasCustomScheduler
      configId={configurationId ?? ""}
      bookingId={bookingId}
      sessionId ={sessionId}
      rescheduleFlow={true}
    />
  );
}
