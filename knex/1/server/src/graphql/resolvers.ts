import { merge } from 'lodash';

import customerResolvers from './Customer/resolvers';
import rentalResolvers from './Rental/resolvers';

export default merge(customerResolvers, rentalResolvers);
