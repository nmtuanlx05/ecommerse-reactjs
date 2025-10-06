import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos
} from 'react-icons/md';
import './styles.css';
function SliderCommon({ data }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <MdOutlineArrowForwardIos />,
        prevArrow: <MdOutlineArrowBackIos />
    };
    return (
        <Slider {...settings}>
            {data.map((src, index) => {
                return <img src={src} alt='src' key={index} />;
            })}
        </Slider>
    );
}

export default SliderCommon;
