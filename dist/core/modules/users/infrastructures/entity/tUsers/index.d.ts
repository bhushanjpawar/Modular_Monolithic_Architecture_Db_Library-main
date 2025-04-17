import { BaseEntity } from '../../../../../shared/entity/base';
import { UserCommunicationEntity } from '../tUserCommunication';
import { UserSettingsEntity } from '../tUserSettings';
import { UserKeysEntity } from '../tUserKeys';
import { UserCredentialsEntity } from '../tUserCredentials';
export declare class UserEntity extends BaseEntity {
    firstName?: string;
    lastName?: string;
    clientId?: string;
    userCommunication?: UserCommunicationEntity;
    userKeys?: UserKeysEntity;
    userSetting?: UserSettingsEntity;
    userCredentials?: UserCredentialsEntity;
}
//# sourceMappingURL=index.d.ts.map