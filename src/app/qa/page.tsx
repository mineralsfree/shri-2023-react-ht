import {InfoCard} from "@/components/InfoCard/InfoCard";
import {questions} from "@/app/qa/static";
import styles from './Qa.module.scss'
export default function Page() {
    const title = 'Вопросы-ответы';
    return (<div>
        <InfoCard className={styles.infoCard} key={title} title={title}/>
        {questions.map((question: { q: string, a: string }) => (
            <InfoCard className={styles.infoCard} title={question.q} content={[question.a]} collapsible></InfoCard>))}
    </div>)
}