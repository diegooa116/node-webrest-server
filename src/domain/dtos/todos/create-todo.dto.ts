



export class CreateTodoDto {

    private constructor(
        public readonly text: string,
    ){}

    static create( props: {[key:string]: any}): [string?, CreateTodoDto?]{
        if(!props || typeof props !== 'object'){
            return ['Invalid payload', undefined];
        }
        
        const { text } = props;
        if( !text ) return ['Text property is required', undefined];
        
        return [undefined, new CreateTodoDto(text)];
    }
}