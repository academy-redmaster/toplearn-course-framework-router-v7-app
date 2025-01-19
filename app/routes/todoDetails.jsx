import { redirect } from "react-router";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@heroui/react";
import moment from "moment";

export default function TodoDetailsPage({ loaderData }) {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center ">
      <Card className="w-full lg:w-1/2 mx-auto h-[500px] mb-10">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="lg"
              src={loaderData?.owner?.profilePhoto}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {loaderData.title}
              </h4>
              <Chip variant="light" size="md" color="primary">
                {loaderData?.owner?.email}
              </Chip>
            </div>
          </div>
          <div className="space-x-2">
            <Chip
              color="secondary"
              size="md"
              variant={"dot"}
              className="border-secondary"
            >
              {loaderData?.isArchived ? "Arichived" : "UnArchived"}
            </Chip>
            <Chip
              color="warning"
              size="md"
              variant={"dot"}
              className="border-warning"
            >
              {loaderData.status}
            </Chip>
          </div>
        </CardHeader>
        <CardBody className="px-3  text-small text-default-400 flex flex-col justify-between py-4">
          <p>{loaderData.description}</p>
          <div className="space-y-4 my-5">
            <div className="flex items-center gap-x-3">
              <Chip
                color="primary"
                variant="flat"
                endContent={<i className="ri-arrow-right-s-line"></i>}
              >
                Due Date
              </Chip>
              <span className="font-semibold">
                {moment(loaderData.duedate).format("MMMM Do YYYY : HH:mm")}
              </span>
            </div>
            <div className="flex items-center gap-x-3">
              <Chip
                color="primary"
                variant="flat"
                endContent={<i className="ri-arrow-right-s-line"></i>}
              >
                daysLeft
              </Chip>
              <span className="font-semibold">{loaderData.daysLeft}</span>
            </div>
            {loaderData.completedAt ? (
              <div className="flex items-center gap-x-3">
                <Chip
                  color="primary"
                  variant="flat"
                  endContent={<i className="ri-arrow-right-s-line"></i>}
                >
                  CompletedAt
                </Chip>
                <span className="font-semibold">
                  {moment(loaderData.compeletedAt).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>
            ) : null}
          </div>
        </CardBody>
        <CardFooter className="gap-3 flex-col items-start border-b">
          <div className="flex items-center gap-1">
            <p className="text-default-400 text-small">username</p>
            <Chip variant="light" color="primary">
              {loaderData?.owner?.userName}
            </Chip>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-default-400 text-small">email</p>
            <Chip variant="light" color="primary">
              {loaderData?.owner?.email}
            </Chip>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export async function loader({ params }) {
  const response = await fetch(`http://localhost:8008/api/todos/${params.id}`);
  if (!response.ok) {
    return redirect("/todo");
  }
  const data = await response.json();

  return data;
}

export function meta(params) {
  console.log("🚀 ~ meta ~ params:", params);
  return [{ title: `${params?.data?.title}` }];
}


export const handle = {
  crumb: (data) => data?.title,
}