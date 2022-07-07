## Transaction Route

### GET
You need to give the user id via query params, so it will return the transactions from the user with that id.

### GET One
On front end this request is used when opening the edit/delete transaction modal.

It will return the transaction with the given id.

### POST
This needs a request with a body that should has a least the following properties:
 - Name
 - Amount
 - Type
 - User

### PATCH
This route receives the transaction id on query params, and the transaction properties to update on request body.

### DELETE 
This route receives the transaction id on query params and delete it.
