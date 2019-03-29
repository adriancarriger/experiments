import { Auth } from 'aws-amplify';

class AuthClient {
  userHasAuthenticated = false;

  constructor() {
    // this.isAuthenticated = this.isAuthenticated.bind(this);

    this.getCurrentUser();
  }

  isAuthenticated() {
    return this.userHasAuthenticated;
  }

  getCurrentUser() {
    Auth.currentAuthenticatedUser()
      .then(() => (this.userHasAuthenticated = true))
      .catch(error => {
        if (error !== 'not authenticated') {
          alert(error);
        }
      });
  }
}

const authClient = new AuthClient();

export default authClient;
