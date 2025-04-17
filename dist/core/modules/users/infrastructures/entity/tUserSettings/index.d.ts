import { BaseEntity } from '../../../../../shared/entity/base';
import { UserEntity } from '../tUsers';
import { BoolEnum } from '../../../../../shared/models/enums/bool.enum';
export declare class UserSettingsEntity extends BaseEntity {
    emailVerificationToken?: string | null;
    isEmailVerified?: BoolEnum;
    isVerificationEmailSent?: BoolEnum;
    isWelcomeEmailSent?: BoolEnum;
    userId?: string;
    users?: UserEntity;
}
//# sourceMappingURL=index.d.ts.map