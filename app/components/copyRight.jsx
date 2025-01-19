import { Button } from "@heroui/button";

export default function CopyRight() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto border-t py-6 px-4 xl:px-0 *:text-sm gap-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <Button isIconOnly variant="faded" >
          <i className="ri-instagram-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-telegram-2-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-youtube-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-twitter-x-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-discord-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-stack-overflow-line text-2xl"></i>
        </Button>
        <Button isIconOnly variant="faded">
          <i className="ri-mail-line text-2xl"></i>
        </Button>
      </div>
      <p className="capitalize">
        <i className="ri-copyright-line "></i>
        2025 TopLearn.com . all right reserved
      </p>
    </div>
  );
}