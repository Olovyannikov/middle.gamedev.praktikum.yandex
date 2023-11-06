import cn from 'clsx';
import s from './PageLoader.module.scss';

export const PageLoader = () => {
    return (
        <div className={s.rings}>
            <div className={cn(s.ring, s.ring1)}>
                <div className={cn(s.ring, s.ring2)}>
                    <div className={cn(s.ring, s.ring3)}>
                        <div className={cn(s.ring, s.ring4)} />
                    </div>
                </div>
            </div>
        </div>
    );
};
