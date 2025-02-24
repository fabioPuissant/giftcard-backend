export class HttpResonse {
    private _error: boolean;
    private _repsonseCode: string;
    private _data: HttResponseData;
    private _message: string;
    
    constructor() {
        this._error = false;
        this._repsonseCode = ""
        this._data = {items: []}
        this._message = ""
    }

    set message(msg: string) {
        this._message = msg;
    }

    public error(message: string, responseCode: number) {
        this._error = true;
        this._message = message
        this._repsonseCode = `${responseCode}`;
        this._data = {items: []}
    }

    public data(message: string, data: HttResponseData, responseCode: number){
        this._error = true;
        this._message = message
        this._repsonseCode = `${responseCode}`;
        this._data = {items: []} 
    }

    get() {
        return {
            data: this._data.items,
            message: this._message,
            responseCode: this._repsonseCode,
            error: this._error
        }
    }
}