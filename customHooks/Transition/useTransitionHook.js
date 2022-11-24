import { useEffect, useState } from "react";
import cx from 'classnames';
import transitionStyles from '../../transitions.module.scss';

const { page, fadeIn } = transitionStyles;

const useTransitionHook = () => {
    const [shouldTransition, setShouldTransition] = useState(false);

    useEffect(() => setShouldTransition(true), []);

    const pageStyles = cx(
        page,
        { [fadeIn]: shouldTransition }
    );

    return pageStyles;
};

export default useTransitionHook;