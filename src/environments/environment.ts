
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
    'deleteCollateral':{
      name: 'deleteCollateral',
      url: '/collateral/delete'
    },
    'downloadCollateral': {
      name: 'downloadCollateral',
      url: '/fileDownload/download'
    },
    'saveTags': {
      name: 'saveTags',
      url: '/collateral/saveCollateralTags'
    },
    'getTagsByCollateral': {
      name: 'getTagsByCollateral',
      url: '/tag/tagForCollaterals'
    },
    'getDomainByUserKeyword': {
      name: 'getDomainByUserKeyword',
      url:'/smedata/getDomainByUserKeyword'
     },
    
    'countOfProposalStatus':{
      name: 'countOfProposalStatus',
      url: '/proposal/countOfProposalStatus'
    },
    'getRegionData':{
      name: 'getRegionData',
      url: '/dms/getRegionData'
    },
    'saveProposal':{
      name: 'saveProposal',
      url: ''
    }

  },
  BASE_URL: 'http://172.20.201.170:8080/docketManagement'
  //  BASE_URL: ''
};

