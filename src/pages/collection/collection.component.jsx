import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item-component';

import { selectCollection } from '../../redux/shop/shop.selectors'; 

import './collection.styles.scss';

const CollectionPage = ({ collection }) => {

    const { title, items } = collection;
    return (
    <div className="collection-page">
        <h2 className='title'>{ title }</h2>
        <div className="items">
            {
                items.map(item => <CollectionItem key={ item.id } item={item   }/>)
            }
        </div>
    </div>
)};

// cuando cambian los props del wrapper component, el store tambien envia el state como props
// ownProps nos da acceso a todos los props que son pasados a nuestro componente
const mapStateToProps = (state, ownProps) => ({
    // selectCollection se ejecuta innmediatamente cuando es llamado este callback
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);