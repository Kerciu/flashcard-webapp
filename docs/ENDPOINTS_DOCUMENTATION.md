
# API Documentation: AuthenticationController

## 1. `GET /api/auth/oauth2/success`

**Description**: This endpoint is invoked after a successful social login (OAuth2). It retrieves or creates a user based on the email from the OAuth2 provider and generates a JWT token for the user.

#### Parameters
- `Authentication authentication`: Contains authentication details.

**Request**:  
This endpoint does not require any request body. The authentication will be handled by Spring Security automatically.

**Response**:
- `200 OK`: The OAuth2 login is successful. A JWT token and customer data are returned.
  ```json
  {
    "token": "JWT token string",
    "customer": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "profileCreationDate": "2025-01-03T00:00:00"
    }
  }
  ```
- `400 Bad Request`: If the request is invalid or an error occurs during processing.

---

## 2. `POST /api/auth/register`

**Description**: Registers a new user. The user’s details (email, username, password) are provided in the request body. If a user with the given email already exists, the request will fail.

**Request Body**:
```json
{
  "email": "user@example.com",
  "username": "user123",
  "password": "password123"
}
```

- `email`: The email address of the user (required).
- `username`: The username of the user (required).
- `password`: The password of the user (required).

**Response**:
- `201 Created`: The user was successfully registered.
  ```json
  "customer registered"
  ```
- `400 Bad Request`: If the email already exists.
  ```json
  "registration failed - user already exists"
  ```
- `500 Internal Server Error`: If an exception occurs during the registration process.
  ```json
  "exception occurred: <error message>"
  ```

---

## 3. `POST /api/auth/usernamePasswordLogin`

**Description**: Logs in a user using their email and password. If successful, a JWT token is returned for authentication.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- `email`: The email address of the user (required).
- `password`: The password of the user (required).

**Response**:
- `200 OK`: The authentication is successful and a JWT token is returned.
  ```json
  {
    "token": "JWT token string"
  }
  ```
- `401 Unauthorized`: If the login credentials are incorrect or user is not validated.

---

## 4. `POST /api/auth/verifyUser`

**Description**: Verifies a user's email by validating the verification code. The request body contains the user's email and verification code. If the code matches, the user is verified successfully.

**Request Body**:
```json
{
  "email": "user@example.com",
  "code": "a1b2c3d4"
}
```
**Response**:
- `200 OK`: The verification is successful.
  ```json
  "user verified successfully"
  ```
- `400 Bad Request`: If the user is already registered.
  ```json
  "user already verified"
  ```
- `400 Bad Request`: Verification code is incorrect.
  ```json
  "verification code is incorrect"
  ```
- `404 Bad Request`: The verification code was not found.
  ```json
  "verification code not found"
  ```
- `404 Bad Request`: Customer was not found.
  ```json
  "customer not found"
  ```
---
## 5. `POST /api/auth/resendVerificationCode`

**Description**: Resends a verification code to the provided email address. This endpoint is useful when the user has not received the verification code or the previous one expired.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```
**Response**:
- `200 OK`: The verification code was resent successfully.
  ```json
  "verification code resent"
  ```
- `404 Bad Request`: If customer with provided email does not exist.
  ```json
  "customer with this email not found"
  ```
---
## 6. `POST /api/auth/forgotPasswordRequest`

**Description**: Sends a request when password is forgotten.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```
**Response**:
- `200 OK`: Password reset request was sent successfully.
  ```json
  "password reset request sent"
  ```
- `404 Bad Request`: If customer with provided email does not exist.
  ```json
  "customer with this email not found"
  ```
---
## 7. `POST /api/auth/forgotPassword`

**Description**: Sets new password.

**Request Body**:
```json
{
  "email": "user@example.com",
  "code": "a1b2c3d4",
  "newPassword": "newPassword"
}
```
**Response**:
- `200 OK`: Password was reseted successfully.
  ```json
  "password reseted successfully"
  ```
- `400 Bad Request`: Verification code is incorrect.
  ```json
  "verification code is incorrect"
  ```
- `404 Bad Request`: If customer with provided email does not exist.
  ```json
  "customer with this email not found"
  ```
- `404 Bad Request`: The verification code was not found.
  ```json
  "verification code not found"
  ```
---

## 8. `POST /api/auth/changePassword`

**Description**: Changes the password to the new one.

**Request Body**:
```json
{
  "oldPassword": "oldPassword",
  "newPassword": "newPassword"
}
```
**Response**:
- `200 OK`: Password was changed successfully.
  ```json
  "password changed successfully"
  ```
- `400 Bad Request`: Old password is incorrect.
  ```json
  "old password is incorrect"
  ```
---
## Error Handling

In case of an error (e.g., invalid credentials, server issue), the responses may include an appropriate error message in the response body, such as:
```json
{
  "error": "Error message"
}
```
---

# API Documentation

## GET `/api/auth/validateToken`

### Description
This endpoint validates a JWT token. If the token is valid, it returns a confirmation message. The validation process is handled automatically using Spring Security.

### Parameters
- **Authentication**: Automatically handled by Spring Security and contains the token details required for validation.

### Request
No request body is required. The authentication token is passed automatically by Spring Security.

### Responses

#### 200 OK
The token is valid. A simple confirmation message is returned.

Example response:
```json
"token is valid"
```
---
## Additional Information

- **JWT Token Structure**:  
  The JWT token includes claims like `issuer`, `subject`, `email`, `issuedAt`, and `expiration` time. The token is signed using a secret key (`jwtSecret`).

- **OAuth2 Integration**:  
  OAuth2 login will automatically map users based on the email retrieved from the OAuth2 provider. If the user does not exist in the database, they will be created with a profile creation date.

# API Documentation: Customer Controller

This document provides a detailed description of the API endpoints available in the `CustomerController` class for managing customer-related operations.

## Endpoints

### `GET /customer/findById/{id}`

This endpoint retrieves a customer by their ID.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `id` (path): The ID of the customer to be fetched.

