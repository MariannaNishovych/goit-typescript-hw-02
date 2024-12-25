import css from './ErrorMessage.module.css'
const ErrorMessage = ({children}) => {
    return(
        <div className={css.error}>
<p>{children}</p>
        </div>
    )
};

export default ErrorMessage;