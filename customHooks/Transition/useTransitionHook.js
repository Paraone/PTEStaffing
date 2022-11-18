import { useEffect, useState } from "react";
import cx from 'classnames';
import transitionStyles from '../../transitions.module.scss';

const { page, fadeIn } = transitionStyles;

const useTransitionHook = (delayDuration = 10) => {
    const [shouldTransition, setShouldTransition] = useState(false);

    useEffect(() => {
        const transitionDelay = setTimeout(() => {
            setShouldTransition(true);
        }, delayDuration);
    }, []);

    const pageStyles = cx(
        page,
        { [fadeIn]: shouldTransition }
    );

    return pageStyles;
};

export default useTransitionHook;