**Response:**
- 200 OK: Returns the customer data.
    ```json
    {
        "id": 1,
        "email": "kacper@polska.pl",
        "username": "kacper123"
    }
    ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or the customer is not found.
  ```json
  "Customer not found"
  ```
---

### `GET /customer/findByEmail/{email}`

This endpoint retrieves a customer by their email.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `email` (path): The email of the customer to be fetched.

**Response:**
- 200 OK: Returns the customer data.
    ```json
    {
        "id": 1,
        "email": "kacper@polska.pl",
        "username": "kacper123"
    }
    ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or the customer is not found.
  ```json
  "Customer not found"
  ```
---


### `POST /updateUsername`

This endpoint allows an authenticated user to update their username.

**Parameters:**
- `Authentication authentication`: Contains authentication details for the current user.
- `UpdateUsernameRequest request`: Contains the new username to be set.

**Request Body Example:**
```json
{
  "newUsername": "newUsername123"
}
```
**Response:**
- 200 OK: Returns a success message when the username is successfully updated.
  ```json
  "Username updated successfully"
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```
  If username is empty
  ```json
  "Username cannot be empty"
  ```
---

### `POST /updateBio`

This endpoint allows an authenticated user to update their biography.

**Parameters:**
- `Authentication authentication`: Contains authentication details for the current user.
- `UpdateBioRequest request`: Contains the new biography to be set.

**Request Body Example:**
```json
{
  "bio": "hello"
}
```
**Response:**
- 200 OK: Returns a success message when the username is successfully updated.
  ```json
  "Biography updated successfully"
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```
  If username is empty
  ```json
  "Biography cannot be empty"
  ```
---
### `POST /updateAvatar`

This endpoint allows an authenticated user to update their profile picture (avatar).

**Parameters:**
- `Authentication authentication`: Contains authentication details for the current user.
- `UpdateAvatarRequest request`: Contains the new avatar file to be uploaded.

**Request Body Example:**
```json
{
    "avatar": "<MultipartFile>"
}
```
**Response:**
- 200 OK: Returns a success message when the profile picture is successfully updated.
  ```json
  "Profile picture updated successfully"
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

- 500 Internal server error:

  If the file upload fails due to an IO error:
  ```json
  "Failed to upload avatar"
  ```
---

### `GET /customer/findByUsername/{username}`

This endpoint retrieves a list of customers by their username.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `username` (path): The username of the customer to be searched.

**Response:**
- 200 OK: Returns a list of customers with the specified username.
  ```json
    [
      {
          "id": 1,
          "username": "john_doe",
          "email": "john.doe@example.com"
      },
      {
          "id": 2,
          "username": "jane_doe",
          "email": "jane.doe@example.com"
      }
    ]
    ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or customers are not found.
  ```json
  "Customers not found"
  ```
---

### `DELETE /customer/delete`

This endpoint deletes a customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Response:**
- 200 OK: Confirmation message that the customer was deleted.
  ```json
  "Customer deleted successfully"
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```
---

### `GET /customer/getSelf`

This endpoint retrieves the authenticated customer's data.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Response:**
- 200 OK: Returns the authenticated customer's data.
  ```json
    {
        "id": 1,
        "email": "kacper@polska.pl",
        "username": "kacper123",
        "accountExpired": false,
        "accountLocked": false,
        "credentialsExpired": false,
        "enabled": false,
        "profilePicturePath": "/profilePicture.png",
        "avatar": "<avatar_file>"
    }
    ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
---

### `GET /customer/getReceivedFriendships`

This endpoint retrieves a list of received friendships for the authenticated customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Response:**
- 200 OK: Returns a list of received friendships.
  ```json
    [
      {
          "id": 1,
          "senderId": 2,
          "ReceiverId": 3,
          "accepted": true
      },
      {
          "id": 2,
          "senderId": 3,
          "ReceiverId": 4,
          "accepted": false
      }
    ]
    ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```

---

### `GET /customer/getSentFriendships`

This endpoint retrieves a list of sent friendships for the authenticated customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Response:**
- 200 OK: Returns a list of sent friendships.
  ```json
    [
      {
          "id": 1,
          "senderId": 2,
          "ReceiverId": 3,
          "accepted": true
      },
      {
          "id": 2,
          "senderId": 3,
          "ReceiverId": 4,
          "accepted": false
      }
    ]
    ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
---

### `GET /customer/getNotifications`

This endpoint retrieves a list of notifications for the authenticated customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Response:**
- 200 OK: Returns a list of notifications.
  ```json
    [
      {
          "id": 1,
          "userId": 2,
          "received": true,
          "text": "Hello",
          "ReceivedDate": "2025-01-04 14:23:45"
      },
      {
          "id": 2,
          "userId": 3,
          "received": false,
          "text": "Bye",
          "ReceivedDate": "2025-01-04 14:23:45"
      }
    ]
    ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
---

**Parameters:**
- `Authentication authentication`: Contains authentication details.

### `GET /customer/getRootFolder`

This endpoint retrieves the root folder of the authenticated customer.

**Response:**
- 200 OK: Returns the root folder data.
  ```json
  {
    "id": 1,
    "name": "MyFirstFolder",
    "children": 
      [
          {
            "id": 1,
            "name": "folder2"
          },
          {
            "id": 2,
            "name": "folder3"
          }
      ]   
  }
  ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
---

**Parameters:**
- `Authentication authentication`: Contains authentication details.

### `GET /customer/getFriends`

This endpoint retrieves a list of the authenticated customer's friends.

**Response:**
- 200 OK: Returns a list of friends.
  ```json
  [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john.doe@example.com",
      "avatar": "<avatar_file>"
    },
    {
      "id": 2,
      "username": "jane_doe",
      "email": "jane.doe@example.com",
      "avatar": "<avatar_file>"
    }
  ]
  ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
---

### `GET /customer/getFriendById/{id}`

This endpoint retrieves a friend by their ID.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `id` (path): The ID of the friend to be fetched.

**Response:**
- 200 OK: Returns the friend data.
  ```json
  {
    "id": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "avatar": "<avatar_file>"
  }
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or friend is not found.
  ```json
  "No friend with this id found"
  ```
---

### `GET /customer/getFriendByEmail/{email}`

This endpoint retrieves a friend by their email.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `email` (path): The email of the friend to be fetched.

