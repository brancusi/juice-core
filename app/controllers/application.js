import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  session: service(),

  actions: {
    shit() {
        console.log('Shit');
    },
    async didTransition() {
      await this.checkMigration();
    },

    navigateTo(path) {
      this.transitionToRoute(path);
    },

    login () {
      const lockOptions = {
        autoclose: true,
         auth: {
           params: {
             scope: 'openid profile email'
           }
         }
      };

      get(this, 'session').authenticate('authenticator:auth0-lock', lockOptions);
    },

    logout () {
      get(this, 'session').invalidate();
    }
  }
});
