import { UserEntity } from '../../../../infrastructures/entity/tUsers';
import { IServiceHandlerAsync } from '../../../../../../shared/utils/helpers/services';
import { Result } from 'neverthrow';
import { ResultError } from '../../../../../../shared/utils/exceptions/results';
import { QueryRunner } from 'typeorm';
export interface IGetUserByIdentifierServiceParameters {
    userEntity: UserEntity;
    queryRunner?: QueryRunner;
}
export interface IGetUserByIdentifierService extends IServiceHandlerAsync<IGetUserByIdentifierServiceParameters, UserEntity> {
}
export declare class GetUsersByIdentifierService implements IGetUserByIdentifierService {
    private readonly dtoValidation;
    constructor();
    handleAsync(params: IGetUserByIdentifierServiceParameters): Promise<Result<UserEntity, ResultError>>;
}
//# sourceMappingURL=index.d.ts.map