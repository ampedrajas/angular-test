export class BaseModel {
    code?: string;
    description?: string;
    id!: number;

    constructor(data?: BaseModel) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