**Response:**
- 200 OK: Returns the friend data.
  ```json
  {
    "id": 1,
    "username": "john_doe",
    "email": "john.doe@example.com",
    "avatar": "<avatar_file>"
  }
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or friend is not found.
  ```json
  "No friend with this id found"
  ```
---

### `POST /customer/sendFriendshipOfferById/{id}`

This endpoint sends FriendShip offer to the other customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `id` (path): The id of the customer to whom the friendship offer wil be sent.

**Response:**
- 200 OK: Returns the friendship data and notification data.
  ```json
    {
    "friendship":
      {
          "id": 2,
          "senderId": 3,
          "ReceiverId": 4,
          "accepted": false
      }
    ,
    "notification":
      {
          "id": 1,
          "userId": 2,
          "received": true,
          "text": "Hello",
          "ReceivedDate": "2025-01-04 14:23:45"
      }
  }
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this id found"
  ```

  or friend is not found.
  ```json
  "No friend with this id found"
  ```

  or user tries to send friend request to himself
  ```json
  "You cannot send friendship request to yourself"
  ```
---

### `POST /customer/sendFriendshipOfferByEmail/{email}`

This endpoint sends FriendShip offer to the other customer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `email` (path): The email of the customer to whom the friendship offer wil be sent.

**Response:**
- 200 OK: Returns the friendship data and notification data.
  ```json
    {
    "friendship":
      {
          "id": 2,
          "senderId": 3,
          "ReceiverId": 4,
          "accepted": false
      }
    ,
    "notification":
      {
          "id": 1,
          "userId": 2,
          "received": true,
          "text": "Hello",
          "ReceivedDate": "2025-01-04 14:23:45"
      }
  }
  ```
- 400 Bad Request:

  If the user is not authenticated:
  ```json
  "No user with this email found"
  ```

  or friend is not found.
  ```json
  "No friend with this id found"
  ```

  or user tries to send friend request to himself
  ```json
  "You cannot send friendship request to yourself"
  ```
---

### `POST acceptFriendshipOfferById/{id}`

This endpoint accepts the friendship offer.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `id`: Friendship id.

**Response:**
- 200 OK: Returns the friendship data.
  ```json
    {
        "id": 1,
        "senderId": 2,
        "ReceiverId": 3,
        "accepted": true
    }
  ```
- 400 Bad Request:

  If the user is not authenticated.
  ```json
  "No user with this id found"
  ```
  or friendship is not found
  ```json
  "No friendship with this id found"
  ```
  or user is not a receiver of the friendship offer
  ```json
  "You are not the receiver of the friendship, you cannot accept it."
  ```
---

## Error Responses

All endpoints return a `400 Bad Request` response if the user is not authenticated or if the requested resource is not found. The response will include a message indicating the error (e.g., "No user with this id found").

---

## Authentication

All endpoints require the user to be authenticated. Authentication is performed using the email of the logged-in user.

## JSON Views

The responses include a JSON view configuration that controls the data fields included in the response, as defined in `JsonViewConfig.Public` and `JsonViewConfig.Internal`.

# API Documentation: Deck Controller

This document provides a detailed description of the API endpoints available in the `DeckController` class for managing decks in the Flashcards application.

## Endpoints

### `GET /deck/flashcards`

This endpoint retrieves flashcards from a specified deck.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `page` (query): The page number for pagination (default: 0).
- `size` (query): The number of items per page (default: 5).
- `sortBy` (query): The field to sort by (default: `id`).
- `ascending` (query): Whether to sort in ascending order (default: `true`).
- `deckId` (query): The ID of the deck from which to retrieve the flashcards.

**Response:**
- 200 OK: Returns a list of flashcards from the specified deck.
  ```json
  [
    {
      "id": 1,
      "deckId": 2,
      "front": "apple",
      "back": "jabłko"
    },
    {
      "id": 2,
      "deckId": 2,
      "front": "banana",
      "back": "banan"
    }
  ]
  ```

- 400 Bad Request:

If the user does not have access to the deck
  ```json
  "You do not have access to this deck"
  ```


or if the deck does not exist.
  ```json
  "Error message from the exception (e.g., 'Deck not found')"
  ```
---

### `GET /deck/getLastUsed`

This endpoint allows you to retrieve the most recently used decks

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `int howMany (default=3)`: Number of decks to be returned.

**Response:**
- 200 OK: Returns a list of last used decks.
  ```json
  [
    {
      "id": 1,
      "name": "Deck 1"
    },
    {
      "id": 2,
      "name": "Deck 2"
    }
  ]
  ```

- 400 Bad Request:

If the user is not found
  ```json
  "Customer not found"
  ```
or if the 'howMany' parameter is less or equal to 0.
  ```json
  "howMany must be greater than 0"
  ```
---

### `POST /deck/create`

This endpoint creates a new deck in a folder.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Request Body:**
  ```json
    {
  "folderId": 1,
  "name": "fruits"
}
  ```
---

**Response:**
- 200 OK: Returns the created deck.
  ```json
  {
    "id": 1,
    "name": "fruits"
  }
  ```
- 400 Bad Request:

If the user is not authenticated.
  ```json
  "No user with this id found"
  ```

or if the user does not have permission to create a deck in the specified folder
  ```json
  "You do not have permission to create a deck here"
  ```
---
or if the folder does not exist.
  ```json
  "No folder with this id found"
  ```
---

### `POST /deck/update`

This endpoint updates the name of an existing deck.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Request Body:**
  ```json
    {
  "deckId": 1,
  "name": "vegetables"
}
  ```

**Response:**
- 200 OK: Returns the updated deck.
  ```json
  [
    {
      "id": 1,
      "deckId": 2,
      "front": "apple",
      "back": "jabłko"
    },
    {
      "id": 2,
      "deckId": 2,
      "front": "banana",
      "back": "banan"
    }
  ]
  ```
400 Bad Request:

If the user is not authenticated.
  ```json
  "No user with this id found"
  ```

or if the user does not have permission to update the deck
  ```json
  "You do not have permission to update this deck"
  ```
---
or if the deck does not exist.
  ```json
  "No deck with this id found"
  ```
---

### `DELETE /deck/delete`

This endpoint deletes a specified deck.

**Parameters:**
- `Authentication authentication`: Contains authentication details.
- `deckId` (query): The ID of the deck to delete.

**Response:**
- 200 OK:

Confirmation message that the deck was deleted.
```json
  "deck deleted"
  ```
- 400 Bad Request:

If the user does not have permission to delete the deck
  ```json
  "You do not have permission to delete this deck"
  ```
or if the deck does not exist.
  ```json
  "No deck with this id found"
  ```
---

## Error Responses

All endpoints return a `400 Bad Request` response under the following circumstances:
- The user does not have the required permissions to access, create, update, or delete the deck.
- The deck or folder does not exist.
- Any other validation failure related to the input or authentication.

---

## Authentication

All endpoints require the user to be authenticated. Authentication is performed using the user's credentials (e.g., username and password). The user's access level (OWNER, EDITOR, etc.) determines their permissions for each operation.

---

## Access Levels

- **OWNER**: Full permissions to manage the deck.
- **EDITOR**: Permissions to modify the deck.
- **VIEWER**: No permissions to modify or delete the deck.

---

# API Documentation

## GET `/deck/getDeck`

### Description
Retrieves a deck by its ID if the authenticated user has the appropriate access level.

### Parameters
- **Authentication**: Automatically handled by Spring Security, representing the authenticated user's credentials.
- **deckId** (required, integer): The ID of the deck to retrieve.

### Request
No request body is required. The `deckId` is passed as a query parameter.

### Responses

#### 200 OK
The user has the appropriate access level, and the deck is successfully retrieved.

Example response:
```json
{
  "id": 123,
  "name": "Deck Name",
  "cards": 
  [
    { 
      "id": 1, 
      "question": "Question 1", 
      "answer": "Answer 1"
    },
    { 
      "id": 2, 
      "question": "Question 2", 
      "answer": "Answer 2"
    }
  ],
  "creationDate": "2025-01-01T12:00:00"
}
```
- 400 Bad Request:

If the user does not have permission to get the deck
  ```json
  "You do not have permission to get this deck"
  ```
---

# API Documentation

## GET `/deck/getDeckInfo`

### Description
Retrieves summary information about a specific deck by its ID. This endpoint verifies the user's access level to ensure they have permission to view the deck's details.

### Parameters
- **Authentication**: Automatically provided by Spring Security, containing the authenticated user's credentials.
- **deckId** (required, integer): The ID of the deck for which information is being requested.

### Request
No request body is required. The `deckId` parameter is passed as a query parameter.

### Responses

#### 200 OK
The user has the required access level, and the deck's information is returned.

Example response:
```json
{
  "customer":
  {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  },
  "deck": 
  {
    "id": 123,
    "name": "Sample Deck",
    "cardCount": 20,
    "creationDate": "2025-01-01T12:00:00"
  }
}
```
- 400 Bad Request:

If the user does not have permission to get the deck
  ```json
  "You do not have permission to get this deck"
  ```
or if deck is not found
  ```json
  "Deck with ID 123 not found"
  ```
---


# API Documentation: Demo Controller

This document provides a description of the API endpoint available in the `DemoController` class, which is used for testing secured endpoints and retrieving user information.

## Endpoints

### `GET /demo/this-is-secure`

This endpoint demonstrates a secured route where the user's email is extracted from the authentication token and returned in the response.

**Parameters:**
- `Authentication authentication`: Contains authentication details.

**Request:**
- The request requires authentication (either via UsernamePasswordAuthenticationToken or OAuth2AuthenticationToken).

**Response:**
- 200 OK:

Returns a message with the authenticated user's email.
```json
  "Your email is ..."
