import { useTheme } from "next-themes";
import {
  Form,
  Link,
  redirect,
  useParams,
  useRouteLoaderData,
} from "react-router";

import restApiImage from "../assets/image/restapi.png";
import githubImage from "../assets/image/github.png";
import routerLightImage from "../assets/image/react-routr-light.svg";
import routerDarkImage from "../assets/image/react-router-dark.svg";
import reactrouterImage from "../assets/image/reactrouter.png";
import { Chip } from "@heroui/chip";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { destroySession, getSession } from "../sessions.server";

export function meta() {
  return [
    { title: "Home Page" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { lang } = useParams();
  const { theme } = useTheme();
  const data = useRouteLoaderData("root");

  return (
    <div className="min-h-screen max-w-7xl mx-auto w-full">
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-y-20">
        <div className="flex flex-col items-center justify-between gap-6 *:text-center">
          <h1 className="font-semibold font-pmarker text-xl md:text-3xl space-x-2">
            {lang === "fa" ? (
              <bdo dir="rtl">
                به ورکشاپ جامع <bdi>React Router</bdi> در
                <bdi>TopLearn.com</bdi>
                خوش آمدید – سفر کامل یادگیری شما از همین‌جا آغاز می‌شود!
              </bdo>
            ) : (
              "Welcome to the Ultimate React Router Workshop – Your Complete Learning Journey Starts Here!"
            )}
          </h1>
          <Chip
            as={Link}
            to="https://toplearn.com"
            variant="flat"
            size="lg"
            color="primary"
            className="font-bold h-8 p-3"
          >
            TopLearn.com
          </Chip>
        </div>
        {theme === "dark" ? (
          <img src={routerDarkImage} className="w-full px-8 lg:px-0" alt="" />
        ) : (
          <img src={routerLightImage} className="w-full px-8 lg:px-0" alt="" />
        )}
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  my-10 ">
        <Card isFooterBlurred className="border-none h-[400px]" radius="lg">
          <Image
            alt="Woman listing to music"
            className="object-cover w-full h-full"
            src={githubImage}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-background font-bold uppercase text-white/80">
              GitHub resources
            </p>
            <Button
              as={Link}
              className="font-bold text-white bg-black/40 capitalize"
              to="https://github.com/academy-redmaster"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Visit this website
            </Button>
          </CardFooter>
        </Card>
        <Card
          isFooterBlurred
          className="border-none h-[400px] bg-black"
          radius="lg"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover w-full h-full"
            src={reactrouterImage}
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-background font-bold uppercase text-white/80">
              Visit React Router
            </p>
            <Button
              as={Link}
              className="font-bold text-white bg-black/40 capitalize"
              to="https://reactrouter.com/"
              color="default"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Visit this website
            </Button>
          </CardFooter>
        </Card>

        <Card
          isFooterBlurred
          className="border-none  h-[400px] bg-white "
          radius="lg"
        >
          <Image
            alt="Woman listing to music"
            className="object-cover w-full h-full"
            src={restApiImage}
          />
          <CardFooter className="justify-between before:bg-black/10 border-black/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="font-bold uppercase text-black">REST API Document</p>
            <Button
              as={Link}
              className="font-bold text-white bg-black/40 capitalize"
              to="http://localhost:8008/api-docs/"
              radius="lg"
              size="sm"
              variant="flat"
            >
              Visit this website
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const cookie = await destroySession(session);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}
