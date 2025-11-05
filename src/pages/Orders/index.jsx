import { useEffect } from 'react';
import { getDetailOrder } from '@/apis/orderService';
import { useLocation } from 'react-router-dom';
function Orders() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const totalAmount = params.get('totalAmount');

    const qrCodeImage = `https://qr.sepay.vn/img?acc=VQRQAFCPD1730&bank=MBBank&amount=${totalAmount}&des=${id}`;

    const handleGetDetailOrder = async () => {
        try {
            const res = await getDetailOrder(id);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetDetailOrder();
    }, []);

    return (
        <div className={container}>
            <div>
                <h4>Scan QR Code To Pay Your Order</h4>
                <img src={qrCodeImage} alt='' />
                <p>Use your bank application to scan this QR code</p>
            </div>

            <div>
                <h3>Payment Detail</h3>
                <div>
                    <div>
                        <div>
                            <img
                                src='https://play.google.com/store/apps/dev?id=8342851861336576991&hl=id'
                                alt=''
                            />
                        </div>
                        <div>
                            <p>MB BANK</p>
                            <p>Bank Transfer</p>
                        </div>
                    </div>

                    <div>
                        <div>Account holder:</div>
                        <div>NGUYEN MANH TUAN</div>
                    </div>
                    <div>
                        <div>Account number</div>
                        <div>0963688918</div>
                    </div>
                    <div>
                        <div>Amount</div>
                        <div>{totalAmount}</div>
                    </div>
                    <div>
                        <div>Transfer description</div>
                        <div>{id}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Orders;
