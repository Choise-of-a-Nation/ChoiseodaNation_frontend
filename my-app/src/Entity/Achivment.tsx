export class Achivments{
    id: string;
    name: string;
    nameEng: string;
    userId: string;
    iconUrl: string;
    description: string;
    descriptionEng: string;
    isOk: boolean;

    constructor(id: string, 
                name: string, 
                nameEng: string, 
                userId: string, 
                iconUrl: string, 
                description: string, 
                descriptionEng: string, 
                isOk: boolean)
    {
        this.id = id;
        this.name = name;
        this.nameEng = nameEng;
        this.userId = userId;
        this.iconUrl = iconUrl;
        this.description = description;
        this.descriptionEng = descriptionEng;
        this.isOk = isOk;
    }
}