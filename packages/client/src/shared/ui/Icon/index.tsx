interface IconProps {
    src: string;
}

export const Icon = ({ src }: IconProps) => <img src={src} alt='icon' />;
