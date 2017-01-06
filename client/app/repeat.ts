export class Repeat{
        _id: any;//id from db
        engPhrase: string;
        plPhrase:string;
        description: string;
        creationDate: Date;
        plAnsCountToNext: number;
        engAnsCountToNext: number;
        plGoodAnsCount: number;
        engGoodAnsCount: number;

        constructor(engPhrase: string, plPhrase: string, description?: string, id?:any, 
                    plAnsCountToNext?:number, engAnsCountToNext?:number){
            this.engPhrase = engPhrase;
            this.plPhrase = plPhrase;
            this.description = description || "";
            this._id = id;
            this.plAnsCountToNext = plAnsCountToNext || 0;
            this.engAnsCountToNext = engAnsCountToNext || 0;
            


        }
        
}