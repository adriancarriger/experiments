import { merge } from 'lodash';

import bookResolvers from './Book/resolvers';
import personResolvers from './Person/resolvers';

export default merge(bookResolvers, personResolvers);
