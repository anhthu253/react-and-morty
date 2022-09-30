import styled from "styled-components";

export default function Card({ profile, moredetail, showMore }) {
  const { name, avatar, type, status, occurrences } = profile;

  const style = {
    display: moredetail ? "block" : "none",
  };
  return (
    <StyledCard>
      <ImageContainer>
        <img src={avatar} alt={name} />
        <h2>{name}</h2>
      </ImageContainer>
      <button onClick={showMore}>{moredetail ? "Hide" : "Show more"}</button>
      <ContentContainer style={style}>
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
