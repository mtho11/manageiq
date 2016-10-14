'use strict';

describe('middlewareAddDatasourceController', function () {

  var mwAddDataSourceService, $httpBackend;

  beforeEach(module('ManageIQ'));

  beforeEach(inject(function($injector) {

    mwAddDataSourceService = $injector.get('mwAddDataSourceService');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('Test Add Datasource', function() {
    it('should get datasources', function () {
      var dsList = mwAddDataSourceService.getDatasources();
      expect(dsList).toBeDefined();
      expect(dsList.length).toBeGreaterThan(1);
    });

    it('should submit add_datasource via json/POST', function () {
      var dsPayload = {
        'id': 1,
        'xaDatasource': false,
        'datasourceName': 'H2DS',
        'jndiName': 'java:/H2DS',
        'driverName': 'h2',
        'driverClass': 'org.h2.Driver',
        'connectionUrl': 'jdbc:h2:mem:test;DB_CLOSE_DELAY=-1',
        'userName': 'jdoe',
        'password': 'password',
        'securityDomain': ''
      };
      var addDatasourceSuccessResponse = {'status':'success' };

      $httpBackend.expectPOST('/middleware_server/add_datasource', function() { } )
        .respond(200, addDatasourceSuccessResponse);
      mwAddDataSourceService.sendAddDatasource(dsPayload);
      $httpBackend.flush();
     });
  });

});