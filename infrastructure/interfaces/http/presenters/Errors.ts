import { CustomError, Errors } from '../../../../application/entities/shared/Errors';

export type ErrorMapper = (data: any) => { status: number; data: any };

export const presentError: ErrorMapper = (error: any) => {
  switch (error.code) {
    case Errors.INVALID_PARAMETERS:
      return present(400, error);
    case Errors.ALREADY_EXIST:
      return present(400, error);
    case Errors.NOT_FOUND:
      return present(404, error);
    case Errors.BAD_CREDENTIALS:
      return present(403, error);
    case Errors.TOKEN_EXPIRED:
      return present(401, error);
    case Errors.SERVER_ERROR:
      return present(500, error);
    default:
      return present(500, new CustomError(Errors.SERVER_ERROR, error));
  }
};
const present = (status: number, error: CustomError) => ({
  status,
  data: {
    reason: error.name,
    msg: error.message
  }
});
