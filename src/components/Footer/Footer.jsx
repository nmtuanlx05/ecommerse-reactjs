import { dataMenu } from '@components/Footer/constant';
import styles from './styles.module.scss';
import logo from '@images/Logo_2.webp';
import payImgs from '@images/payImgs.webp';

function MyFooter() {
    const { container, boxNav } = styles;
    return (
        <div className={container}>
            <div>
                <img src={logo} alt='Logo_2' width={160} height={55} />
            </div>
            <div className={boxNav}>
                {dataMenu.map((item) => (
                    <div>{item.content}</div>
                ))}
            </div>
            <div>
                <p
                    style={{
                        textAlign: 'center',
                        fontSize: '16px'
                    }}
                >
                    Guaranteed safe ckeckout
                </p>
                <img src={payImgs} alt='payImgs' />
            </div>
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}
            >
                Copyright © 2025 Manh Tuan theme. Created by Manh Tuan
            </div>
        </div>
    );
}

export default MyFooter;
