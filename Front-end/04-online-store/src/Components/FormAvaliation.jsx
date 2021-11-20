import React, { Component } from 'react';

class Avaliation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commit: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { commit } = this.state;
    return (
      <form>
        <label htmlFor="userReview">
          <textarea
            data-testid="product-detail-evaluation"
            value={ commit }
            name="commit"
            id="userReview"
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

export default Avaliation;
