# **Ticketing System API Specification**

This document outlines the REST API endpoints, expected request payloads, and strict Role-Based Access Control (RBAC) implementations for the backend help desk service. The system utilizes a predefined user schema consisting of three roles: **customer**, **admin**, and **agent**.  
Base URL: http://localhost:3000

 

## **1\. Authentication Endpoints**

Manages user onboarding and session token generation.

### **1.1 Register New User**

**POST** /api/auth/users/register

{  
 "name": "string",  
 "email": "string",  
 "password": "string",  
 "role": "customer" // Valid inputs: customer, admin, agent  
}

| Status Code  | Condition                                          |
| :----------- | :------------------------------------------------- |
| 201 Created  | Users successfully registered across any role.     |
| 409 Conflict | The specified email address is already registered. |

 

### **1.2 Login User**

**POST** /api/auth/users/login

{  
 "email": "string",  
 "password": "string"  
}

| Status Code      | Condition                                       |
| :--------------- | :---------------------------------------------- |
| 200 OK           | Authentication successful; returns JWT payload. |
| 401 Unauthorized | Invalid credentials provided.                   |

 

## **2\. Ticket Endpoints**

Manages the core lifecycle of help desk tickets.

### **2.1 Create Ticket**

**POST** /api/tickets/createTicket  
**Auth Required:** Yes

{  
 "title": "string",  
 "description": "string",  
 "priority": "string", // e.g., "medium"  
 "status": "string" // e.g., "open"  
}

| Role          | Status Code   | Notes                                                               |
| :------------ | :------------ | :------------------------------------------------------------------ |
| Customer      | 201 Created   | Ticket created successfully. Missing fields return 400 Bad Request. |
| Admin / Agent | 403 Forbidden | Staff are strictly prevented from initiating tickets.               |

 

### **2.2 Get Tickets**

**GET** /api/tickets/getTickets  
**Auth Required:** Yes

| Role          | Status Code | Response Data                                      |
| :------------ | :---------- | :------------------------------------------------- |
| Customer      | 200 OK      | Returns only tickets owned by the requesting user. |
| Admin / Agent | 200 OK      | Returns all system tickets globally.               |

 

### **2.3 Update Ticket**

**PUT** /api/tickets/:ticketId  
**Auth Required:** Yes

{  
 "title": "string",  
 "description": "string",  
 "status": "string",  
 "priority": "string"

}

| Role      | Status Code | Notes                                                                           |
| :-------- | :---------- | :------------------------------------------------------------------------------ |
| All Roles | 200 OK      | Customers, Agents, and Admins are uniformly authorized to update ticket fields. |

 

### **2.4 Delete Ticket**

**DELETE** /api/tickets/:ticketId  
**Auth Required:** Yes

| Role             | Status Code   |
| :--------------- | :------------ |
| Admin            | 200 OK        |
| Customer / Agent | 403 Forbidden |

 

## **3\. Comment Endpoints**

Facilitates internal communication regarding active tickets.

### **3.1 Add Comment**

**POST** /api/tickets/:ticketId/comments/addComments  
**Auth Required:** Yes

{  
 "message": "string"  
}

| Role          | Status Code   | Notes                                                                                                                       |
| :------------ | :------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| Admin / Agent | 201 Created   | Fails with 400 Bad Request if the message is empty. Invalid Ticket IDs trigger a 500 Server Error due to CastError routing. |
| Customer      | 403 Forbidden | Strictly prevented from adding comments.                                                                                    |

 

### **3.2 Get Comments**

**GET** /api/tickets/:ticketId/comments/getComments  
**Auth Required:** Yes

| Role          | Status Code   |
| :------------ | :------------ |
| Admin / Agent | 200 OK        |
| Customer      | 403 Forbidden |

### **3.3 API EndPoint Test Cases**

