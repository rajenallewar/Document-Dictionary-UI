
export const environment = {
  production: false
};
export const AppSettings = {
  hasResource(url: string): boolean {
    return !!this.resources[url];
  },
  resources: {
    'authLogin': {
      name: 'authLogin',
      url: '/auth/authLogin '
    },
    'getSmeList': {
      name: 'getSmeList',
      url: '/smedata/domainSMEDetail'
    },
    'getCountOfSmeAndDomain': {
      name: 'getCountOfSmeAndDomain',
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
    'deleteCollateral': {
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
      url: '/smedata/getDomainByUserKeyword'
    },

    'countOfProposalStatus': {
      name: 'countOfProposalStatus',
      url: '/proposal/countOfProposalStatus'
    },
    'getAllRegions': {
      name: 'getAllRegions',
      url: '/dms/getAllRegions'
    },
    'getAllClients': {
      name: 'getAllClients',
      url: '/dms/getAllClients'
    },
    'getAllStatuses': {
      name: 'getAllStatuses',
      url: '/dms/getAllStatuses'
    },
    'saveProposal': {
      name: 'saveProposal',
      url: '/proposal/saveProposal'
    },
    'searchemail': {
      name: 'searchemail',
      url: '/email/searchemail'
    },
    'getTrendingTags': {
      name: 'getTrendingTags',
      url: '/tag/mostTrendingsTags'
    },
    'getTrendingBUs': {
      name: 'getTrendingBUs',
      url: '/dms/heatmaps/regions'
    },
    'getTrendingAccounts': {
      name: 'getTrendingAccounts',
      url: '/dms/heatmaps/clients'
    },
    'getProposals': {
      name: 'getProposals',
      url: '/proposal/getProposals'
    },
    'getSummaryofProposalsByAccount': {
      name: 'getSummaryofProposalsByAccount',
      url: '/proposal/getSummryOfProposalByAccount'
    },
    'getTotalAnnotatedCollaterals': {
      name: 'getTotalAnnotatedCollaterals',
      url: '/collateral/collateralTagsCount'
    }, 
	'getAllTags':{
      name:'getAllTags',
      url:'/tag/allTags'
    },
    'globalEngagements':{
      name: 'globalEngagements',
      url: '/globalengagements/engagements'
    }

  },
   BASE_URL: 'https://dms.synechron.net/docketManagement'
  //BASE_URL: 'http://172.17.56.24:8080/docketManagement'
  //  BASE_URL: ''
};

