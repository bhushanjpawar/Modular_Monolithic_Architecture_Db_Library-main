import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
export declare class UserCredentialsEntity extends BaseEntity {
    username?: string;
    salt?: string;
    hash?: string;
    userId?: string;
    users?: UserEntity;
}
//# sourceMappingURL=index.d.ts.map