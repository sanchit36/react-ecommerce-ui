import Announcement from 'components/Announcement/announcement.component';
import Footer from 'components/Footer/footer.component';
import Navbar from 'components/Navbar/navbar.component';
import Newsletter from 'components/Newsletter';

import { Container, Wrapper } from './main-layout.styles';

const Layout = ({ children, noNewsletter }) => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>{children}</Wrapper>
      {!noNewsletter && <Newsletter />}
      <Footer />
    </Container>
  );
};

export default Layout;
