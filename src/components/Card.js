import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

export default function Card({
  profile,
  favOption,
  isFavorite,
  setFavorite,
  needDetails,
  onDetails,
}) {
  const { name, avatar, type, status, occurrences } = profile;

  return (
    <StyledCard>
      <ImageContainer>
        <FavButton
          style={{
            display: favOption ? "block" : "none",
          }}
          onClick={setFavorite}
        >
          <FontAwesomeIcon
            icon={faStar}
            style={{
              display: isFavorite ? "none" : "block",
            }}
            fontSize="20px"
          />
          <FontAwesomeIcon
            icon={faStarSolid}
            style={{
              display: isFavorite ? "block" : "none",
            }}
            fontSize="20px"
          />
        </FavButton>
        <img src={avatar} alt={name} />
        <h2>{name}</h2>
      </ImageContainer>
      <button onClick={onDetails}>
        {needDetails ? "Show less" : "Show more"}
      </button>

      <ContentContainer style={{ display: needDetails ? "block" : "none" }}>
        <CardInfo>
          <dt>Status</dt>
          <Description>{status}</Description>
          <dt>Type</dt>
          <Description>{type}</Description>
          <dt>Occurrences</dt>
          <Description>{occurrences}</Description>
        </CardInfo>
      </ContentContainer>
    </StyledCard>
  );
}

const FavButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;

  &:hover {
    cursor: pointer;
  }
`;
const StyledCard = styled.li`
  position: relative;
  color: var(--granite);
  padding: 10px 0;
  border-radius: 5px;
  background-color: var(--water);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
`;
const CardInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 0;
`;

const Description = styled.dd`
  text-align: right;
  background-color: var(--water);
`;
const ContentContainer = styled.div`
  padding: 10px 20px 20px;
  display: grid;
  gap: 20px;
`;
const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
`;
