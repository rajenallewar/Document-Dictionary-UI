
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
      // url: '/smedata/domainSMEDetail'
      url: '/assets/mockdata/domainSMED.json'
    },
    'getTotalSmeCount': {
      name: 'getTotalSmeCount',
      // url: '/smedata/countOfSmeAndDomain'
      url: '/assets/mockdata/getTotalSmeCount.json'
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

