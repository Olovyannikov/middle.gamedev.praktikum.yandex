interface IconProps {
    src: string;
}

export const Icon = ({ src }: IconProps) => {
    return <img src={src} alt='icon' />;
};
