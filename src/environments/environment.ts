
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
    },
    'getTotalSmeCount': {
      name: 'getTotalSmeCount',
      url: '/smedata/countOfSmeAndDomain'
    },
    'getCollaterals': {
      name: 'getCollaterals',
      url: '/collateral/getCollaterals'
    },
    'collateralTypeCount': {
      name: 'collateralTypeCount',
      url: '/collateral/collateralTypeCount'
    },
    'saveCollateral': {
      name: 'saveCollateral',
      url: '/collateral/savecollateral'
    },
    'allCollateralTypes': {
      name: 'allCollateralTypes',
      url: '/collateral/allCollateralTypes'
    },
    'viewCollateral': {
      name: 'viewCollateral',
      url: '/collateral/viewCollateral'
    },
    'downloadCollateral': {
      name: 'downloadCollateral',
      url: '/fileDownload/download'
    },
    'saveTags': {
      name: 'saveTags',
      url: '/collateral/savetags'
    },
    'getDomainByUserKeyword': {
      name: 'getDomainByUserKeyword',
      url: ''
    },

  },
  BASE_URL: 'http://172.20.201.170:8080/docketManagement'
  //  BASE_URL: ''
};

