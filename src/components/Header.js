import styled from "styled-components";
export default function Header({ children }) {
  return (
    <StyledHeader>
      <HeaderContent>{children}</HeaderContent>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  text-aligned: center;
  background: var(--primary);
  color: #06283d;
  position: relative;
`;
const HeaderContent = styled.h1`
  position: absolute;
  top: 20px;
  left: 40%;
  margin: 0 auto;
`;
