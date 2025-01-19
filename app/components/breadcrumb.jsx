import { Link, useMatches } from "react-router";
import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";
export default function BreadCrumbCustom() {
  const matches = useMatches();
  console.log("🚀 ~ BreadCrumbCustom ~ matches:", matches)
  const crumbs = matches
    .filter((match) => Boolean(match?.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));
  return (
    <Breadcrumbs>
      <BreadcrumbItem key="Home">
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index}>{crumb}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}