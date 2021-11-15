import { Button, Icon } from "@material-ui/core";
import { useEffect, useState } from "react";
import storeApi from "../api/store-api";
import {
  Container,
  Fullname,
  Image,
  List,
  ListItem,
  Title,
  User,
  Username,
} from "../styles/Widget";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await storeApi.get("users/?new=true");
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <Container>
      <Title>New Join Members</Title>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Image
              src={user.image}
              alt={user.username}
              className="widgetSmImg"
            />
            <User>
              <Username>{user.username}</Username>
              <Fullname>{user.fullname}</Fullname>
            </User>
            <Button>
              <Icon />
              Display
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default WidgetSm;
