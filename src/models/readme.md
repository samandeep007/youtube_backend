| **Property** | **Applies To** | **Description** |
| --- | --- | --- |
| `type` | All Types | Sets the data type (e.g., String, Number, Date, ObjectId, Array, etc.). |
| `required` | All Types | If true, field must be provided. Can be a function returning boolean. |
| `default` | All Types | Sets default value if not provided. Can be a value or function. |
| `select` | All Types | If false, field is excluded from query results by default. |
| `validate` | All Types | Custom validator function or { validator: fn, message: 'error' }. |
| `get` | All Types | Function to transform value when accessed. |
| `set` | All Types | Function to transform value when set. |
| `alias` | All Types | Virtual field name to access this field. |
| `immutable` | All Types | If true, field cannot be changed after creation. |
| `index` | All Types | If true or object, creates an index (e.g., { index: { unique: true } }). |
| `unique` | All Types | If true, creates a unique index. |
| `sparse` | All Types | If true, index only documents with the field. |
| `text` | All Types | If true, creates a text index for full-text search. |
| `ref` | ObjectId, UUID | References another model for population. |
| `lowercase` | String | If true, converts string to lowercase on save. |
| `uppercase` | String | If true, converts string to uppercase on save. |
| `trim` | String | If true, removes leading/trailing whitespace on save. |
| `match` | String | RegExp or \[RegExp, 'error message'\] to validate string. |
| `enum` | String | Array of allowed values (e.g., \['value1', 'value2'\]). |
| `minlength` | String | Minimum string length or \[Number, 'error message'\]. |
| `maxlength` | String | Maximum string length or \[Number, 'error message'\]. |
| `min` | Number, Date | Minimum value or \[Number/Date, 'error message'\]. |
| `max` | Number, Date | Maximum value or \[Number/Date, 'error message'\]. |
| `of` | Array, Map | Defines type of array elements or Map values (e.g., { type: Map, of: String }). |

#
# Mongoose Hooks, Middlewares, and Methods

This document provides a comprehensive overview of Mongoose hooks (middlewares), custom methods, statics, query helpers, and virtuals. Information is based on Mongoose v8.x documentation.

## Middlewares / Hooks
Middlewares in Mongoose are functions that run at specific stages of a document's lifecycle or query execution. They are defined using `schema.pre()` or `schema.post()`.

| Hook Operation       | Type (Pre/Post) | Applies To (Document/Query/Aggregate/Model) | Parallel/Serial | Description |
|----------------------|-----------------|---------------------------------------------|-----------------|-------------|
| aggregate            | Pre             | Aggregate                                  | Serial          | Runs before aggregation execution; modify pipeline. |
| aggregate            | Post            | Aggregate                                  | Serial          | Runs after aggregation; process results. |
| bulkWrite            | Pre             | Query                                      | Serial          | Before bulk write operations. |
| bulkWrite            | Post            | Query                                      | Serial          | After bulk write; process results. |
| count                | Pre             | Query                                      | Serial          | Before count(). |
| count                | Post            | Query                                      | Serial          | After count(); process count. |
| countDocuments       | Pre             | Query                                      | Serial          | Before countDocuments(). |
| countDocuments       | Post            | Query                                      | Serial          | After countDocuments(); process count. |
| createCollection     | Pre             | Model                                      | Serial          | Before creating collection. |
| createCollection     | Post            | Model                                      | Serial          | After creating collection. |
| deleteOne            | Pre             | Query or Document                          | Serial          | Before deleteOne(). |
| deleteOne            | Post            | Query or Document                          | Serial          | After deleteOne(). |
| deleteMany           | Pre             | Query                                      | Serial          | Before deleteMany(). |
| deleteMany           | Post            | Query                                      | Serial          | After deleteMany(). |
| estimatedDocumentCount| Pre             | Query                                      | Serial          | Before estimatedDocumentCount(). |
| estimatedDocumentCount| Post            | Query                                      | Serial          | After estimatedDocumentCount(). |
| find                 | Pre             | Query                                      | Serial          | Before find(). |
| find                 | Post            | Query                                      | Serial          | After find(). |
| findOne              | Pre             | Query                                      | Serial          | Before findOne(). |
| findOne              | Post            | Query                                      | Serial          | After findOne(). |
| findOneAndDelete     | Pre             | Query                                      | Serial          | Before findOneAndDelete(). |
| findOneAndDelete     | Post            | Query                                      | Serial          | After findOneAndDelete(). |
| findOneAndReplace    | Pre             | Query                                      | Serial          | Before findOneAndReplace(). |
| findOneAndReplace    | Post            | Query                                      | Serial          | After findOneAndReplace(). |
| findOneAndUpdate     | Pre             | Query                                      | Serial          | Before findOneAndUpdate(). |
| findOneAndUpdate     | Post            | Query                                      | Serial          | After findOneAndUpdate(). |
| init                 | Post            | Document                                   | Serial          | After document initialization from DB. |
| insertMany           | Pre             | Query                                      | Serial          | Before insertMany(). |
| insertMany           | Post            | Query                                      | Serial          | After insertMany(). |
| remove               | Pre             | Document                                   | Serial          | Before document remove (deprecated, use deleteOne). |
| remove               | Post            | Document                                   | Serial          | After document remove. |
| save                 | Pre             | Document                                   | Parallel/Serial | Before save(); can be parallel with {parallel: true}. |
| save                 | Post            | Document                                   | Serial          | After save(). |
| updateOne            | Pre             | Query                                      | Serial          | Before updateOne(). |
| updateOne            | Post            | Query                                      | Serial          | After updateOne(). |
| updateMany           | Pre             | Query                                      | Serial          | Before updateMany(). |
| updateMany           | Post            | Query                                      | Serial          | After updateMany(). |
| validate             | Pre             | Document                                   | Parallel/Serial | Before validation; can be parallel. |
| validate             | Post            | Document                                   | Serial          | After validation. |

Hooks can be defined with `schema.pre(method, fn)` or `schema.post(method, fn)`, and options like `{document: true, query: false}` for specificity.

## Instance Methods
Instance methods are functions added to documents (instances of models).

| Method | Syntax | Description |
|--------|--------|-------------|
| Custom Instance Method | schema.methods.methodName = function() {...}; | Adds a method to document prototypes. Called on document instances, e.g., doc.methodName(). Useful for document-specific logic. |

## Static Methods
Static methods are functions added to the model itself.

| Method | Syntax | Description |
|--------|--------|-------------|
| Custom Static Method | schema.statics.methodName = function() {...}; | Adds a method to the model, e.g., Model.methodName(). Useful for model-level operations like custom finds. |

## Query Helpers
Query helpers extend query chains.

| Helper | Syntax | Description |
|--------|--------|-------------|
| Custom Query Helper | schema.query.methodName = function() { return this.where({...}); }; | Adds chainable methods to queries, e.g., Query.methodName(). Chaining supported; returns the query for further chaining. |

Example: See the byOccupation example in docs.

## Virtuals
Virtuals are computed properties not stored in the DB.

| Property | Syntax | Options | Description |
|----------|--------|---------|-------------|
| Virtual Getter/Setter | schema.virtual('name').get(function() {...}).set(function(v) {...}); | { toJSON: { virtuals: true } }, etc. | Defines virtual fields; getters compute on access, setters transform on set. Included in toJSON/toObject if option set. |

For more, refer to official Mongoose docs.