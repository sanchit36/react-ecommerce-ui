import styled from "styled-components";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  flex: 7;
`;

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      <Container>
        <Sidebar />
        <Wrapper>{children}</Wrapper>
      </Container>
    </>
  );
};

export default DashboardLayout;
