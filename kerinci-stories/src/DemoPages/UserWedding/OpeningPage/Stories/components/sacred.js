import React, {} from 'react';
import {
    UncontrolledCarousel
} from 'reactstrap';
 import image1 from '../../../../../assets/utils/images/sacred1.jpg';
 import image2 from '../../../../../assets/utils/images/sacred4.jpg';
 import image3 from '../../../../../assets/utils/images/sacred3.jpg';
 
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

const CarouselSacred = () => <UncontrolledCarousel items={items}/>;


export default CarouselSacred;