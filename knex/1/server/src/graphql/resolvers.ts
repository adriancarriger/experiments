import { merge } from 'lodash';

import bookResolvers from './Book/resolvers';
import customerResolvers from './Customer/resolvers';

export default merge(bookResolvers, customerResolvers);
