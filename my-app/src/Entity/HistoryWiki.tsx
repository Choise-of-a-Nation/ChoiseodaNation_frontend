export class HistoryWiki{
    id: number;
    title: string;
    description: string;
    url: string;
    createdDate: Date;

    constructor(id: number, 
                title: string, 
                description: string, 
                url: string, 
                createdDate: Date)
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.createdDate = createdDate;
    }
}