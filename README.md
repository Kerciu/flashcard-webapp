# 📚 Palabra | Flashcard Web Application

## Project Overview

This Flashcard Web Application is designed to facilitate learning through digital flashcards. The application enables users to create, manage, and review flashcards using a spaced repetition algorithm to enhance knowledge retention. The project aims to provide an intuitive and effective tool for learners, allowing them to organize their study materials efficiently while leveraging modern web technologies.

## 👥 Team

This project was developed by a team of four developers, working collaboratively to integrate various technologies and implement a robust learning system. The team included:
- Kacper Górski 🖥️  
_Lead Frontend Developer & REST API Integration_  
Architected the React frontend and connected it to Spring Boot APIs.

- Julia Czosnek 🎨  
_UI/UX Designer & Database Architect_:  
Designed user interfaces and crafted the MySQL database schema.

- Marcin Polewski ⚙️  
_Backend Lead & DevOps Engineer_  
Built core Spring Boot services and managed Docker deployment pipelines.

- Maciej Cieślik 📄  
_Backend Developer & Technical Documentation Specialist_  
Implemented backend logic and maintained project documentation.

## 🛠️ Technologies Used

<img src="https://skillicons.dev/icons?i=react,spring,nodejs,mysql,git,docker" />

- **Spring** – Backend development and database management
- **React** – Frontend development
- **Node.js** – API handling and background processes
- **Docker** – Application containerization
- **Git** – Version control and team collaboration
- **MySQL** – Database management system

## ✨ Application Features

### 1. 🔐 User Authentication

- Secure login with email and password
- User registration via email
- Password recovery through email verification
- OAuth-based login via third-party authentication providers*

![Login screen](/docs/screenshots/login-screen.png "Authentication Page")

### 2. 📂 Flashcard Management

- Create, modify, and delete flashcards
- Organize flashcards into customizable folders
- Support for classic flashcard study modes
- Import and export functionality for flashcards in multiple formats (txt, pdf)

![Folder page](/docs/screenshots/deck-folders.jpg "Folder Page")

### 3. ⏳ Spaced Repetition Algorithm

- A dedicated service schedules flashcard reviews using the spaced repetition technique to optimize learning efficiency
- The algorithm dynamically adjusts review intervals based on user performance and retention rates

![Study page](/docs/screenshots/learning.jpg "Study Page")

### 4. 📊 User Progress Tracking

- Track learning progress over time
- View detailed statistics, including:
   - Number of reviewed flashcards per day
   - Number of pending flashcards for review
   - User accuracy and retention rate

![User statistics](/docs/screenshots/statistics.jpg "User Statistics Page")

### 5. 🎨 Flashcard Customization

- Flip flashcards (swap front and back content)
- Store and manage flashcard data securely in the database
- Advanced search and filtering options for efficient flashcard retrieval
- Tagging system to categorize flashcards for better organization

## 🗃️ Database Design

### Relational Model
![Relational model](/docs/images/relational_model.png "Relational Model")

### Entity-Relationship (ER)
![Entity-Relationship](/docs/images/er_model.png "Entity-Relationship")

All SQL scripts are located in the database directory. Scripts 00.sql and 01.sql execute automatically at database startup, as specified in the Dockerfile.

The project uses a MySQL-based SQL dialect. MySQL does not support the SEQUENCE command available in other database management systems (e.g., PostgreSQL). To generate auto-incrementing primary keys, the AUTO_INCREMENT attribute is used. Additionally, a custom sequence mechanism was implemented but remains commented out in the 03.sql script.

### Database Initialization and Execution

Before executing 03.sql, 02.sql (containing sample data inserts) must be run. This ensures test data is available for validation and application functionality testing.

The database schema was designed to support scalability and maintain data integrity through:

- Foreign key constraints to enforce referential integrity
- Indexing strategies to optimize query performance
- Normalization techniques to prevent data redundancy
- Efficient relationship mapping to ensure proper entity associations

## 🚀 Running the Application

To deploy and manage the application using Docker:
- Stop and clean the environment:
```
docker compose down -v --rmi all
```
- Start the application:
```
docker compose up
```
## Connecting to the Database

1. Start the Docker container.
2. Ensure port 3306 is exposed in docker-compose.yml.
3. Connect using the springstudent credentials.
4. Execute SQL scripts in an IDE (e.g., IntelliJ, DBeaver, or MySQL Workbench).

## Database Analysis

The database design provides a solid foundation for managing flashcards efficiently.

### Strengths

- **Structured and scalable design**: The relational model supports user management, statistics, notifications, and folder organization.
- **Data integrity and relationships**: Foreign key constraints ensure referential integrity, preventing issues like orphaned records.
- **User access management**: The implementation of a springstudent user account allows controlled access and testing.
- **Extensibility**: Tables such as User_Preferences and Flashcards_Progresses facilitate easy feature expansion.
- **Best practices**: Tables follow a consistent naming convention, with appropriate default values to prevent inconsistencies.
- **Comprehensive functionality**: Tables like Friendships, Notifications, and Review_Logs enhance user experience by supporting social interactions and tracking learning progress.

### Areas for Improvement

- **Index Optimization**: While unique constraints (e.g., customers_email_unique) exist, additional indexing could enhance query performance for large tables such as Review_Logs and Flashcards.
- **Trigger Implementation**: More database triggers could be utilized to ensure data integrity and automate certain operations.
- **Sensitive Data Management**: The password_hash field in the Customers table is stored as VARCHAR, with no explicit hashing or encryption strategy mentioned. Implementing a secure hashing algorithm (e.g., bcrypt, Argon2) would enhance security.
- **Documentation Enhancements**: Certain tables, such as Folder_Parent and Folders_Decks, could benefit from additional documentation to clarify their purpose and relationships.

### Additional Considerations

- **Performance Tuning**: Query optimization techniques such as indexing, caching, and batch processing could improve system efficiency.
- **Security Measures**: Implementing role-based access control (RBAC) and encryption for sensitive data fields would strengthen security.
- **Backup and Recovery**: Defining a structured backup strategy for the database to ensure data safety in case of failures.

Overall, the database structure effectively supports the application's functionality. Implementing these improvements could further enhance its performance, security, and maintainability, making it a more robust and scalable solution for long-term usage.

