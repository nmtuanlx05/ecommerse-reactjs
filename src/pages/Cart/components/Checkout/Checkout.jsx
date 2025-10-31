import InputCustom from '@components/InputCommon2/Input';
import { useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RightBody from '@/pages/Cart/components/Checkout/RightBody';

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

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

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

    useEffect(() => {
        if (!watch('country')) return;

        if (
            watch('country') === 'Vietnam' &&
            !localStorage.getItem('listCities')
        ) {
            axios
                .get('https://provinces.open-api.vn/api/?depth=2')
                .then((res) => {
                    localStorage.setItem(
                        'listCities',
                        JSON.stringify(res.data)
                    );

                    setCities(
                        res.data.data.map((item) => ({
                            value: item.codename,
                            label: item.name
                        }))
                    );
                });
            return;
        }
        if (localStorage.getItem('listCities')) {
            const data = JSON.parse(localStorage.getItem('listCities'));
            setCities(
                data.map((item) => ({
                    value: item.codename,
                    label: item.name
                }))
            );
        }
    }, [watch('country')]);

    useEffect(() => {
        if (!watch('cities')) return;

        if (localStorage.getItem('listCities')) {
            const data = JSON.parse(localStorage.getItem('listCities'));
            const statesCustom = data
                .find((item) => item.codename === watch('cities'))
                .districts.map((item) => ({
                    label: item.name,
                    value: item.codename
                }));
            setStates(statesCustom);
        }
    }, [watch('cities')]);

    return (
        <div className={container}>
            <div className={leftBody}>
                <p className={coupon}>
                    Have a coupon? <span>Click here to enter</span>
                </p>

                <p className={title}>BILLING DETAILS</p>

                <form
                    id='test'
                    onSubmit={handleSubmit((data) => console.log(data))}
                >
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
                            register={register('streetAddress', {
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
                            isRequired
                            register={register('State', {
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
