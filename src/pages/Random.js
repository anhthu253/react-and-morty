import styled from "styled-components";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../components/Card";

export default function Random({
  character,
  onMoreDetails,
  getRandomIndex,
  getRandomApiIndex,
}) {
  return (
    <Section>
      {character.profile !== undefined ? (
        <Card
          key={character.id}
          profile={character.profile}
          needDetails={false}
          onDetails={onMoreDetails}
          isFavorite={false}
          favOption={false}
        />
      ) : (
        <Questionmark>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </Questionmark>
      )}

      <StyledButton onClick={getRandomIndex}>Get Random Character</StyledButton>
      <StyledButton onClick={getRandomApiIndex}>
        Get Random API Character
      </StyledButton>
    </Section>
  );
}

const Section = styled.ul`
  list-style: none;
  position: absolute;
  bottom: 100px;
`;
const Questionmark = styled.div`
  font-size: 20rem;
`;

const StyledButton = styled.button`
  background: lightgrey;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 10px;
`;
