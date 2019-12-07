import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <p>Hey I'm on every page</p>
        </Page>
        <Component />
      </Container>
    );
  }
}

export default MyApp;
