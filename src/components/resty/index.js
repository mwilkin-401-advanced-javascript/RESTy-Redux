import './resty.css';

import React from 'react';
import superagent from 'superagent';
import ReactJson from 'react-json-view';
import md5 from 'md5';

import History from './history';
// import DisplayResonse from './displayResponse';

class RESTy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: 'get',
      requestBody: '',
      username: '',
      password: '',
      token: '',
      header: {},
      body: {},
      history: {},
      headersVisible: false,
    };
  }

  componentDidMount() {
    try {
      const history = JSON.parse(localStorage.getItem('history'));
      this.setState({ history });
    } catch (e) {
      console.error(e);
    }
  }

  saveHistory = () => {
    localStorage.setItem('history', JSON.stringify(this.state.history));
  };

  updateHistory = () => {
    const url = new URL(this.state.url);

    const lastRun = {
      host: url.hostname,
      path: url.pathname,
      url: this.state.url,
      method: this.state.method,
      requestBody: this.state.requestBody,
      username: this.state.username,
      password: this.state.password,
      token: this.state.token,
      body: {},
      header: {},
    };

    const key = md5(JSON.stringify(lastRun));
    const entry = { [key]: lastRun };
    const history = { ...this.state.history, ...entry };
    this.setState({ history });
    this.saveHistory();
  };

  resetFormFromHistory = (event) => {
    event.preventDefault();
    const newState = this.state.history[event.currentTarget.id];
    this.setState({ ...newState });
  };

  handleChange = (event) => {
    const prop = event.target.name;
    const { value } = event.target;
    this.setState({ [prop]: value });

    // If basic/bearer, clear the other
    if (prop === 'token') {
      const username = '';
      const password = '';
      this.setState({ username, password });
    }

    if (prop.match(/username|password/)) {
      const token = '';
      this.setState({ token });
    }
  };

  toggleHeaders = () => {
    const headersVisible = !this.state.headersVisible;
    this.setState({ headersVisible });
  };

  callAPI = (event) => {
    event.preventDefault();

    const contentType = { 'Content-Type': 'application/json' };
    const bearer = this.state.token
      ? { Authorization: `Bearer ${this.state.token}` }
      : {};
    const basic = this.state.username && this.state.password
      ? {
        Authorization:
              `Basic ${btoa(`${this.state.username}:${this.state.password}`)}`,
      }
      : {};

    superagent(this.state.method, this.state.url)
      .set('Content-Type', 'application/json')
      .set(Object.assign(contentType, bearer, basic))
      .send(this.state.requestBody)
      .then((response) => {
        const { header } = response;
        const { body } = response;
        this.setState({ header, body });
        this.updateHistory();
      })
      .catch((e) => {
        const body = { error: e.message };
        const header = {};
        this.setState({ header, body });
      });
  };

  render() {
    return (
      <main>
        <History handleClick={this.resetFormFromHistory}/>
        {/* <aside>
          <h2>History</h2>
          <ul id="history">
            {this.state.history &&
              Object.keys(this.state.history).map(key => (
                <li key={key} id={key} onClick={this.resetFormFromHistory}>
                  <span>
                    <strong>{this.state.history[key].method}</strong>
                  </span>
                  <span>{this.state.history[key].host}</span>
                  <span>{this.state.history[key].path}</span>
                </li>
              ))}
          </ul>
        </aside> */}
        <section className="deck">
          {/* <Form /> */}
          <form onSubmit={this.callAPI}>
            <section>
              <input
                type="text"
                className="wide"
                name="url"
                placeholder="URL"
                value={this.state.url}
                onChange={this.handleChange}
              />

              <div id="methods">
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === 'get'}
                    value="get"
                    onChange={this.handleChange}
                  />
                  <span>GET</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === 'post'}
                    value="post"
                    onChange={this.handleChange}
                  />
                  <span>POST</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === 'put'}
                    value="put"
                    onChange={this.handleChange}
                  />
                  <span>PUT</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === 'patch'}
                    value="patch"
                    onChange={this.handleChange}
                  />
                  <span>PATCH</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="method"
                    checked={this.state.method === 'delete'}
                    value="delete"
                    onChange={this.handleChange}
                  />
                  <span>DELETE</span>
                </label>
                <label>
                  <button type="submit">Go!</button>
                </label>
              </div>
            </section>

            <section className="deck col-2">
              <div id="body">
                <textarea
                  placeholder="Raw JSON Body"
                  name="requestBody"
                  onChange={this.handleChange}
                  value={this.state.requestBody}
                  disabled={
                    !!this.state.method.match(/get|delete/)
                  }
                />
              </div>

              <div id="headers">
                <button onClick={this.toggleHeaders}>
                  Headers
                </button>
                <div className={`visible-${this.state.headersVisible}`}>
                  <h2>Basic Authorization</h2>
                  <input
                    onChange={this.handleChange}
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                  />
                  <input
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                  />
                </div>
                <div className={`visible-${this.state.headersVisible}`}>
                  <h2>Bearer Token</h2>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    className="wide"
                    name="token"
                    placeholder="Token"
                    value={this.state.token}
                  />
                </div>
              </div>
            </section>
          </form>
          {/* <DisplayResonse header={this.props.formData.header} body={this.props.formData.body}/> */}
          <div id="json">
            <ReactJson
              name="Headers"
              enableClipboard={false}
              collapsed={true}
              src={this.state.header}
            />
            <ReactJson
              name="Response"
              enableClipboard={false}
              collapsed={false}
              src={this.state.body}
            />
          </div>
        </section>
      </main>
    );
  }
}

export default RESTy;
