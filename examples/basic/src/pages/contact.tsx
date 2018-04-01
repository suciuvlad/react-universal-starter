import React from 'react';
import AppTemplate from 'components/layout';

class Contact extends React.Component<any, any> {
  static async getInitialProps () {
    return {
      type: 'contact page'
    }
  }

  render () {
    return (
      <AppTemplate>
        <span>This is the Contact Us. Page Type: is { this.props.type }</span>
      </AppTemplate>
    )
  }
}

export default Contact;