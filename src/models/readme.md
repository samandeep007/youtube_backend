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
