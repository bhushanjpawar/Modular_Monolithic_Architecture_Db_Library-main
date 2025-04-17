import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
export declare class UserKeysEntity extends BaseEntity {
    refresh_token?: string | null;
    refresh_Token_expires_at?: Date | null;
    userId?: string;
    aesSecretKey?: string;
    hmacSecretKey?: string;
    users?: UserEntity;
}
//# sourceMappingURL=index.d.ts.map