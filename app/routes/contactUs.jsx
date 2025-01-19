import { useTheme } from "next-themes";
import routerLightImage from "../assets/image/react-routr-light.svg";
import routerDarkImage from "../assets/image/react-router-dark.svg";
import axios from "axios";
import { Button } from "@heroui/button";
import CantactCard from "../components/contactCard";

export default function ContactUsPage({ loaderData }) {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center gap-y-8 py-10">
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-y-6 *:text-center">
        <h1 className="text-5xl font-semibold leading-snug font-pmarker">
          React Router Workshop:
          <br /> From Library to Framework, All in One Comprehensive Training
        </h1>
        <p className="font-semibold text-gray-600">
          Master every feature and capability of React Router—dive deep into its
          evolution from a powerful library to a full-fledged framework, all in
          one workshop.
        </p>
        <div className="hidden md:flex items-center justify-center gap-6">
          <Button isIconOnly variant="light">
            <i className="ri-reactjs-line text-4xl"></i>
          </Button>
          <Button isIconOnly color="danger" variant="light">
            <i className="ri-add-line text-4xl"></i>
          </Button>

          {theme === "dark" ? (
            <img
              className="w-52 h-52 object-contain"
              src={routerDarkImage}
              alt=""
            />
          ) : (
            <img
              className="w-52 h-52 object-contain"
              src={routerLightImage}
              alt=""
            />
          )}
          <Button isIconOnly color="danger" variant="light">
            <i className="ri-equal-line text-4xl"></i>
          </Button>
          <p className="text-xl font-bold">FullStack App</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full place-items-center">
        {loaderData.map((items) => (
          <CantactCard key={items.id} cardDetails={items} />
        ))}
      </div>
    </div>
  );
}

export async function loader() {
  const response = await axios("http://localhost:8008/api/users");
  return response.data;
}

export function meta() {
  return [{ title: "ContactUs Page" }];
}
