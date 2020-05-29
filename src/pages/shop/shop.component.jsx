import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection.component';

// match --> /shop  --> que la ruta que renderiza este page-component 
// siempre renderizemos este component tendra 'shop', por lo tanto siempre sera exacto y siempre mostraremos collection preview
// si no es exact, quiere decir que viene con un parametro, por lo tanto renderizamos category page pasandole el id de la categoria
const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route exact path={`${match.path }`} component = {CollectionsOverview}/>
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> 
    </div>
);

export default ShopPage;