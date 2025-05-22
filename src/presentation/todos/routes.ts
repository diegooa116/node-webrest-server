import { Router } from "express";
import { TodosController } from "./controller";




export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        
        const todoController = new TodosController();

        router.get('/', todoController.getTodos );
        router.get('/:id', todoController.getTodoById ); //* :id | Sintaxis especial de express que permite recibir un argumento en la ruta
        
        router.post('/', todoController.createTodo );

        return router;
    }

}