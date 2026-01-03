- `200` OK
- `201` Created
- `400` Bad request
- `401` Unauthorized
- `403` Forbidden
- `404` Not found
- `500` Internal Server Error

> [!info] Structure using enum
> ```js
> export enum HTTPCODE {
> 	SUCCESS=200,
> 	CREATED=201,
> 	BADREQUEST=400,
> 	UNAUTHORIZED=401,
> 	FOBIDDEN=403,
> 	NOTFOUND=404,
> 	INTERNALSERVERERROR=500,
> }
> ```
