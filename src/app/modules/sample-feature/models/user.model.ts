import { MatSortService } from "@app/core/services/mat-sort.service";
import { AddressModel } from "./address.model";
import { CompanyModel } from "./company.model";

export class UserModel {
    id!: string;
    email!: string;
    name!: string;
    phone!: string;
    username!: string;
    shortName!: string;
    website!: string;
    company!: CompanyModel;
    address!: AddressModel;

    deserialize(data: any, matSortServ: MatSortService) {
        Object.assign(this, data);
        if (data) {            
            this.shortName = matSortServ.removeAccentMarks(data.name[0].toUpperCase())+matSortServ.removeAccentMarks(data.name.split(' ')[1][0].toUpperCase());
        }
        return this;
    }
}