import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections 
);

/* 
{
    hats: { <----- esto seria cada elemento retornado por el map
        ...,
        items: []
    },
    jackets: {
        ...,
        items: []
    }
}
*/

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map( key => collections[key])
);    
 
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        //retorna la coleccion === collectionUrlParam
        collections => collections[collectionUrlParam] // puede tomar collectionUrl porque esta dentro de esta funcion
    ); 