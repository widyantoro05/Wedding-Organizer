import React, {} from 'react';
import {
    UncontrolledCarousel
} from 'reactstrap';
 import image1 from '../../../../../assets/utils/images/tafter1.jpg';
 import image2 from '../../../../../assets/utils/images/tafter2.jpg';
 import image3 from '../../../../../assets/utils/images/tafter3.jpg';
 
const items = [
    {
        id: 1,
        src: image1,
        altText: 'Slide 1',
        caption: 'kerinciStories'
    },
    {
        id: 2,
        src: image2,
        altText: 'Slide 2',
        caption: 'kerinciStories'
    },
    {
        id: 3,
        src: image3,
        altText: 'Slide 3',
        caption: 'kerinciStories'
    }
];

const CarouselAfterwed = () => <UncontrolledCarousel items={items}/>;


export default CarouselAfterwed;