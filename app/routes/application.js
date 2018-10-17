import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  firebaseApp: service(),
  userService: service(),
  settingsService: service(),
  quoteService: service(),

  async flushLS () {
    await localforage.setItem("appdata", {version:2});

    this.get('session').invalidate();
  },

  async checkMigration() {
    let appData = await localforage.getItem("appdata");

    if(appData === null) {
      await this.flushLS();
    }

    appData = await localforage.getItem("appdata");

    if(appData.version != 2) {
      await this.flushLS();
    }
  },

  async signInFB() {
    const auth0Data = this.get('session.data.authenticated.profile');

    this.get('firebaseApp');

    if(auth0Data) {
      await this.get('firebaseApp').auth()
        .signInWithCustomToken(auth0Data['https://app.youpressed.com/fbToken'])
        .catch(error => console.log(error.code, error.message));

      this.get('userService').manage(auth0Data);
      this.get('settingsService').boot();
      this.get('quoteService').refreshQuote();
    } else {
      return Ember.RSVP.resolve();
    }
  },

  signOutFB() {
    this.get('firebaseApp').auth().signOut();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this.signInFB()
      .then(() => this.transitionTo('productions'))
  },

  sessionInvalidated() {
    this.signOutFB();
    window.location.replace('https://www.youpressed.com');
  },

  beforeModel() {
    this._super(...arguments);
    return this.signInFB();
  }
});
