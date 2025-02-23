export class UserId {
    constructor(private id: string){
        const valid = this.validateId(id)
    }

    private validateId(receivedId: string): boolean {
        return true;
    }

    public get(): string {
        return this.id;
    }
}