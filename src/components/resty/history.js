import React from 'react';

// going to be connected


class History extends React.Component {
  render() {
    return (
      <aside>
          <h2>History</h2>
          <ul id="history">
            {this.state.history
              && Object.keys(this.state.history).map(key => (
                <li key={key} id={key} onClick={this.resetFormFromHistory}>
                  <span>
                    <strong>{this.state.history[key].method}</strong>
                  </span>
                  <span>{this.state.history[key].host}</span>
                  <span>{this.state.history[key].path}</span>
                </li>
              ))}
          </ul>
        </aside>
    );
  }
}

export default History;