```
---

# API Documentation: Flashcard Controller

## Overview
The `FlashcardController` class is a REST controller for managing flashcards. It provides endpoints for creating, updating, deleting, copying, and moving flashcards between decks. The controller ensures proper access control through the `ResourceAccessService`.

## Dependencies
This class relies on the following repositories and services:

- `CustomerRepository`: Handles customer data.
- `DeckRepository`: Manages deck data.
- `FolderJpaRepository`: Handles folder data.
- `FlashcardRepository`: Manages flashcard data.
- `ResourceAccessService`: Provides access level checks for resources (decks and flashcards).
- `AccessLevel`: Enum representing access levels (e.g., OWNER, EDITOR, VIEWER).

## Endpoints
### 1. `@PostMapping("flashcard/create")`
#### Description
Creates a new flashcard in a specified deck.
#### Parameters
- `Authentication authentication`: Contains authentication details.

**Request Body:**
  ```json
    {
  "deckId": 1,
  "front": "vegetables",
  "back": "warzywa"
}
  ```

#### Response
- 200 OK:

Returns the created flashcard.

  ```json
    {
  "id": 1,
  "deckId": 1,
  "front": "vegetables",
  "back": "warzywa"
}
  ```
- 400 Bad Request:

Returns an error message if the user does not have the necessary access level or the deck is not found.
  ```json
  "You do not have permission to create a deck here"
  ```
---

### 2. `@PostMapping("flashcard/update")`
#### Description
Updates an existing flashcard.
#### Parameters
- `Authentication authentication`: Contains authentication details.

**Request Body:**
  ```json
    {
  "flashcardId": 1,
  "front": "vegetables",
  "back": "warzywa"
}
  ```
#### Response
- 200 OK:

Returns the updated flashcard.

```json
  {
  "id": 1,
  "deckId": 1,
  "front": "vegetables",
  "back": "warzywa"
}
```
- 400 Bad Request:

Returns an error message if the user does not have the necessary access level or the flashcard is not found.
  ```json
  "You do not have permission to create a deck here"
  ```
---

### 3. `@DeleteMapping("flashcard/delete")`
#### Description
Deletes a flashcard.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int flashcardId`: ID of the flashcard to delete.
#### Response
- 200 OK:

Returns a success message.
```json
"deleted successfully"
```
- 400: Returns an error message if the user does not have the necessary access level or the flashcard is not found.
```json
"Flashcard deleted successfully"
```
---

