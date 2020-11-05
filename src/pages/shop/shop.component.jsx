import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


// match --> /shop  --> que la ruta que renderiza este page-component 
// siempre renderizemos este component tendra 'shop', por lo tanto siempre sera exacto y siempre mostraremos collection preview
// si no es exact, quiere decir que viene con un parametro, por lo tanto renderizamos category page pasandole el id de la categoria
const ShopPage = ({ fetchCollectionsStart, match }) => {

    useEffect(() => {
     
        fetchCollectionsStart();

    }, [fetchCollectionsStart])

    return (<div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </div>)

  
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);