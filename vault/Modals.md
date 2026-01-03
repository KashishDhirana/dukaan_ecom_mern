# User Model

| Property Name | Property Type                                                                       |
| ------------- | ----------------------------------------------------------------------------------- |
| \_id          | ObjectId                                                                            |
| accountStatus | enum _(\["active", "inactive", "banned"])_                                          |
| address       | string                                                                              |
| avatar        | string _(Path location to the image)_                                               |
| createdAt     | date                                                                                |
| email         | string                                                                              |
| gender        | enum _(\["male", "female", "others"])_                                              |
| loginCount    | number                                                                              |
| name          | string                                                                              |
| orders        | array of [[#Order Model\|Order's _id as string]]                                    |
| password      | string _(hash256)_                                                                  |
| role          | enum _(\["admin", "user", "seller"])_                                               |
| token         | string _(JWT Token)_                                                                |
| updatedAt     | date                                                                                |
| permissions   | array of [[RBAC Permissions#🔑 E-commerce RBAC Permissions\|permissions as string]] |

# Order Model

| Property Name | Property Type                            |
| ------------- | ---------------------------------------- |
| \_id          | ObjectId                                 |
| avatar        | string _(Path location to the image)_    |
| name          | string                                   |
| email         | string                                   |
| password      | string (_hash256_)                       |
| address       | string                                   |
| gender        | enum (\["male", "female", "others"])     |
| role          | enum (\["admin", "user", "seller"])      |
| accountStatus | enum (\["active", "inactive", "banned"]) |
| createdAt     | date                                     |
| updatedAt     | date                                     |

# Category Model

| Property Name | Property Type                                     |
| ------------- | ------------------------------------------------- |
| \_id          | ObjectId                                          |
| createdAt     | date                                              |
| updatedAt     | date                                              |
| name          | string                                            |
| slug          | string (_regex_: `/^[a-z0-9]+(?:\_[a-z0-9]+)*$/)` |
| parentId      | ObjectId                                          |
