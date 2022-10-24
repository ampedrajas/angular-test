// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { ErrorsHandlerService } from '@app/core/services/errors-handler.service';
import { MatSortService } from '@app/core/services/mat-sort.service';
import { SampleService } from '../../services/sample.service';

// Models
import { UserListModel } from '../../models/user-list.model';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'home-table',
    templateUrl: './home-table.component.html',
    styleUrls: ['./home-table.component.scss']
})
export class HomeTableComponent implements OnInit {
    public users!: UserModel[];
    public usersFiltered!: UserModel[];

    constructor(
        private sampleServ: SampleService,
        private sortServ: MatSortService,
        private erroService: ErrorsHandlerService
    ) { }

    ngOnInit(): void {
        this.getUsers();
    }
    
    // Obtiene la lista de usuarios
    getUsers() {
        this.sampleServ.getUsers()
        .subscribe({
            next: (response) => {
                this.users = new UserListModel().getUsersList(response.body, this.sortServ);
                this.usersFiltered = new UserListModel().getUsersList(response.body, this.sortServ);
            },
            error: (error) => {
                this.erroService.errorHandler(error);
            }
        });
    }

    // Cuando busca en el filtro libre
    applyFilter(event: KeyboardEvent) {
        let value = (event.target as HTMLInputElement).value;
        if (!value) this.usersFiltered = Object.assign([], this.users);
        else {
            this.usersFiltered = Object.assign([], this.users).filter((item: UserModel) => 
                item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 
                || item.username.toLowerCase().indexOf(value.toLowerCase()) > -1
                || item.email.toLowerCase().indexOf(value.toLowerCase()) > -1 
                || item.phone.toLowerCase().indexOf(value.toLowerCase()) > -1
            );
        }
    }
}
