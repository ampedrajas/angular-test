import { MatSortService } from "@app/core/services/mat-sort.service";
import { UserModel } from "./user.model";

export class UserListModel {
    getUsersList(data: any, matSortServ: MatSortService) {
        const USERS_LIST = [];

        if (data) {
            for (let item of data) {
                USERS_LIST.push(new UserModel().deserialize(item, matSortServ));
            }
        }
        return USERS_LIST;
    }
}