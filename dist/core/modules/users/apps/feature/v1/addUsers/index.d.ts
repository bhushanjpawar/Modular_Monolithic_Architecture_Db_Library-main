import { AddService } from '../../../../../../shared/services/db/add';
import { UserEntity } from '../../../../infrastructures/entity/tUsers';
import { UserCommunicationEntity } from '../../../../infrastructures/entity/tUserCommunication';
import { UserKeysEntity } from '../../../../infrastructures/entity/tUserKeys';
import { UserSettingsEntity } from '../../../../infrastructures/entity/tUserSettings';
import { UserCredentialsEntity } from '../../../../infrastructures/entity/tUserCredentials';
export declare class AddUserService extends AddService<UserEntity> {
    constructor();
}
export declare class AddUserCommunicationService extends AddService<UserCommunicationEntity> {
    constructor();
}
export declare class AddUserKeyService extends AddService<UserKeysEntity> {
    constructor();
}
export declare class AddUserSettingsService extends AddService<UserSettingsEntity> {
    constructor();
}
export declare class AddUserCredentialsService extends AddService<UserCredentialsEntity> {
    constructor();
}
//# sourceMappingURL=index.d.ts.map