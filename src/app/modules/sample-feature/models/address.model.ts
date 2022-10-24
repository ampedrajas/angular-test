import { GeoModel } from "./geo.model";

export class AddressModel {
    city!: string;
    geo!: GeoModel;
    street!: string;
    suite!: string;
    zipcode!: string;
}