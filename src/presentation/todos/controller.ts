import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



export class TodosController {


    //* DI
    constructor() { }


    public getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await prisma.todo.findMany();
            res.json(todos);
        } catch (error) {
            res.status(500).json( { error: 'Error to get todos'});
        }
    }

    public getTodoById = async( req: Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id) ) {
            res.status(400).json({error: 'ID argument is not a number'});
            return;
        }

        try {
            const todo = await prisma.todo.findUnique({
                where: { id }
            });

            (todo)
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        } catch (error) {
            res.status(500).json({ error: `Error to get todo with id ${id}`});
        }

        
    }

    public createTodo = async (req: Request, res: Response) => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);

        if( error ){
            res.status(400).json({ error: error });
            return;
        }

        try {
            const todo = await prisma.todo.create({
                data: createTodoDto!
            });

            res.json(todo);

        } catch (error) {
            res.status(500).json({ error: 'Error creating todo'});
        }
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id });

        if( error ){
            res.status(400).json({error: error});
            return;
        }

        try {
            const todo = await prisma.todo.findUnique({
                where: { id }
            });

            if (!todo) {
                res.status(404).json({ error: `Todo with id ${id} not found` });
                return;
            }

            const updatedTodo = await prisma.todo.update({
                where: { id: id },
                data: updateTodoDto!.values
            });

            res.json(updatedTodo);


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: `Error to update todo with id ${id}` });
        }
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID argument is not a number' });
            return;
        }

        try {
            const todo = await prisma.todo.findUnique({
                where: { id }
            });

            if (!todo) {
                res.status(404).json({ error: `TODO with id ${id} not found` });
                return;
            }

            const deleted = await prisma.todo.delete({
                where: { id }
            });

            res.json(deleted)

        } catch (error) {
            res.status(500).json({ error: `Error to delete todo with id ${id}` });
        }
    }


}