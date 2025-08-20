import MainLayout from '@components/MainLayout/MainLayout';
import styles from './styles.module.scss';
function AdvanceHeadline() {
    const { container, headline, containerMiddleBox, des, title } = styles;
    return (
        <MainLayout>
            <div className={container}>
                <div className={headline}></div>
                <div className={containerMiddleBox}>
                    <p className={des}>don't miss super offers</p>
                    <p className={title}>Our best products</p>
                </div>
                <div className={headline}></div>
            </div>
        </MainLayout>
    );
}

export default AdvanceHeadline;