### 4. `@PostMapping("flashcard/copyFlashcardToDeck")`
#### Description
Copies a flashcard to another deck.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int deckId`: ID of the destination deck.
- `@RequestParam int flashcardId`: ID of the flashcard to copy.
#### Response
- 200 OK:

Returns a success message.
```json
"copied successfully"
```
- 400 Bad Request:

Returns an error message if the user does not have the necessary access level
for the deck or flashcard.
```json
"You do not have permission to add to this deck"
```

```json
"You do not have permission to add this flashcard"
```
---

### 5. `@PostMapping("flashcard/moveFlashcardToOtherDeck")`
#### Description
Moves a flashcard from one deck to another.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@RequestParam int sourceDeckId`: ID of the source deck.
- `@RequestParam int destinationDeckId`: ID of the destination deck.
- `@RequestParam int flashcardId`: ID of the flashcard to move.
#### Response
- 200 OK:

Returns a success message.
```json
"flashcard moved"
```

- 400 Bad Request:

Returns an error message if the user does not have the necessary access
level for the decks or flashcard, or if the flashcard is not in the source deck.
```json
"You do not have permission to edit this deck"
```
```json
"You do not have permission to move this flashcard"
```
```json
"Flashcard is not in source deck"
```

## Security
Access control is enforced using the `ResourceAccessService`. Only users with appropriate access levels (e.g., OWNER, EDITOR) can modify resources.

## Error Handling
Custom exceptions like `ResourceNotFoundException` are used to handle cases where decks or flashcards are not found.

## Annotations Used
- `@RestController`: Marks this class as a REST controller.
- `@RequestMapping`: Maps HTTP requests to handler methods.
- `@RequiredArgsConstructor`: Generates a constructor for the class's dependencies.

---

# API Documentation: FlashcardProgress Controller

## Overview
The `FlashcardProgressController` class is a REST controller responsible for managing flashcard progress data. It provides endpoints for retrieving flashcard progress entries.

## Dependencies
This class relies on the following repositories and entities:

- `CustomerRepository`: Used to fetch customer data.
- `FlashcardRepository`: Used to fetch flashcard data.
- `FlashcardProgressRepository`: Used to manage flashcard progress data.
- `AccessLevel`: Determines the access level of a user to a deck.
- `JsonViewConfig`: Configures JSON views.

## Endpoints
### 1. `@GetMapping("flashcardProgress/getFlashcardProgress/{id}")`
#### Description
Fetches the flashcard progress data for the given ID.
#### Parameters
- `Authentication authentication`: Contains authentication details.
- `@PathVariable int id`: ID of the flashcard progress to retrieve.
#### Response
- 200 OK:

Returns the flashcard progress data.
```json
  {
  "id": 1,
  "flashcardId": 1,
  "nextReview": "2025-01-04 14:23:45"
}
```
- 400 Bad Request:

Returns an error message if the user or flashcard progress is not found or
if the user does not have access.
```json
"No user with this id found"
```
```json
"No flashcard progress with this id found"
```
```json
"You dont have access to this flashcard"
```

## Error Handling
All endpoints validate the user's identity and access permissions. Error messages are returned for invalid operations such as unauthorized access or non-existent entities.

## Annotations Used
- `@RestController`: Marks this class as a REST controller.
- `@RequestMapping`: Maps HTTP requests to handler methods.
- `@RequiredArgsConstructor`: Automatically generates a constructor with required dependencies.
- `@JsonView`: Controls the JSON output view.

## Security
Authentication is managed through Spring Security's `Authentication` object, which retrieves the currently authenticated user's email.

# API Documentation: Folder

The `FolderController` handles folder-related operations for a flashcard application. It provides endpoints to manage folders, including creating, updating, deleting, and retrieving folder structures.

## Base URL

`/folder`

## Endpoints

### 1. **Get Folder Structure**
Retrieves the folder structure of the authenticated user.

- **URL:** `/getFolderStructure`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `page` (int, optional, default: `0`) - The page number for pagination.
  - `size` (int, optional, default: `5`) - The size of each page.
  - `sortBy` (String, optional, default: `id`) - The field to sort by.
  - `ascending` (boolean, optional, default: `true`) - Sorting order.
- **Response:**

  **200 OK:**
  The root folder structure of the authenticated user.
  ```json
  {
    "id": 1,
    "name": "Folder1"
  }
  ```
  **400 Bad Request** - No user found.
  ```json
  "No user with this id found"
  ```
---

### 2. **Create Folder**
Creates a new folder for the authenticated user under a specified parent folder.

- **URL:** `/create`
- **Method:** `POST`
- **Parameters:**
  - `Authentication authentication`

  **Request Body:**
  ```json
    {
      "name": "Folder1",
      "parentId": 2 
    }
  ```
- **Response:**

  **200 OK:**
  The root folder structure of the authenticated user.
  ```json
  "folder created!"
  ```
  **400 Bad Request** - No permission to create folder.
  ```json
  "You do not have permission to create a folder here"
  ```
---

### 3. **Update Folder**
Updates an existing folder.

- **URL:** `/update`
- **Method:** `POST`
- **Parameters:**
  - `Authentication authentication`

  **Request Body:**
  ```json
    {
      "id": 1,
      "name": "Folder1" 
    }
  ```
- **Response:**

  **200 OK:**
  The root folder structure of the authenticated user.
  ```json
  "folder updated!"
  ```
  **400 Bad Request** - No permission to update the folder.
  ```json
  "You do not have permission to update this folder"
  ```
---

### 4. **Delete Folder**
Deletes a folder by ID.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
  - `Authentication authentication`
  - `folderId` (int) - The ID of the folder to delete.
- **Response:**

  **200 OK:**
  The root folder structure of the authenticated user.
  ```json
  "folder deleted!"
  ```
  **400 Bad Request** - No permission to delete the folder or attempt to delete the root folder.
  ```json
  "You do not have permission to update this folder"
  ```
  ```json
  "You cannot delete the root folder"
  ```
---

### 5. **Get Decks in Folder**
Retrieves all decks in a specified folder.

