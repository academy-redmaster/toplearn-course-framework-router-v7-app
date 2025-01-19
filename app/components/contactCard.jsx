import { Card, CardHeader, CardBody,CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import moment from "moment";

export default function CantactCard({ cardDetails }) {
  return (
    <Card className="py-4 h-[400px] w-full">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{cardDetails.email}</p>
        <small className="text-default-500">
          {moment(cardDetails.createdAt).format("MMMM Do YYYY")}
        </small>
        <h4 className="font-bold text-large">{cardDetails.userName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2  w-full h-full">
        <Image
          alt="Card background"
          className="w-full object-cover rounded-xl"
          src={`${cardDetails.profilePhoto}`}
          width={270}
        />
      </CardBody>
      <CardFooter>
        <Chip
          variant="shadow"
          classNames={{
            base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
            content: "drop-shadow shadow-black text-white",
          }}
        >
          {cardDetails.isAdmin ? "Admin" : "User"}
        </Chip>
      </CardFooter>
    </Card>
  );
}
