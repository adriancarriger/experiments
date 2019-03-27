import generated from './aws-exports';

export default {
  cognito: {
    REGION: generated.aws_cognito_region,
    USER_POOL_ID: generated.aws_user_pools_id,
    APP_CLIENT_ID: generated.aws_user_pools_id,
    IDENTITY_POOL_ID: generated.aws_cognito_identity_pool_id
  },
  social: {
    FB: '1617066261730179'
  }
};
