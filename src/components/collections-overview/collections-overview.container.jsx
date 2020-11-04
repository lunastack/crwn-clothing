import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview';

const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionFetching,
});

// nuestro HOC WithSpinner recibirá como props el isLoading
const CollectionsOverviewCotainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewCotainer;

//const CollectionsOverviewCotainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview)); 