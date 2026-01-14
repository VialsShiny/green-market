import {useEffect, useState} from 'react';
import PageLoader from './PageLoader';

export default function SuspenseLoader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 300); // délai mini pour éviter le flash

        return () => clearTimeout(timer);
    }, []);

    return <PageLoader isVisible={visible} />;
}
