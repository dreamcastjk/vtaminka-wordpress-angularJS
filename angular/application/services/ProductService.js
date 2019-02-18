"use strict";

export default class ProductService{

    constructor(
        $http ,
       PASS
    ){

        this._$http = $http;
        this._PASS = PASS;

    }

    // список категорий товаров
    async getCategories(){

        try{

            let categoryResponse = await this._$http({

                'method': 'POST',
                'url': '/vtaminka-wp/admin/wp-admin/admin-ajax.php',
                'data':{
                    'action': 'getCategoryListAction'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {

                    let str = [];
                    for(let p in obj)

                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");

                }

            });

            let categories = categoryResponse.data;

            console.log('categories: ', categories);

            return categories;

        }//try
        catch (ex) {

            console.log('getCategoryException: ', ex);

        }//catch

    }//getCategories

    // список товаров по категории
    async getProductsByCategory( categoryName ){

        try{

            let categoryResponse = await this._$http({

                'method': 'POST',
                'url': '/vtaminka-wp/admin/wp-admin/admin-ajax.php',
                'data':{
                    'categoryName': categoryName,
                    'action': 'getProductsByCategoryAction'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {

                    let str = [];
                    for(let p in obj)

                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");

                }

            });

            let productsByCategories = categoryResponse.data;

            return productsByCategories;

        }//try
        catch(ex){

            console.log('getCategoryProducts: ', ex );

        }//catch

    }//getProductsByCategory

    // список товаров
    async getProducts(){

        try {

            let response = await this._$http({

                'method': 'POST',
                'url': '/vtaminka-wp/admin/wp-admin/admin-ajax.php',
                'data': {
                    'limit': 10,
                    'action': 'getProductListAction',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {

                    let str = [];
                    for(let p in obj)

                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");

                }

            });

            let products = response.data;

            products.forEach( p => {
                p.amount = 1;
            } );

            return products;

        }//try
        catch (ex) {

            console.log(ex);

        }//catch

    }//getProducts

    async getSingleProduct(productID){

        let id = this._PASS.GET_PRODUCT.replace('{{ProductID}}' , productID);

        let response = await this._$http.get(`${this._PASS.HOST}${id}`);

        return response.data;

    }//getSingleProduct

}//ProductService