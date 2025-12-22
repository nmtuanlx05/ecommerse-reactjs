import InputCustom from '@components/InputCommon2/Input';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import cls from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import RightBody from '@/pages/Cart/components/Checkout/RightBody';
import { createOrder } from '@/apis/orderService';
import { useNavigate } from 'react-router-dom';
import { StepperContext } from '@/contexts/SteperProvider';
import { SideBarContext } from '@/contexts/SideBarProvider';

const CN_BASE = 'https://countriesnow.space/api/v0.1';

function Checkout() {
    const dataOption = [
        { value: '1', label: 'Options 1' },
        { value: '2', label: 'Options 2' },
        { value: '3', label: 'Options 3' }
    ];

    const { container, leftBody, row2Column, row, rightBody, title, coupon } =
        styles;

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const navigate = useNavigate();
    const { setCurrentStep } = useContext(StepperContext);
    const { setListProductCart } = useContext(SideBarContext);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await createOrder(data);
            setListProductCart([]);
            setCurrentStep(3);
            navigate(
                `/cart?id=${res.data.data._id}&totalAmount=${res.data.data.totalAmount}`
            );
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     axios.get(`${CN_BASE}/countries/iso`).then((res) =>
    //         setCountries(
    //             res.data.data.map((c) => ({
    //                 value: c.name,
    //                 label: c.name
    //             }))
    //         )
    //     );
    // }, []);

    // useEffect(() => {
    //     if (!watch('country')) return;

    //     if (
    //         watch('country') === 'Vietnam' &&
    //         !localStorage.getItem('listCities')
    //     ) {
    //         axios
    //             .get('https://provinces.open-api.vn/api/?depth=2')
    //             .then((res) => {
    //                 localStorage.setItem(
    //                     'listCities',
    //                     JSON.stringify(res.data)
    //                 );

    //                 setCities(
    //                     res.data.map((item) => ({
    //                         value: item.codename,
    //                         label: item.name
    //                     }))
    //                 );
    //             });
    //         return;
    //     }
    //     if (localStorage.getItem('listCities')) {
    //         const data = JSON.parse(localStorage.getItem('listCities'));
    //         setCities(
    //             data.map((item) => ({
    //                 value: item.codename,
    //                 label: item.name
    //             }))
    //         );
    //     }
    // }, [watch('country')]);

    // useEffect(() => {
    //     if (!watch('cities')) return;

    //     if (localStorage.getItem('listCities')) {
    //         const data = JSON.parse(localStorage.getItem('listCities'));
    //         const statesCustom = data
    //             .find((item) => item.codename === watch('cities'))
    //             .districts.map((item) => ({
    //                 label: item.name,
    //                 value: item.codename
    //             }));
    //         setStates(statesCustom);
    //     }
    // }, [watch('cities')]);

    // Lấy giá trị đang chọn
    const selectedCountry = watch('country');
    const selectedCity = watch('cities'); // Đây là cấp Tỉnh/Bang (Level 2)

    // 1. Fetch danh sách Quốc gia (Level 1)
    useEffect(() => {
        axios.get(`${CN_BASE}/countries/iso`).then((res) =>
            setCountries(
                res.data.data.map((c) => ({
                    value: c.name,
                    label: c.name
                }))
            )
        );
    }, []);

    // 2. Fetch Tỉnh/Bang (Level 2) khi chọn Country
    useEffect(() => {
        // Nếu không có nước nào được chọn, xóa list
        if (!selectedCountry) {
            setCities([]);
            setStates([]);
            return;
        }

        // Reset giá trị của ô Tỉnh và Huyện khi đổi Nước
        setValue('cities', '');
        setValue('state', '');

        // Gọi API lấy States (Tỉnh/Bang) của nước đó
        axios
            .post(`${CN_BASE}/countries/states`, {
                country: selectedCountry
            })
            .then((res) => {
                // Kiểm tra xem nước đó có bang không (VD: Singapore không có bang)
                if (res.data.data.states.length > 0) {
                    setCities(
                        res.data.data.states.map((item) => ({
                            value: item.name, // Lưu tên bang
                            label: item.name
                        }))
                    );
                } else {
                    setCities([]);
                }
            })
            .catch((err) => {
                console.log('Country has no states or Error:', err);
                setCities([]);
            });
    }, [selectedCountry, setValue]);

    // 3. Fetch Quận/Huyện/Thành phố (Level 3) khi chọn Tỉnh/Bang
    useEffect(() => {
        if (!selectedCity || !selectedCountry) {
            setStates([]);
            return;
        }

        // Reset giá trị ô Huyện khi đổi Tỉnh
        setValue('state', '');

        // Gọi API lấy Cities (Quận/Huyện) của Bang đó
        axios
            .post(`${CN_BASE}/countries/state/cities`, {
                country: selectedCountry,
                state: selectedCity
            })
            .then((res) => {
                if (res.data.data.length > 0) {
                    setStates(
                        res.data.data.map((item) => ({
                            value: item, // API này trả về mảng string ["City A", "City B"]
                            label: item
                        }))
                    );
                } else {
                    setStates([]);
                }
            })
            .catch((err) => {
                console.log('State has no cities or Error:', err);
                setStates([]);
            });
    }, [selectedCity, selectedCountry, setValue]);

    // ... (Phần render giữ nguyên, chỉ lưu ý phần DataOptions)

    return (
        <div className={container}>
            <div className={leftBody}>
                <p className={coupon}>
                    Have a coupon? <span>Click here to enter</span>
                </p>

                <p className={title}>BILLING DETAILS</p>

                <form id='test' onSubmit={handleSubmit(onSubmit)}>
                    <div className={cls(row, row2Column)}>
                        <InputCustom
                            label={'Firs Name'}
                            type={'text'}
                            isRequired
                            register={register('firstName', {
                                required: true,
                                maxLength: 25
                            })}
                            isError={errors.firstName}
                        />
                        <InputCustom
                            label={'Last Name'}
                            type={'text'}
                            isRequired
                            register={register('lastName', {
                                required: true,
                                maxLength: 25
                            })}
                            isError={errors.lastName}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Company Name (optional)'}
                            type={'text'}
                            isRequired
                            register={register('companyName')}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Country / Region'}
                            dataOptions={countries}
                            type='select'
                            isRequired
                            register={register('country', {
                                required: true
                            })}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Street address'}
                            type={'text'}
                            isRequired
                            register={register('street', {
                                required: true
                            })}
                            placeholder={'House number and street name'}
                        />
                    </div>
                    <div className={row}>
                        <InputCustom
                            label={'Street address'}
                            type={'text'}
                            isRequired
                            register={register('apartment')}
                            isShowLabel={false}
                            placeholder={'apartment'}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Town / City'}
                            dataOptions={cities}
                            type='select'
                            isRequired
                            register={register('cities', {
                                required: true
                            })}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'State'}
                            dataOptions={states}
                            type='select'
                            isRequired
                            register={register('state', {
                                required: true
                            })}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Phone'}
                            dataOptions={dataOption}
                            isRequired
                            type={'text'}
                            register={register('phone', {
                                required: true
                            })}
                            isError={errors.phone}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'ZIP code'}
                            type={'text'}
                            isRequired
                            register={register('zipCode', {
                                required: true
                            })}
                            placeholder={''}
                            isError={errors.zipCode}
                        />
                    </div>

                    <div className={row}>
                        <InputCustom
                            label={'Email Address'}
                            dataOptions={dataOption}
                            type={'text'}
                            isRequired
                            register={register('email', {
                                required: true
                            })}
                            isError={errors.email}
                        />
                    </div>
                </form>
            </div>
            <RightBody />
        </div>
    );
}

export default Checkout;
