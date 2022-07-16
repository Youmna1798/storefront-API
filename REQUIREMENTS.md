# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

###  API Endpoints
#### session_leads

- Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - list all leads
  * http://localhost:3000/leads

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id
  * Usage             - list a specific lead
  * http://localhost:3000/leads/:id
 

- Create
  * Method           -  POST
  * Authorization required    - No
  * Parameters        - name, email, password
  * Usage             -  create a new lead
  * http://localhost:3000/leads


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, password
  * Usage             -  edit an exciting lead
  * http://localhost:3000/leads

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting lead
  * http://localhost:3000/leads

#### students

- Index 
  * Method           -  GET
  * Authorization required    -Bearer <token>
  * Parameters        - none
  * Usage             - list all students
  * http://localhost:3000/students

- Show 
  * Method           -  GET
  * Authorization required    -Bearer <token>
  * Parameters        - id
  * Usage             - list a specific students
  * http://localhost:3000/students/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - name
  * Usage             -  create a new student
  * http://localhost:3000/students


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, name
  * Usage             -  edit an exciting student
  * http://localhost:3000/students

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting student
  * http://localhost:3000/students

#### sessions

- Index 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - none
  * Usage             - list all sessions
  * http://localhost:3000/sessions

- Show 
  * Method           -  GET
  * Authorization required    - Bearer <token>
  * Parameters        - id
  * Usage             - list a specific session
  * http://localhost:3000/sessions/:id
 

- Create
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        - date, tilte, sl_id
  * Usage             -  create a new session
  * http://localhost:3000/sessions


- Update
  * Method           -  PUT
  * Authorization required    - Bearer <token>
  * Parameters        -  id, date, title, sl_id
  * Usage             -  edit an exciting session
  * http://localhost:3000/sessions

- Delete
  * Method           -  DELETE
  * Authorization required    - Bearer <token>
  * Parameters        -  id
  * Usage             -  Delete an exciting session
  * http://localhost:3000/sessions

- addProduct
  * Method           -  POST
  * Authorization required    - Bearer <token>
  * Parameters        -  studentId, sessionId
  * Usage             - Add students to an existing sessions
  * http://localhost:3000/sessions/:id/student
  

### Data Schema
#### session_lead Table

| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | UNIQUE |
| password | VARCHAR(150) |

#### students Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| sl_id | INT | NOT NULL | REFERENCES sessions_lead(id) |

#### session Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| date | DATE | |
| title | VARCHAR(150) |  |
| sl_id | INT | REFERENCES sessions_lead(id) |


#### student_sessions Table
| Data | Data Types | Constraints  |
| ------------------ | ------------------ |  ------------------ |
| id | SERIAL | PRIMARY KEY |
| session_id | INTEGER | REFERENCES sessions(id) |
| student_id | INTEGER | REFERENCES students(id) |

