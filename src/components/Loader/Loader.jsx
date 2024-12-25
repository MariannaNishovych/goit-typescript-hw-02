import css from './Loader.module.css'
import { MutatingDots } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className={css.loader}>
        <MutatingDots
    visible={true}
    height="100"
    width="100"
    color="#131fbb"
    secondaryColor="#131fbb"
    radius="12.5"
    ariaLabel="mutating-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>
  )
}

export default Loader