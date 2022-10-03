import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <StyledNavBar>
      <LinkButton to="/" end>
        Home
      </LinkButton>
      <LinkButton to="random">Random</LinkButton>
      <LinkButton to="favorites">Favorites</LinkButton>
    </StyledNavBar>
  );
}
const StyledNavBar = styled.nav`
  background: var(--secondary);
  border-top: 1px solid var(--black);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  gap: 20px;
  justify-content: space-around;
`;

const LinkButton = styled(NavLink)`
  color: #06283d;
  padding-top: 30px;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`;
