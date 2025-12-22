import SearchOverlay from '@components/SearchOverlay/SearchOverlay';
import styles from './styles.module.scss';
function MainLayout({ children }) {
    const { wrapLayout, container } = styles;
    return (
        <main className={wrapLayout}>
            <SearchOverlay />
            <div className={container}>{children}</div>
        </main>
    );
}

export default MainLayout;
