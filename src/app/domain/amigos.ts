export type amigoJSON = {
    nombre?: String,
    apellido?: String,
    username?: String,
    id?: Number
}

export class amigo {
   
   constructor(
    public nombre?: String,
    public apellido?: String,
    public userName?: String,
    public id?: Number){}

    static fromJSON(amigoJSON: amigoJSON): amigo{
        return Object.assign(new amigo("","","",0),amigoJSON)
    }
}
