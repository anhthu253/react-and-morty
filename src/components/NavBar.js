import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <StyledNavBar>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="details">Details</NavLink>
    </StyledNavBar>
  );
}
const StyledNavBar = styled.nav`
  background: var(--primary);
  border-top: 1px solid var(--black);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
`;
