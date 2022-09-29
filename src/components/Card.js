import styled from "styled-components";

export default function Card() {
  return (
    <StyledCard>
      <ImageContainer>
        <img
          src="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
          alt="Morty Smith"
        />
      </ImageContainer>
    </StyledCard>
  );
}

const StyledCard = styled.li`
  position: relative;
  color: var(--granite);
  width: 300px;
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--water);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;

const ImageContainer = styled.div`
  position: relative;
`;
