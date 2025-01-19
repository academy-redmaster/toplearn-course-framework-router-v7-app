import { Link, Outlet } from "react-router";
import BreadCrumbCustom from "../components/breadcrumb";
import FilterStaus from "../components/filterStatus";
import FilterPriority from "../components/filterPriority";
import { Button } from "@heroui/button";

export default function TodoLayoutPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-8">
    <div className="w-10/12 mx-auto xl:w-full flex flex-col sm:flex-row items-center justify-between">
      <BreadCrumbCustom />
      <div className="flex items-center gap-x-4">
        <FilterStaus />
        <FilterPriority />
        <Button as={Link} to="create" color="secondary" variant="shadow">
          New Todo
        </Button>
      </div>
    </div>
    <Outlet />
  </div>
  );
}
export function meta() {
  return [
    {title:"Todo Index Page"}
  ]
}


export const handle = {
  crumb: () => <Link to="/todo?index">Todo Index</Link>
}