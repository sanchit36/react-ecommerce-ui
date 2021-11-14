import styled from "styled-components";

const List = styled.div`
  display: flex;
  align-items: center;
`;

const ListImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const DataListItem = ({ title, image }) => {
  return (
    <List>
      <ListImage src={image} alt={title} />
      {title}
    </List>
  );
};

export default DataListItem;
