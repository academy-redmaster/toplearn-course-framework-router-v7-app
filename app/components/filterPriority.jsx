import { Button } from "@heroui/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
  } from "@heroui/dropdown";
  import { useSearchParams } from "react-router";
  
  export default function FilterPriority() {
    const [searchParams, setSearchParams] = useSearchParams();
    const handlePriority = (key) => {
      if (key === "clear") {
        searchParams.delete("priority");
      } else {
        searchParams.set("priority", key);
      }
      setSearchParams(searchParams);
    };
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">Priority</Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" onAction={handlePriority}>
          <DropdownItem key="low">Low</DropdownItem>
          <DropdownItem key="medium">medium</DropdownItem>
          <DropdownItem key="high">High</DropdownItem>
          <DropdownItem key="clear" className="text-danger" color="danger">
            Clear Filter
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }