# TypeScript Hexagonal Architecture Boilerplate

A robust and scalable TypeScript/Node.js boilerplate implementing Hexagonal Architecture (also known as Ports and Adapters pattern).

## About Hexagonal Architecture

Hexagonal Architecture is an architectural pattern that allows an application to be equally driven by users, programs, automated tests, or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases.

### What Problem Does It Solve?

- **Dependency Management**: It helps maintain a clear separation between business logic and external dependencies
- **Testing**: Makes the application easier to test since core business logic is isolated
- **Flexibility**: Allows easy swapping of components (e.g., changing databases, UI frameworks) without affecting business logic
- **Maintainability**: Clear boundaries between different parts of the application make it easier to maintain and modify

### Advantages

- ✅ Clear separation of concerns
- ✅ Business logic is protected from external changes
- ✅ Easier to test (especially business logic)
- ✅ Flexible and adaptable to change
- ✅ Technology agnostic core
- ✅ Better maintainability

### Disadvantages

- ❌ Can be overkill for simple applications
- ❌ Initial setup requires more time
- ❌ More boilerplate code
- ❌ Learning curve for developers new to the pattern

## Project Structure

```
src/
├── domain/ # Core business logic
│ ├── entities/ # Business entities
│ ├── usecases/ # Application use cases
│ └── ports/ # Interface definitions (ports)
├── adapters/ # Implementation of ports
│ ├── controllers/ # HTTP/API controllers
│ ├── repositories/# Data access implementations
│ └── services/ # External service implementations
├── infrastructure/ # Framework and tools
│ ├── config/ # Configuration files
│ ├── server/ # Server setup
│ └── database/ # Database specific code
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/ts-hexagonal-boilerplate.git

# Navigate to project directory
cd ts-hexagonal-boilerplate

# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Access the following API endpoints by opening your browser or using a REST client at http://localhost:3000

### Group Management Endpoints

The API provides comprehensive endpoints for managing groups. All responses are in JSON format.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|-----------|
| GET | `/groups` | Retrieves a list of all groups with their details including ID, name and creation date | - | Array of group objects containing `id`, `name`, `createdAt` |
| GET | `/groups/:id` | Fetches detailed information for a specific group by its UUID | - | Single group object with `id`, `name`, `createdAt` |
| POST | `/groups` | Creates a new group in the system | `{ name: string }` | Created group ID as `{ id: string }` with 201 status |
| PATCH | `/groups/:id` | Updates an existing group's information | `{ name?: string }` | No content with 204 status on success |
| DELETE | `/groups/:id` | Permanently removes a group from the system | - | No content with 204 status on success |

All endpoints return appropriate error responses (400, 404, 500) when needed.

### API Documentation

The API is documented using OpenAPI 3.0 specification. You can view and manage the API documentation using the following npm scripts:

```bash
# Build static documentation
npm run docs:build

# Preview documentation locally
npm run docs:serve

# Lint OpenAPI specification
npm run docs:lint
```

These commands help you:
- `docs:build`: Generate static HTML documentation from your OpenAPI specification
- `docs:serve`: Start a local server to preview the documentation (available at http://localhost:8080)
- `docs:lint`: Validate your OpenAPI specification file for errors and best practices

The API documentation provides detailed information about:
- Available endpoints
- Request/response formats
- Authentication methods
- Error handling
- Example requests and responses

### Running Unit Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Development Guidelines

- Keep business logic in the domain layer
- Create interfaces (ports) for external dependencies
- Implement adapters for each external dependency
- Use dependency injection for better testability
- Follow SOLID principles
- Write tests for business logic

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)