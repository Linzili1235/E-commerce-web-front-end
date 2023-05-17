export const FETCH_ALL_URL = 'http://api-lulu.hibitbyte.com/product/allProducts?mykey=fuM1J1/wOUzyoUbxEYRZ2%2BdRoHepR7z%2BGDfhqB2%2BECqoI99i2RVYZAUcdVpTod96Wyf4wqsh8dR1GTFvHAdJTw=='
export const GET_FILTERS_URL = 'http://api-lulu.hibitbyte.com/product/filter?mykey=fuM1J1/wOUzyoUbxEYRZ2%2BdRoHepR7z%2BGDfhqB2%2BECqoI99i2RVYZAUcdVpTod96Wyf4wqsh8dR1GTFvHAdJTw=='
export const KEYS_URL = 'mykey=e3athvi4svVimPzlTfMdg1qlI3r0vIgh/7PBdRIFGUe6JWmeiTKe78RO/CbKBGVXQhKq9QGuumv9mRVhHdmkCg==';

export const actionType = {
    //Product action defined
    'FETCH_ONE_PRODUCT' : 'FETCH_ONE_PRODUCT',
    // 'FETCH_ALL_PRODUCTS' : 'FETCH_ALL_PRODUCT',
    'FETCH_PRODUCTS_PAGE_SORTING' :  'FETCH_PRODUCTS_PAGE_SORTING',
    'UPDATE_FILTERS' : 'UPDATE_FILTERS',
    'GET_FILTERS' : 'GET_FILTERS',
    'CHECK_BOX_UPDATE' : 'CHECK_BOX_UPDATE',
    'FETCH_ALL_PRODUCTS_WITH_FILTER':'FETCH_ALL_PRODUCTS_WITH_FILTER',
    'URL_PARAMS_SAVER' : 'URL_PARAMS_SAVER',
    'SORT_ID' : 'SORT_ID',
    'ADDED_PRODUCT_INFO' : 'ADDED_PRODUCT_INFO',
    'TOGGLE_SUMMARY_BOX':'TOGGLE_SUMMARY_BOX',
    'TOGGLE_UPDATE_BOX':'TOGGLE_UPDATE_BOX',
    'SET_NO_PRODUCT':'SET_NO_PRODUCT',
    'TOTAL_PRICE' : 'TOTAL_PRICE',
    'REMOVE_PRODUCT': 'REMOVE_PRODUCT',
    'ADD_WHEN_REFRESH': 'ADD_WHEN_REFRESH',
    'CHANGE_WITH_QUANTITY': 'CHANGE_WITH_QUANTITY',
    'REMOVE_SPECIFIC_PRODUCT': 'REMOVE_SPECIFIC_PRODUCT',
    'UPDATE_TO_BAG':'UPDATE_TO_BAG'
}

export const api_routes = {
    logIn: 'http://localhost:8000/user/login',
    createUser: 'http://localhost:8000/user/create',
    getUserInfo: 'http://localhost:8000/user/oneUser',
    refreshToken: 'http://localhost:8000/refresh',
    logOut: 'http://localhost:8000/logout',
    updatePassword: 'http://localhost:8000/user/update',
}
