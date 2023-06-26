import styles from './QuantityStepper.module.scss'
import {StepButton} from "@/components/QuantityStepper/StepButton";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {selectTicketAmount} from "@/redux/features/cart/selector";
interface QuantityStepperProps {
    onQuantityChange: (count: number)=>void;
    filmId: string;
}
export const QuantityStepper = (props: QuantityStepperProps) => {
    const { onQuantityChange, filmId} = props;
    const ticketCount = useSelector((state: RootState) => selectTicketAmount(state, filmId)) || 0;

    return (<div className={styles['stepper-container']}>
        <StepButton onClick={()=>onQuantityChange(ticketCount-1)}  className={styles['stepper-button']}  disabled={ticketCount===0} variant='-'/>
        <div className={styles.count}>{ticketCount}</div>
        <StepButton onClick={()=>onQuantityChange(ticketCount+1)} className={styles['stepper-button']} disabled={ticketCount===30} variant='+'/>

    </div>)
}