"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSafeString = IsSafeString;
const class_validator_1 = require("class-validator");
function IsSafeString(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isSafeString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    if (typeof value !== 'string')
                        return false;
                    // Regular expression to detect HTML and JavaScript code
                    const htmlJsRegex = /<[^>]*>|javascript:/i;
                    return !htmlJsRegex.test(value);
                },
                defaultMessage(args) {
                    return `${args.property} contains unsafe HTML or JavaScript content`;
                },
            },
        });
    };
}
