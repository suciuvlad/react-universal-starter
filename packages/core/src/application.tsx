import React from 'react';
import { withRouter } from 'react-router';
import { loadGetInitialProps } from './load-initial-props';
import { renderRoutes } from 'react-router-config';
import routes from './_routes';

// interface Props {
//   routes: any,
//   initialProps: any,
//   match: any,
//   location: any,
//   history: any
// }

// interface State {
//   initialProps: any
// }

class App extends React.Component<any, any> {
  constructor (props) {
    super(props);

    this.state = { initialProps: props.initialProps };
  }

  async componentWillReceiveProps (nextProps) {
    const pathname = nextProps.location.pathname;

    if (this.props.location.pathname !== pathname) {
      this.setState({ initialProps: undefined });
      window.scrollTo(0, 0);

      const { initialProps } = await loadGetInitialProps( pathname, routes);
      this.setState({ initialProps: initialProps });
    }
  }

  render () {
    return renderRoutes(routes, this.state.initialProps);
  }
}

export default withRouter<any>(App);