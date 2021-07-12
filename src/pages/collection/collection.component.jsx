import React, { useContext } from 'react';
// import { connect } from 'react-redux';
// import { selectCollection } from '../../redux/shop/shop.selectors';

import CollectionItem from '../../components/collection-item/collection-item.component';
import CollectionsContext from '../../contexts/collections/collections.context';

import './collection.styles.scss';

//ahora tenemoe el match que nos llega de la shop
const CollectionPage = ({ match }) => {
    const collections = useContext(CollectionsContext);

    const { items, title } = collections[match.params.collectionId];
    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map((item) => (
                    <CollectionItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

// const mapStateToProps = (state, ownProps) => ({
//     collection: selectCollection(ownProps.match.params.collectionId)(state),
// });

export default CollectionPage;
