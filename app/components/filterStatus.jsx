import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useSearchParams } from "react-router";

export default function FilterStaus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleStatus = (key) => {
    if (key === "clear") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", key);
    }
    setSearchParams(searchParams);
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Status</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" onAction={handleStatus}>
        <DropdownItem key="pending">Pending</DropdownItem>
        <DropdownItem key="in_progress">In Progress</DropdownItem>
        <DropdownItem key="completed">Completed</DropdownItem>
        <DropdownItem key="archived">Archive</DropdownItem>
        <DropdownItem key="clear" className="text-danger" color="danger">
          Clear Filter
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
