import {
  AttachMoney,
  LineStyle,
  // Timeline,
  // TrendingUp,
  PermIdentity,
  Storefront,
  // AttachMoney,
  // BarChart,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1.5;
  height: calc(100vh - 50px);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 50px;
`;

const Wrapper = styled.div`
  padding: 20px;
  color: #555;
`;

const Menu = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-size: 13px;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 5px 0;
`;

const SidebarListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.active && `rgb(240, 240, 255)`};

  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

export default function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>Dashboard</Title>
          <SidebarList>
            <Link to="/dashboard">
              <SidebarListItem active>
                <LineStyle style={{ marginRight: "5px", fontSize: "20px" }} />
                Home
              </SidebarListItem>
            </Link>
          </SidebarList>
        </Menu>
        <Menu>
          <Title>Quick Menu</Title>
          <SidebarList>
            <Link to="/dashboard/users">
              <SidebarListItem>
                <PermIdentity
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                Users
              </SidebarListItem>
            </Link>
            {/* <Link to="/dashboard/new-user">
              <SidebarListItem>
                <PermIdentity
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                Add Users
              </SidebarListItem>
            </Link> */}
            <Link to="/dashboard/products">
              <SidebarListItem>
                <Storefront style={{ marginRight: "5px", fontSize: "20px" }} />
                Products
              </SidebarListItem>
            </Link>
            <Link to="/dashboard/new-product">
              <SidebarListItem>
                <Storefront style={{ marginRight: "5px", fontSize: "20px" }} />
                Add Products
              </SidebarListItem>
            </Link>
            <Link to="/dashboard/orders">
              <SidebarListItem>
                <AttachMoney style={{ marginRight: "5px", fontSize: "20px" }} />
                Orders
              </SidebarListItem>
            </Link>
          </SidebarList>
        </Menu>
        {/* <Menu>
          <Title>Notifications</Title>
          <SidebarList>
            <SidebarListItem>
              <MailOutline style={{marginRight: '5px', fontSize: '20px'}} />
              Mail
            </SidebarListItem>
            <SidebarListItem>
              <DynamicFeed style={{marginRight: '5px', fontSize: '20px'}} />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <ChatBubbleOutline style={{marginRight: '5px', fontSize: '20px'}} />
              Messages
            </SidebarListItem>
          </SidebarList>
        </Menu> */}
        {/* <Menu>
          <Title>Staff</Title>
          <SidebarList>
            <SidebarListItem>
              <WorkOutline style={{marginRight: '5px', fontSize: '20px'}} />
              Manage
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{marginRight: '5px', fontSize: '20px'}} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <Report style={{marginRight: '5px', fontSize: '20px'}} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </Menu> */}
      </Wrapper>
    </Container>
  );
}
