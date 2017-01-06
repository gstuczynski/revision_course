export class Repeat{
        id: any;//id from db
        engPhrase: string;
        plPhrase:string;
        description: string;
        creationDate: Date;
        plAnsCount: number;
        engAnsCount: number;
      

        constructor(engPhrase: string, plPhrase: string, description?: string, id?:any, 
                    plAnsCount?:number, engAnsCount?:number,creationDate?: Date){
            this.engPhrase = engPhrase;
            this.plPhrase = plPhrase;
            this.description = description || "";
            this.plAnsCount = plAnsCount || 0;
            this.engAnsCount = engAnsCount || 0;
            this.id = id;


        }
        
}