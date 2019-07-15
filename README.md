# Resty-redux refactor



## Authored by Matt Wilkin

* [PR]()

* [AWS Deployment](not accomplished yet)

* [UML](https://www.lucidchart.com/documents/view/49c54ce9-3fc4-42be-b718-667439159bdf/0)

### File Structure (Target)

```
├── config
│   ├── jest
│   │   ├── cssTransform.js
│   │   └── fileTransform.js
│   ├── env.js
│   ├── modules.js
│   ├── paths.js
│   ├── webpack.config.js
│   └── webpackDevServer.config.js
│
├── README.md
├── package.json
├── package-lock.json
├── public
│   └── index.html
│
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
└── src
    ├── actions
    │   ├── formAction.js
    │   └── historyAction.js
    │
    ├── components
    │   ├── footer
    │   │   └── index.js
    │   ├── header
    │   │   └── index.js
    │   └── resty
    │       ├── displayResponse.js
    │       ├── form.js
    │       ├── history.js
    │       ├── index.js
    │       ├── methodHandler.js
    │       ├── methods.js
    │       └── resty.css
    │
    ├── app.js
    ├── index.js
    ├── lib
    │   ├── api.js
    │   └── utils.js
    │   └── reporter.js
    │
    ├── reducers
    │   ├── formReducer.js
    │   └── historyReducer.js
    ├── store
    │   └── index.js
    │   
    └── style
        ├── reset.css
        └── style.css
```
### Requirements

Keeping the core functionality in place, upgrade RESTy
 *  Convert from component state to a Redux Store

* Convert from using superagent to fetch
* Modularize the component and store tree
* Fully document the application and all components
* Fully test the reducers, actions, and units

### Implementation Notes

* Use the deployed API server at https://api-401js.herokuapp.com
* The API server has players and teams models
##### The api server supports the following routes:

* `GET /api/v1/models` - A list of all data models

* `GET /api/v1/:model/schema` - The JSON Schema for a given model

* `GET /api/v1/:model/id` - A single record, from a model, with the id

* `DELETE /api/v1/:model/id` - Delete a single record, from a model, with the id

* `PUT /api/v1/:model/id` - Replace single record, from a model, with the id

* `PATCH /api/v1/:model/id` - Tactically update a single record, from a model, with the id

