import { NavLink } from "react-router";
import PropTypes from "prop-types";

export default function CustomNavLink({
  href,
  label,
  isPreventScroll = false,
  isEnd = false,
}) {
  return (
    <NavLink
      to={`${href}`}
      end={isEnd}
      preventScrollReset={isPreventScroll}
      className={`custom-navlink ${({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "active" : ""}`}
    >
      <i className="ri-refresh-line text-sm transition-all duration-300 animate-spin hidden loading-icon"></i>
      {label}
    </NavLink>
  );
}

CustomNavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPreventScroll: PropTypes.bool,
  isEnd: PropTypes.bool,
};