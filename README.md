# Express RESTful API

This is a simple RESTful API built with Node.js and Express framework.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine. You can download and install it from [Node.js official website](https://nodejs.org/).
- npm (Node Package Manager) installed. npm is typically installed alongside Node.js.

## Getting Started

To get a local copy up and running follow these simple steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/JeffeVargasP/e-commerce.git
```

2. Navigate into the project directory:

```bash
cd e-commerce
```

3. Install dependencies using npm:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

## Usage

Once the server is running, you can send HTTP requests to interact with the API. The available endpoints are listed below:

- `GET /api/order`: Retrieves all orders.

- `GET /api/order/:id`: Retrieves a specific order by ID.

- `POST /api/order`: Creates a new order.

- `DELETE /api/order/:id`: Deletes an order by ID.

- `GET /api/user`: Retrieves all users.

- `GET /api/user/:id`: Retrieves a specific user by ID.

- `POST /api/user`: Creates a new user.

- `DELETE /api/user/:id`: Deletes a user by ID.

- `GET /api/product`: Retrieves all products.

- `GET /api/product/:id`: Retrieves a specific product by ID.

- `POST /api/product`: Creates a new product.

- `PATCH /api/product/:id`: Updates an existing product by ID.

- `DELETE /api/product/:id`: Deletes a product by ID.

Please note that for endpoints requiring data input, you should include the appropriate JSON payload in the request body.

## Configuration

You can configure the server port and other settings by modifying the `config.js` file (Change example.config.js to config.js).

## Dependencies

- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation for node.js.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance.
- [Sequelize](https://sequelize.org/) - A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

E-mail - jeffersonvargas745@gamil.com

Project Link: [https://github.com/JeffeVargasP/e-commerce](https://github.com/JeffeVargasP/e-commerce)

Made with 💛 and ☕ by @JeffeVargasP