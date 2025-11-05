import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { getDetailOrder } from '@/apis/orderService';

function QrPayment() {
    const { container, left, right, flex, title, des, total } = styles;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [isSuccess, setIsSuccess] = useState(false);

    const id = params.get('id');
    const totalAmount = params.get('totalAmount');
    const qrCodeImage = `https://qr.sepay.vn/img?acc=VQRQAFCPD1730&bank=MBBank&amount=${totalAmount}&des=${id}`;

    const intervalRef = useRef(null); // Giữ interval id

    const handleGetDetailOrder = async () => {
        if (!id) return;
        try {
            const res = await getDetailOrder(id);
            const status = res.data?.data?.status;

            if (status !== 'pending') {
                // Dừng interval đúng cách
                clearInterval(intervalRef.current);
            }

            setIsSuccess(status === 'success');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Tạo interval khi mount
        intervalRef.current = setInterval(() => {
            handleGetDetailOrder();
        }, 5000);

        // Cleanup khi unmount
        return () => clearInterval(intervalRef.current);
    }, [id]);

    return (
        <div className={container}>
            <div className={left}>
                <h4>Scan QR Code To Pay Your Order</h4>
                <img src={qrCodeImage} alt='' />
                <p>Use your bank application to scan this QR code</p>
            </div>

            <div>
                <h3>Payment Detail</h3>
                <div className={right}>
                    <div className={cls(title, flex)}>
                        <img
                            src='https://play-lh.googleusercontent.com/t71KEG_bMdgQJnUlrWQmtrWtekWaWogVwxhWtlICzNFI-DX_goMODllQ4HFbqpLBrmbME8IpxD5WdptSNNqr'
                            alt=''
                        />
                        <div>
                            <p>MB BANK</p>
                            <p>Bank Transfer</p>
                        </div>
                    </div>

                    <div className={cls(flex, des)}>
                        <div>Account Holder:</div>
                        <div>NGUYEN MANH TUAN</div>
                    </div>
                    <div className={cls(flex, des)}>
                        <div>Account Number:</div>
                        <div>0963688918</div>
                    </div>
                    <div className={cls(flex, des)}>
                        <div>Amount:</div>
                        <div>{totalAmount}</div>
                    </div>
                    <div className={cls(flex, des)}>
                        <div>Transfer Description:</div>
                        <div>{id}</div>
                    </div>
                    <div className={cls(flex, total)}>
                        <div>TOTAL:</div>
                        <div>{totalAmount} VND</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QrPayment;
