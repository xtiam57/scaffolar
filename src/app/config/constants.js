angular.module('app')
  /**
  * @ngdoc property
  * @name app.property:API
  * @returns {object} An object with the following fields:
  * - API version
  * - Port number
  * - Protocol used (HTTP or HTTPS)
  * - Host name or IP address
  * - Prefixes
  * - URL form by the previous fields
  *
  * @description
  * Information about the API.
  *
  * **Note:** -
  */
 .constant('API', {
    version  : '0.1.0',
    port     : '6300',
    protocol : 'http',
    host     : '200.41.117.170',
    prefix   : 'api',
    get url() {
     return this.protocol + '://' +
      this.host +
      (this.port ? ':' + this.port : '') + '/' +
      this.prefix + (this.prefix ? '/': '') +
      this.version + (this.version ? '/': '');
    }
 })

 .constant('APP_VERSION', '0.1.0');
