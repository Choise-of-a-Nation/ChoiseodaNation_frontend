export class News{
    id: number;
    name: string;
    description: string;
    url: string;
    createdDate: Date;

    constructor(id: number, 
                name: string, 
                description: string, 
                url: string, 
                createdDate: Date)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.createdDate = createdDate;
    }
}