- **URL:** `/getDecks`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `page` (int, optional, default: `0`) - The page number for pagination.
  - `size` (int, optional, default: `5`) - The size of each page.
  - `sortBy` (String, optional, default: `id`) - The field to sort by.
  - `ascending` (boolean, optional, default: `true`) - Sorting order.
  - `folderId` (int) - The ID of the folder.
- **Response:**

  **200 OK** - List of decks in the folder.
  ```json
  [
    {
      "id": 1,
      "name": "deck1"
    },
    {
      "id": 2,
      "name": "deck2"
    }
  ]
  ```
  **400 Bad Request** - Folder not found, invalid sort field, or insufficient permissions.
  ```json
  "Folder not found"
  ```
  ```json
  "Invalid sort field"
  ```
  ```json
  "You do not have permission to view this folder"
  ```
---
### 6. **Get Folder Children**
Retrieves all child folders of a specified folder.

- **URL:** `/children`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `folderId` (int) - The ID of the folder.
- **Response:**

  **200 OK** - List of child folders.
  ```json
  [
    {
      "id": 1,
      "name": "folder1"
    },
    {
      "id": 2,
      "name": "folder2"
    }
  ]
  ```
  **400 Bad Request** - Folder or user not found, or insufficient permissions
  "Folder not found"
  ```json
  "Folder not found"
  ```
  ```json
  "User not found"
  ```
  ```json
  "You do not have permission to view this folder"
  ```
---

### 7. **Get Folder Access Levels**
Retrieves access levels for a specified folder.

- **URL:** `/accessLevels`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `folderId` (int) - The ID of the folder.
- **Response:**

  **200 OK** - Access levels for the folder.
  ```json
  [
    {
      "id": 1,
      "customerId": 3,
      "AccessLevel": "VIEWER"
    },
    {
      "id": 2,
      "customerId": 4,
      "AccessLevel": "EDITOR"
    }
  ]
  ```

  **400 Bad Request** - Folder or user not found, or insufficient permissions
  "Folder not found"
  ```json
  "Folder not found"
  ```
  ```json
  "User not found"
  ```
  ```json
  "You do not have permission to view this folder"
  ```
---
### Get Decks Information

Retrieves a paginated list of decks for a specific folder, based on the user's access level.

- **URL:** `/getDecksInfo`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication` (automatic) - The authentication object representing the currently logged-in user.
  - `page` (int, optional, default: `0`) - The page number for pagination.
  - `size` (int, optional, default: `5`) - The size of each page.
  - `sortBy` (String, optional, default: `id`) - The field to sort the decks by.
  - `ascending` (boolean, optional, default: `true`) - Determines if sorting is in ascending (`true`) or descending (`false`) order.
  - `folderId` (int, required) - The ID of the folder to fetch decks from.

- **Response:**
  - **200 OK:**
    Returns a paginated list of decks in the specified folder.
    ```json
     [
       {
         "id": 1,
         "name": "deck1",
         "progress": 0.0,
         "newCards": 3,
         "toReview": 0,
         "totalCards": 3,
         "learnedCards": 0
       },
       {
         "id": 2,
         "name": "deck2",
         "progress": 0.0,
         "newCards": 3,
         "toReview": 0,
         "totalCards": 3,
         "learnedCards": 0
       }
     ]
    ```
  - **400 Bad Request:**
    - If the folder ID does not exist:
      ```json
      "Folder with the given ID does not exist."
      ```
    - If the user does not have permission to view the folder:
      ```json
      "You do not have permission to view this folder."
      ```
    - If the `sortBy` parameter is invalid:
      ```json
      "Invalid sort field, cannot sort by: <sortBy>"
      ```

- **Access Control:**  
  Only users with `EDITOR` or `OWNER` access levels for the folder can view the decks.

- **Error Handling:**
  - Throws `ResourceNotFoundException` if the folder ID is invalid.
  - Returns an appropriate error message for invalid sort parameters or insufficient permissions.
---

  
## Notes
- Access level checks ensure that only authorized users can perform actions on folders.
- Pagination and sorting options are supported for fetching folders and decks.
- JSON views are used to control the visibility of sensitive data.

---

# API Documentation: FriendshipController

The `FriendshipController` manages friendships between users in the flashcard application. It allows for creating, retrieving, updating, and deleting friendships.

## Base URL

`/friendship`

## Endpoints

### 1. **Get Friendship**
Retrieves details of a specific friendship by its ID.

- **URL:** `/getFriendship/{id}`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `id` (int) - The ID of the friendship to retrieve.
- **Response:**

  **200 OK** - Details of the friendship.
  ```json
  {
    "id": 1,
    "senderId": 3,
    "receiverId": 4,
    "accepted": true
  }
  ```
  **400 Bad Request** - Friendship or user not found, or user does not have access.
  ```json
  "No friendship with this id found"
  ```
  ```json
  "No user with this id found"
  ```
  ```json
  "User do not have access to this friendship"
  ```
---

### 2. **Delete Friendship**
Deletes an existing friendship.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
  - `Authentication authentication`
  - `friendshipId` (int) - The ID of the friendship to delete.
- **Response:**

  **200 OK** - Friendship deleted successfully.
  ```json
  "Friendship deleted successfully"
  ```
  **400 Bad Request** -  Friendship or user not found, or user does not have access.
  ```json
  "No friendship with this id found"
  ```
  ```json
  "No user with this id found"
  ```
  ```json
  "User do not have access to this friendship"
  ```
---
## Notes
- Only the sender or receiver of a friendship can access or modify it.
- All actions require authentication.
- Friendships can only be created, updated, or deleted by authorized users.
- JSON views ensure that only relevant data is exposed in the response.

---

# API Documentation: Notification

The `NotificationController` handles the management of user notifications in the flashcard application. It provides endpoints to retrieve, create, update, and delete notifications.

## Base URL

`/notification`

## Endpoints

### 1. **Get Notification**
Retrieves a specific notification by its ID.

- **URL:** `/getNotification/{id}`
- **Method:** `GET`
- **JSON View:** `JsonViewConfig.Public`
- **Parameters:**
  - `Authentication authentication`
  - `id` (int) - The ID of the notification to retrieve.
- **Response:**

  **200 OK** - The requested notification.
  ```json
  {
    "id": 1,
    "userId": 3,
    "received": true,
    "text": "Hello World",
    "receivedDate": "2025-01-04 14:23:45"
  }
  ```
  **400 Bad Request** - Notification or user not found, or the notification does not belong to the user.
  ```json
  "No notification with this id found"
  ```
  ```json
  "No user with this id found"
  ```
  ```json
  "This notification does not belong to the user"
  ```
---

### 2. **Create Notification**
Creates a new notification for a user.

- **URL:** `/create`
- **Method:** `POST`
- **Parameters:**
  - `Authentication authentication`
- **Request Body:**
  ```json
    {
      "userId": 1,
      "text": "Hello World"
    }
  ```
- **Response:**

  **200 OK** - Notification created successfully.
  ```json
  {
    "id": 1,
    "userId": 3,
    "received": true,
    "text": "Hello World",
    "receivedDate": "2025-01-04 14:23:45"
  }
  ```
  **400 Bad Request** - User not found or user tries to send notification to himself.
  ```json
  "No user with this id found"
  ```
  ```json
  "You cannot send notification to yourself"
  ```
---

### 3. **Delete Notification**
Deletes a specific notification by its ID.

- **URL:** `/delete`
- **Method:** `DELETE`
- **Parameters:**
  - `Authentication authentication`
  - `notificationId` (int) - The ID of the notification to delete.
- **Response:**
  **200 OK** - Notification deleted successfully.
  ```json
  "Notification deleted successfully"
  ```
  **400 Bad Request** -  Notification or user not found, or the notification does not belong to the user.
  ```json
  "No notification with this id found"
  ```
  ```json
  "No user with this id found"
  ```
  ```json
  "This notification does not belong to the user"
  ```
---

## Notes
- Notifications are user-specific, and actions can only be performed by the owner of the notification.
- All actions require authentication.
- Validation checks are performed to ensure notifications belong to the authenticated user.

---

# API Documentation PdfGeneratorController

The `PdfGeneratorController` handles the generation of PDF files for decks. It provides an endpoint to generate and download a PDF containing information about a specified deck.

## Endpoints

### 1. **Generate PDF**
Generates a PDF document for a specific deck by its ID.

- **URL:** `/generatePdf/{id}`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication`
  - `id` (int) - The ID of the deck for which the PDF will be generated.