| Evt Variables \- {{URL}}:http//:localhost:3000          |            |                                                             |               |                                                                                                                                     |           |                                        |
| ------------------------------------------------------- | ---------- | ----------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------- |
| **Authentication Endpoints (/api/users)**               |            |                                                             |               |                                                                                                                                     |           |                                        |
| **Test Scenario**                                       | **Method** | **Endpoint URL**                                            | **User Type** | **JSON Body Payload**                                                                                                               | **token** | **Expected Status**                    |
| **Register New User**                                   | **POST**   | **{{URL}}/api/auth/users/register**                         | customer      | { "name": "customer", "email": "customer@customer.com", "password": "c\*\*\*\*\*\*", "role": "customer" }                           | Received  | 201 Created                            |
|                                                         |            |                                                             | admin         | { "name": "admin", "email": "admin@admin.com", "password": "\*\*\*\*\*\*", "role": "admin" }                                        | Received  | 201 Created                            |
|                                                         |            |                                                             | agent         | { "name": "agent", "email": "agent@agent.com", "password": "\*\*\*\*\*\*", "role": "agent" }                                        | Received  | 201 Created                            |
| **Register Existing User**                              | **POST**   | **{{URL}}/api/auth/users/register**                         | customer      | { "name": "customer", "email": "customer@customer.com", "password": "\*\*\*\*\*\*\*", "role": "customer" }                          | Received  | 409 Conflict                           |
|                                                         |            |                                                             | admin         | { "name": "admin", "email": "admin@admin.com", "password": "\*\*\*\*\*\*", "role": "admin" }                                        | Received  | 409 Conflict                           |
|                                                         |            |                                                             | agent         | { "name": "agent", "email": "agent@agent.com", "password": "\*\*\*\*\*\*", "role": "agent" }                                        | Received  | 409 Conflict                           |
| **Login Valid User**                                    | **POST**   | **{{URL}}/api/auth/users/login**                            | customer      | { "email": "customer@customer.com", "password": "c\*\*\*\*\*\*\*" }                                                                 | Received  | 200 OK (Returns JWT)                   |
|                                                         |            |                                                             | admin         | { "email": "admin@admin.com", "password": "\*\*\*\*\*" }                                                                            | Received  | 200 OK (Returns JWT)                   |
|                                                         |            |                                                             | agent         | { "email": "agent@agent.com", "password": "\*\*\*\*\*\*\*" }                                                                        | Received  | 200 OK (Returns JWT)                   |
| **Login Invalid Password**                              | **POST**   | **{{URL}}/api/auth/users/login**                            | customer      | { "email": "customer@customer.com", "password": "akhil" }                                                                           | NA        | 401 Unauthorized                       |
|                                                         |            |                                                             | admin         | { "email": "admin@admin.com", "password": "akhil" }                                                                                 | NA        | 401 Unauthorized                       |
|                                                         |            |                                                             | agent         | { "email": "agent@agent.com", "password": "akhil" }                                                                                 | NA        | 401 Unauthorized                       |
|                                                         |            |                                                             |               |                                                                                                                                     |           |                                        |
| **Ticket Endpoints (/api/tickets)**                     |            |                                                             |               |                                                                                                                                     |           |                                        |
| Test Scenario                                           | Method     | Endpoint URL                                                |               | JSON Body Payload                                                                                                                   |           | Expected Status                        |
| **Create Ticket (No Token) \- As Customer**             | **POST**   | **{{URL}}/api/tickets/createTicket**                        | customer      | { "title": "This is a test ticket title" }                                                                                          | NA        | 401 Unauthorized                       |
| **Create Ticket (Missing Data) \- As Customer**         | **POST**   | **{{URL}}/api/tickets/createTicket**                        | customer      | { "title": "This is a test ticket title" }                                                                                          | Sent      | 400 Bad Request                        |
| **Create Ticket (Valid) \- As Customer**                | **POST**   | **{{URL}}/api/tickets/createTicket**                        | customer      | { "title": "This is a test ticket title", "description": "This is the ticket description", "priority": "medium", "status": "open" } | NA        | 201 Created                            |
| **Create Ticket (Valid) \- As Agent**                   | **POST**   | **{{URL}}/api/tickets/createTicket**                        | agent         | { "title": "This is a test ticket title", "description": "This is the ticket description", "priority": "medium", "status": "open" } | Sent      | 403 Forbidden                          |
| **Create Ticket (Valid) \- As Admin**                   | **POST**   | **{{URL}}/api/tickets/createTicket**                        | admin         | { "title": "This is a test ticket title", "description": "This is the ticket description", "priority": "medium", "status": "open" } | Sent      | 403 Forbidden                          |
| **Get Tickets (As Agent)**                              | **GET**    | **{{URL}}/api/tickets/getTickets**                          | agent         | None                                                                                                                                | Sent      | 200 OK (All tickets)                   |
| **Get Tickets (As Customer)**                           | **GET**    | **{{URL}}/api/tickets/getTickets**                          | customer      | None                                                                                                                                | Sent      | 200 OK (Only own tickets)              |
| **Get Tickets (As Admin)**                              | **GET**    | **{{URL}}/api/tickets/getTickets**                          | admin         | None                                                                                                                                | Sent      | 200 OK (All tickets)                   |
| **Delete Ticket (As Customer)**                         | **DELETE** | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | customer      | None                                                                                                                                | Sent      | 403 Forbidden                          |
| **Delete Ticket (As Admin)**                            | **DELETE** | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | admin         | None                                                                                                                                | Sent      | 200 OK                                 |
| **Delete Ticket (As Agent)**                            | **DELETE** | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | agent         | None                                                                                                                                | Sent      | 403 Forbidden                          |
| **Update Ticket (As Agent)**                            | **PUT**    | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | agent         | { "title": "Updated Ticket Title", "description": "Updated Description", "status": "in-progress", "priority": "high" }              | Sent      | 200 OK                                 |
| **Update Ticket (As Admin)**                            | **PUT**    | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | admin         | { "title": "Updated Ticket Title_admin", "description": "Updated Description", "status": "in-progress", "priority": "high" }        | Sent      | 200 OK                                 |
| **Update Ticket (As Customer)**                         | **PUT**    | **{{URL}}/api/tickets/{{TICKET\_ID}}**                      | customer      | { "title": "Updated Ticket Title_cx", "description": "Updated Description", "status": "in-progress", "priority": "high" }           | Sent      | 200 OK                                 |
|                                                         |            |                                                             |               |                                                                                                                                     |           |                                        |
| **Comment Endpoints (/api/tickets/:ticketId/comments)** |            |                                                             |               |                                                                                                                                     |           |                                        |
| Test Scenario                                           | Method     | Endpoint URL                                                |               | JSON Body Payload                                                                                                                   |           | Expected Status                        |
| **Add Comment (Valid)**                                 | **POST**   | **{{URL}}/api/tickets/{{TICKET\_ID}}/comments/addComments** | agent         | { "message": "Investigating the issue" }                                                                                            | Sent      | 201 Created                            |
|                                                         |            |                                                             | customer      | { "message": "Investigating the issue" }                                                                                            | Sent      | 403 Forbidden                          |
|                                                         |            |                                                             | admin         | { "message": "Investigating the issue" }                                                                                            | Sent      | 201 Created                            |
| **Add Comment (Empty)**                                 | **POST**   | **{{URL}}/api/tickets/{{TICKET\_ID}}/comments/addComments** | agent         | { "message": "" }                                                                                                                   | Sent      | 400 Bad Request                        |
|                                                         |            |                                                             | admin         | { "message": "" }                                                                                                                   | Sent      | 400 Bad Request                        |
|                                                         |            |                                                             | customer      | { "message": "" }                                                                                                                   | Sent      | 403 Forbidden                          |
| **Add Comment (Bad Ticket ID)**                         | **POST**   | **{{URL}}/api/tickets/123invalid/comments/addComments**     | agent         | { "message": "Investigating the issue-BAD-TicketID" }                                                                               | Sent      | 500 Server Error (Mongoose cast error) |
|                                                         |            |                                                             | customer      | { "message": "Investigating the issue-BAD-TicketID" }                                                                               | Sent      | 403 Forbidden                          |
|                                                         |            |                                                             | admin         | { "message": "Investigating the issue-BAD-TicketID" }                                                                               | Sent      | 500 Server Error (Mongoose cast error) |
| **Get Ticket Comments**                                 | **GET**    | **{{URL}}/api/tickets/{{TICKET\_ID}}/comments/getComments** | customer      | None                                                                                                                                | Sent      | 403 Forbidden                          |
|                                                         |            |                                                             | agent         | None                                                                                                                                | Sent      | 200 OK                                 |
|                                                         |            |                                                             | admin         | None                                                                                                                                | Sent      | 200 OK                                 |
