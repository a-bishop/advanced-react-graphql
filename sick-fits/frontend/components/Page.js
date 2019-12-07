import Header from './Header';
import Meta from './Meta';
import styled, { ThemeProvider, InjectGlobal } from 'styled-components';

const theme = {
  colors: {
    black: 'rgba(7, 7, 7, 1)',
    grey: 'rgba(64, 67, 78, 1)',
    pink: 'rgba(221, 94, 152, 1)',
    gainsboro: 'rgba(209, 222, 222, 1)',
    lilac: 'rgba(179, 153, 162, 1)'
  },
  maxWidth: '1000px'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.colors.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  background: red;
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      <Header />
      <Inner>{props.children}</Inner>
    </StyledPage>
  </ThemeProvider>
);

export default Page;
