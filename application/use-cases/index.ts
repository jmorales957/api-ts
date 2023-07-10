import { IServices } from 'infrastructure/services/IServices';

import { ILogger } from '../../logger/Logger';
import { createAuth } from './Auth/create/Create';
import { getByRole } from './Auth/getByRole/GetByRole';
import { updateAuth } from './Auth/update/Update';
import { createUser } from './User/create/Create';
import { signIn } from './User/signIn/SignIn';
import { createSequence } from './Sequence/create/Create';
import { deleteSequence } from './Sequence/delete/Delete';
import { getByIdSequence } from './Sequence/getById/GetById';
import { updateSequence } from './Sequence/update/Update';
import { getAllSequence } from './Sequence/getAll/GetAll';
import { getTotalSequence } from './Sequence/getTotal/GetTotal';

export const useCaseFactory = (services: IServices, baseLogger: ILogger) => ({
  createAuth: createAuth(services, baseLogger.child({ controller: 'createAuth' })),
  getByRole: getByRole(services, baseLogger.child({ controller: 'getByRole' })),
  updateAuth: updateAuth(services, baseLogger.child({ controller: 'updateAuth' })),
  createUser: createUser(services, baseLogger.child({ controller: 'createUser' })),
  signIn: signIn(services, baseLogger.child({ controller: 'signIn' })),
  createSequence: createSequence(services, baseLogger.child({ controller: 'createSequence' })),
  deleteSequence: deleteSequence(services, baseLogger.child({ controller: 'deleteSequence' })),
  getByIdSequence: getByIdSequence(services, baseLogger.child({ controller: 'getByIdSequence' })),
  getAllSequence: getAllSequence(services, baseLogger.child({ controller: 'getAllSequence' })),
  updateSequence: updateSequence(services, baseLogger.child({ controller: 'updateSequence' })),
  getTotalSequence: getTotalSequence(services, baseLogger.child({ controller: 'getTotalSequence' }))
});
