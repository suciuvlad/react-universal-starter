import React from 'react';
import AppTemplate from 'components/layout';

interface Props {
  randomVar: string,
  not: string
}

class Home extends React.Component<Props, any> {
 static async getInitialProps () {
    return {
      variable: 'johndoe',
      mama: true
    }
  }

  render () {
    return (
      <AppTemplate>
        <span>This is the Homepage. Homepage is { this.props.variable }</span>
      </AppTemplate>
    )
  }
}

export default Home;