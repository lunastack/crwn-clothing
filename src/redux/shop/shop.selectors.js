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
    collections => collections ? Object.keys(collections).map( key => collections[key]) : [] 
);    
 
export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        //retorna la coleccion === collectionUrlParam
        collections => (collections ? collections[collectionUrlParam] : null) // puede tomar collectionUrl porque esta dentro de esta funcion
    ); 

export const selectCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);


/* Este selector es para nuestro  */
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections // si esta el objeto, entonces retorna true, si no false
);