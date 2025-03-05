// import express from 'express';
import express from 'express';
import { config } from '../config/env';
import { setupGroupRoutes } from './routes/group.routes';
import { errorHandler } from './middlewares/errorHandler';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Hello Hexagonal Architecture!' });
    });
    this.app.use(setupGroupRoutes());

    // Adicionar errorHandler depois das rotas
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  }
}

const app = new App();
app.start();