- **Response:**

  **200 OK** - Returns a byte array containing the PDF file. Includes headers for file download.
  - `Content-Disposition`: `attachment; filename={deckName}.pdf`
  - `Content-Type`: `application/pdf`

  **400 Bad Request** - User with the specified ID was not found.
  ```json
  "No user with this id found"
  ```
  **403 Forbidden** - User with the specified ID was not found.
  ```json
  "You do not have access to this deck"
  ```
  **404 Not Found** - Deck with the specified ID was not found.
  ```json
  "No deck with this id found"
  ```
---

# API Documentation TxtGeneratorController

The `TxtGeneratorController` handles the generation of TXT files for decks. It provides an endpoint to generate and download a TXT containing information about a specified deck.

## Endpoints

### 1. **Generate TXT**
Generates a TXT document for a specific deck by its ID.

- **URL:** `/generateTxt/{id}`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication`
  - `id` (int) - The ID of the deck for which the TXT will be generated.
- **Response:**

  **200 OK** - Returns a byte array containing the TXT file. Includes headers for file download.
  - `Content-Disposition`: `attachment; filename={deckName}.txt`
  - `Content-Type`: `application/txt`

  **400 Bad Request** - User with the specified ID was not found.
  ```json
  "No user with this id found"
  ```
  **403 Forbidden** - User with the specified ID was not found.
  ```json
  "You do not have access to this deck"
  ```
  **404 Not Found** - Deck with the specified ID was not found.
  ```json
  "No deck with this id found"
  ```
---

# API Documentation TxtLoaderController

The `TxtLoaderController` handles the loading of deck data from a specified TXT file. It provides an endpoint for uploading a TXT file, validating the data, and loading it into a specific folder associated with the authenticated user.

## Endpoints

### 1. **Load Deck from TXT**

Loads deck data from a specified TXT file and associates it with a folder.

- **URL:** `/loadDeckTxt`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "filePath": "string", 
    "folderId": "int"      
  }
  ```
- **Parameters:**
  - `Authentication authentication`
- **Response:**

  **200 OK** - Returns deck object. 
  ```json
  [
    {
      "id": 1,
      "deckId": 2,
      "front": "apple",
      "back": "jabłko"
    },
    {
      "id": 2,
      "deckId": 2,
      "front": "banana",
      "back": "banan"
    }
  ]
  ```

  **400 Bad Request** - User with the specified ID was not found.
  ```json
  "No user with this id found"
  ```
  **403 Forbidden** - User has no access the folder.
  ```json
  "You do not have access to this deck"
  ```
  **404 Not Found** - Folder with the specified ID was not found.
  ```json
  "No folder with this id found"
  ```
---

## Implementation Details
- The endpoint uses the `PdfGenerator` service to generate a PDF based on the data contained in the specified `Deck`.
- HTTP headers are set to:
  - Trigger a file download with the name `{deckName}.pdf`.
  - Indicate the file type as a PDF.
- If the deck with the given ID does not exist, a `404 Not Found` status is returned.

---

# API Documentation: Review Controller

The `ReviewController` manages operations related to reviewing flashcards, including retrieving flashcards to review and updating review results.

---

## Endpoints

### `GET /reviewDeck`

This endpoint retrieves a batch of flashcards from a deck and allows the user to review them. The user must have the necessary access to the deck.

**Parameters:**
- `Authentication authentication`: Contains authentication details for the current user.
- `int deckId`: The ID of the deck to review.
- `int batchSize`: The number of flashcards to retrieve in the batch (default value is 10).

**Response:**
- 200 OK: Returns the flashcards in the deck for the user to review.
  ```json
  {
    "flashcards": [
      {
        "flashcardId": 101,
        "front": "apple",
        "back": "jablko"
      },
      {
        "flashcardId": 102,
        "front": "banana",
        "back": "banan"
      }
    ]
  }
  ```
