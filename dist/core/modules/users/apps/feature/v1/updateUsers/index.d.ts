import { UpdateService } from '../../../../../../shared/services/db/update';
import { UserEntity } from '../../../../infrastructures/entity/tUsers';
import { UserCommunicationEntity } from '../../../../infrastructures/entity/tUserCommunication';
import { UserCredentialsEntity } from '../../../../infrastructures/entity/tUserCredentials';
import { UserKeysEntity } from '../../../../infrastructures/entity/tUserKeys';
import { UserSettingsEntity } from '../../../../infrastructures/entity/tUserSettings';
export declare class UpdateUserService extends UpdateService<UserEntity> {
    constructor();
}
export declare class UpdateUserCommunicationService extends UpdateService<UserCommunicationEntity> {
    constructor();
}
export declare class UpdateUserCredentialsService extends UpdateService<UserCredentialsEntity> {
    constructor();
}
export declare class UpdateUserKeysService extends UpdateService<UserKeysEntity> {
    constructor();
}
export declare class UpdateUserSettingsService extends UpdateService<UserSettingsEntity> {
    constructor();
}
//# sourceMappingURL=index.d.ts.map