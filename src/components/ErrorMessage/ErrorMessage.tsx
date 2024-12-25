import css from './ErrorMessage.module.css';

interface ErrorProps {
    error: string;
}
const ErrorMessage: React.FC<ErrorProps> = ({error}) => {
    return(
        <div className={css.error}>
<p>{error}</p>
        </div>
    )
};

export default ErrorMessage;