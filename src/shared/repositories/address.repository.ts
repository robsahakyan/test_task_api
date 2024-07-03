import { Repository } from 'typeorm';

import { CustomRepository } from '../../db/typeorm-ex.decorator';
import {AddressEntity} from "../../modules/shared/address.entity";
import { AddressTypeEnum } from '../../constants/address-type.enum';

@CustomRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {
    async getById(id: string): Promise<AddressEntity | null> {
        return this.createQueryBuilder('address')
            .where('address.id = :id', { id})
            .getOne()
    }
    async getAddressTypeOfSingleCompany(id: string, typeOfAddress: AddressTypeEnum): Promise<AddressEntity | AddressEntity[]> {
        const qb = this.createQueryBuilder('address')
            .where('address.companyId = :id', { id })
            .andWhere('address.addressType = :typeOfAddress', { typeOfAddress});

        if (typeOfAddress === AddressTypeEnum.BILLING_ADDRESS) {
            return qb.getOne();
        }

        return qb.getMany()
    }
}
