import crypto from 'crypto';

import { Service } from 'typedi';
import { Err, Ok, Result } from 'neverthrow';
import { IServiceHandlerAsync } from '../services';
import { ResultError } from '../../exceptions/results';
import { ivLength } from '../../../models/constant';
import { StatusCodes } from 'http-status-codes';

export class AES {
	private _ivLength: number = ivLength;
	private readonly _encryptionKey: string;
	constructor(encryptionKey: string) {
		this._encryptionKey = encryptionKey;
	}

	public encryptAsync(data: string): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				let iv = crypto.randomBytes(this._ivLength);
				let cipher = crypto.createCipheriv(
					'aes-256-cbc',
					Buffer.from(this._encryptionKey),
					iv
				);
				let encrypted = cipher.update(data);

				encrypted = Buffer.concat([encrypted, cipher.final()]);

				return resolve(`${iv.toString('hex')}:${encrypted.toString('hex')}`);
			} catch (e) {
				reject(e);
			}
		});
	}

	public decryptAsync(data: string): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				let textParts = data.split(':');
				let iv = Buffer.from(textParts.shift()!, 'hex');
				let encryptedText = Buffer.from(textParts.join(':'), 'hex');
				let decipher = crypto.createDecipheriv(
					'aes-256-cbc',
					Buffer.from(this._encryptionKey),
					iv
				);
				let decrypted = decipher.update(encryptedText);

				decrypted = Buffer.concat([decrypted, decipher.final()]);

				return resolve(decrypted.toString());
			} catch (e) {
				reject(e);
			}
		});
	}
}

export interface IAesEncryptParameters<T extends object> {
	data: T;
	key: string;
}

export interface IAesEncryptWrapper<T extends object>
	extends IServiceHandlerAsync<IAesEncryptParameters<T>, string> {}

@Service()
export class AesEncryptWrapper<T extends object> implements IAesEncryptWrapper<T> {
	public async handleAsync(
		params: IAesEncryptParameters<T>
	): Promise<Result<string, ResultError>> {
		try {
			if (!params)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'parameter is null'));

			if (!params.data)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'data is null'));

			if (!params.key)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'key is null'));

			const aes = new AES(params.key);
			const body: string = JSON.stringify(params.data as object);

			if (!body) return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'body is null'));

			const encryptedBody = await aes.encryptAsync(body);
			if (!encryptedBody)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'encryptedBody is null'));

			return new Ok(encryptedBody);
		} catch (ex) {
			const error = ex as Error;
			return new Err(new ResultError(StatusCodes.BAD_REQUEST, error.message));
		}
	}
}

export interface IAesDecryptParameters {
	data: string;
	key: string;
}

export interface IAesDecryptWrapper<T extends object>
	extends IServiceHandlerAsync<IAesDecryptParameters, T> {}
@Service()
export class AesDecryptWrapper<T extends object> implements IAesDecryptWrapper<T> {
	public async handleAsync(params: IAesDecryptParameters): Promise<Result<T, ResultError>> {
		try {
			if (!params)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'parameter is null'));

			if (!params.data)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'data is null'));

			if (!params.key)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'key is null'));

			const aes = new AES(params.key);
			const decryptedBody = await aes.decryptAsync(params.data);
			if (!decryptedBody)
				return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'decryptedBody is null'));

			const body: T = JSON.parse(decryptedBody);
			if (!body) return new Err(new ResultError(StatusCodes.BAD_REQUEST, 'body is null'));

			return new Ok(body as T);
		} catch (ex) {
			const error = ex as Error;
			return new Err(new ResultError(StatusCodes.BAD_REQUEST, error.message));
		}
	}
}
