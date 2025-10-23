import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos
} from 'react-icons/md';
import './styles.css';
import ProductItem from '@components/ProductItem/ProducyItem';
function SliderCommon({ data, isProductItem = false, showItem = 1 }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: showItem,
        slidesToScroll: 1,
        nextArrow: <MdOutlineArrowForwardIos />,
        prevArrow: <MdOutlineArrowBackIos />
    };
    console.log(data);
    return (
        <Slider {...settings}>
            {data.map((item, index) => {
                const src = !item.image ? item.images[0] : item.image;

                return (
                    <div key={index}>
                        {isProductItem ? (
                            <ProductItem
                                src={src}
                                preSvrc={src}
                                name={item.name}
                                price={item.price}
                                details={item}
                                isHomePage={false}
                                slideItem={true}
                            />
                        ) : (
                            <img src={item} alt='src' key={index} />
                        )}
                    </div>
                );
            })}
        </Slider>
    );
}

export default SliderCommon;
