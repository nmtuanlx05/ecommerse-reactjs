import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function Logos() {
    const dataLogos = [
        {
            id: '1',
            img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2024/04/brand-01-min.png'
        },
        {
            id: '2',
            img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-03-min.png'
        },
        {
            id: '3',
            img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-04-min.png'
        },
        {
            id: '4',
            img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-05-min.png'
        },
        {
            id: '5',
            img: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/brand-02-min.png'
        }
    ];
    const loopedData = [...dataLogos, ...dataLogos];
    return (
        <div
            className='logos-swiper-wrapper'
            style={{
                marginTop: '80px'
            }}
        >
            <style>
                {`
                .logos-swiper-wrapper .swiper {
                        padding-left: 50px;
                        padding-right: 50px;
                        padding-top : 10px;

                        /* Tùy chỉnh kích thước và màu mũi tên */
                        --swiper-navigation-size: 25px;
                        --swiper-theme-color: #000;
                    }
                    
                    /* Mặc định ẩn mũi tên */
                    .logos-swiper-wrapper .swiper-button-prev,
                    .logos-swiper-wrapper .swiper-button-next {
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    /* Khi hover vào wrapper, hiện mũi tên */
                    .logos-swiper-wrapper:hover .swiper-button-prev,
                    .logos-swiper-wrapper:hover .swiper-button-next {
                        opacity: 1;
                    }
                `}
            </style>
            <Swiper
                loop={true}
                spaceBetween={40}
                slidesPerView={5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                modules={[Navigation]}
            >
                {loopedData.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={item.img}
                            alt=''
                            style={{
                                maxWidth: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Logos;
