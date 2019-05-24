// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const AppSettings = {
  hasResource(url: string): boolean {
      return !!this.resources[url];
  },
  resources : {
    'authLogin': {
      name: 'authLogin',
      url: '/auth/authLogin '
    },
    'getProposals': {
      name: 'getProposals',
      url: '/getAllProposals'
    },
    'getSmeList': {
      name: 'getSmeList',
      url: '/smedata/domainSMEDetail'
      // url: '/assets/mockdata/domainSMED.json'
    },
    'getTotalSmeCount': {
      name: 'getTotalSmeCount',
      url: '/smedata/countOfSmeAndDomain'
      // url: '/assets/mockdata/getTotalSmeCount.json'
    },
    'getCollaterals': {
      name: 'getCollaterals',
      // url: '/collateral/getCollaterals'
      url: '/assets/mockdata/getCollaterals.json'
    },
    'collateralTypeCount': {
      name: 'collateralTypeCount',
      // url: '/collateral/collateralTypeCount'
      url: '/assets/mockdata/collateralTypeCount.json'
    },
  },
  // BASE_URL: 'http://172.20.201.170:8080/docketManagement'
  BASE_URL: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
