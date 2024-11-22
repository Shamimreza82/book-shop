
# **Book Store API**

A RESTful API for managing a Book Store, built using **Express.js**, **TypeScript**, and **MongoDB** with **Mongoose**. This API allows for CRUD operations on books, placing orders, and calculating revenue, with proper validation and error handling.

---

## **Features**

- **Product Management**:
  - Create, read, update, and delete books.
  - Retrieve books by category, title, or author using search terms.
- **Order Management**:
  - Place orders and update inventory automatically.
  - Handle insufficient stock scenarios.
- **Revenue Calculation**:
  - Calculate total revenue from all orders using MongoDB aggregation.
- **Data Validation**:
  - Enforce data integrity using Mongoose schema validation.
  - Handle validation errors gracefully with detailed error messages.
- **Error Handling**:
  - Return meaningful error messages for invalid input, missing data, and 404 scenarios.

---

## **Endpoints**

### **Products (Books)**

| Method | Endpoint                | Description                                |
|--------|-------------------------|--------------------------------------------|
| POST   | `/api/products`         | Create a new book                          |
| GET    | `/api/products`         | Retrieve all books or filter by title, author, category |
| GET    | `/api/products/:id`     | Retrieve a specific book by its ID         |
| PUT    | `/api/products/:id`     | Update details of a specific book          |
| DELETE | `/api/products/:id`     | Delete a specific book                     |

### **Orders**

| Method | Endpoint                | Description                                |
|--------|-------------------------|--------------------------------------------|
| POST   | `/api/orders`           | Place a new order                          |
| GET    | `/api/orders/revenue`   | Calculate total revenue from all orders    |

---

## **Technologies Used**

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ORM
- **Validation**: Mongoose Schema Validation

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/book-store-api.git
cd book-store-api
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the project root and add:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/book-store
```

### **4. Run the Application**
- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm run build
  npm start
  ```

---

## **Contact**

For questions or support, contact me at [shamimrezaone@gmail.com](mailto:shamimrezaone@gmail.com). 

--- 