- 400 Bad Request: If the batch size is less than 10, or if the user does not have permission to access the deck.
  ```json
  "Batch size must be at least 10"
  ```
  ```json
  "You do not have access to this deck"
  ```

## Security Considerations
- **Authentication:** Required for all endpoints.
- **Authorization:** Ensures that users can only access flashcards and decks for which they have permission.
- All endpoints enforce strict ownership checks to ensure data privacy.

---

## Notes
- The `ReviewController` endpoints are designed to ensure seamless integration with user authentication and resource-level access control.
- Responses include error messages for unauthorized or invalid access attempts, promoting secure use of the API.

---
### `POST /flashcardReviewed`

This endpoint allows the authenticated user to mark a flashcard as reviewed and update the information about it based on the user's answer.

**Parameters:**
- `Authentication authentication`: Contains authentication details of the currently logged-in user.
- `FlashcardsReviewedRequest reviewResponse`: Contains the `flashcardId` of the flashcard being reviewed and the user's answer (`userAnswer`).

**Request Body:**
```json
{
  "flashcardId": 123,
  "userAnswer": "<user_answer_enum>"
}
```
- 200 OK: Flashcard has been successfully reviewed.
  ```json
  "Flashcard reviewed."
  ```
- 400 Bad Request: If the batch size is less than 10, or if the user does not have permission to access the deck.
  ```json
  "Batch size must be at least 10"
  ```
  ```json
  "You do not have access to this flashcard"
  ```

# API Documentation: ReviewLogController

The `ReviewLogController` manages operations on review logs, such as retrieval, creation, updating, and deletion. Each review log is associated with a specific flashcard and contains information about user reviews.

---

## Endpoints

### 1. **Get Review Log**
Retrieve a review log by its ID.

- **URL:** `/reviewLog/getReviewLog/{id}`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication`
  - `id` (int) - The ID of the review log to retrieve.
- **Response:**
  - **200 OK** - Returns the review log.
    ```json
    {
      "id": 1,
      "flashcardId": 3,
      "userId": 2,
      "when": "2025-01-04 14:23:45",
     "userAnswer": 1
    }
    ```
  - **400 Bad Request** - User not found or Review log not found or access denied to the flashcard.
    ```json
    "No User with this id found"
    ```
    ```json
    "No reviewLog with this id found"
    ```
    ```json
    "You do not have access to this flashcard"
    ```
---

### 2. **Delete Review Log**
Delete a review log by its ID.

- **URL:** `/reviewLog/delete`
- **Method:** `DELETE`
- **Parameters:**
  - `Authentication authentication`
  - `reviewLogId` (int) - ID of the review log to delete.
- **Response:**
  - **200 OK** - Confirms successful deletion.
    ```json
    "ReviewLog deleted successfully"
    ```
  - **400 Bad Request** - User not found or Review log not found or access denied to the flashcard.
    ```json
    "No User with this id found"
    ```
    ```json
    "No reviewLog with this id found"
    ```
    ```json
    "This reviewLog does not belong to the user"
    ```
---

# API Documentation: UserPreferencesController

The `UserPreferencesController` manages the user preferences, including actions such as retrieving, creating, updating, and deleting user preferences. Each set of user preferences is associated with a specific user.

---

## Endpoints

### 1. **Get User Preferences**
Retrieve a user's preferences.

- **URL:** `/userPreferences/getUserPreferences`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication`
- **Response:**
  - **200 OK** - Returns the user preferences.
    ```json
    {
      "id": 1,
      "userId": 3,
      "darkMode": true,
      "language": 2
    }
    ```
  - **400 Bad Request** - User not found, UserPreferences not found, User preferences do not belong to the authenticated user.
    ```json
    "No User with this id found"
    ```
---

### 2. **Update User Preferences**
Update an existing user's preferences.

- **URL:** `/userPreferences/update`
- **Method:** `POST`
- **Parameters:**
  - `Authentication authentication`
- **Request Body:**
```json
{
  "userPreferencesId": 1,
  "darkMode": false,
  "language": 1
}
```
- **Response:**
  - **200 OK** - Returns the updated user preferences.
    ```json
    {
      "id": 1,
      "userId": 3,
      "darkMode": true,
      "language": 2
    }
    ```
  - **400 Bad Request** - User not found, UserPreferences not found, User preferences do not belong to the authenticated user.
    ```json
    "No User with this id found"
    ```
    ```json
    "No UserPreferences with this id found"
    ```
    ```json 
    "UserPreferences do not belong to the user"
    ```
---

## Security Considerations
- Authentication is required for all endpoints.
- Ensures that user preferences belong to the authenticated user before allowing access or modifications.

---

# API Documentation: UserStatistics Controller

The `UserStatisticsController` handles operations for managing user statistics, including retrieving, creating, updating, and deleting user statistics records.

---

## Endpoints

### 1. **Get User Statistics**
Retrieve the statistics for the user.

- **URL:** `/userStatistics/getUserStatistics`
- **Method:** `GET`
- **Parameters:**
  - `Authentication authentication`
- **Response:**
  - **200 OK** - Returns the user statistics object.
    ```json
    {
      "id": 1,
      "userId": 3,
      "totalTimeSpent": 100,
      "loginCount": 2,
      "lastLogin": "2025-01-04 14:23:45"
    }
    ```
  - **400 Bad Request**:  User not found, User statistics not found, User statistics do not belong to the authenticated user.
    ```json
    "No User with this id found"
    ```
---

### 2. **Update User Statistics**
Update an existing user statistics record.

- **URL:** `/userStatistics/update`
- **Method:** `POST`
- **Parameters:**
  - `Authentication authentication`
- **Request Body:**
  ```json
  {
      "userStatisticsId": 1,
      "totalTimeSpent": 3,
      "loginCount": 2,
      "lastLogin": "2025-01-04 14:23:45"
  }
  ```

- **Response:**
  - **200 OK**:  Returns the updated user statistics object.
  - **400 Bad Request**: User not found, User statistics not found, User statistics do not belong to the authenticated user.
    ```json
    "No User with this id found"
    ```
    ```json
    "No UserStatistics with this id found"
    ```
    ```json 
    "This UserStatistics do not belong to the user"
    ```
---
